#!/usr/bin/env node

/**
 * mo-geo-report.mjs — Cross-reference scanned offers with Missouri crop counties.
 *
 * Reads:
 *   data/scan-history.tsv        (url \t first_seen \t portal \t title \t company \t [location] \t status)
 *   data/mo_crop_counties.json   (from agri_yield_pipeline/scripts/export_mo_geo.py)
 *
 * Writes:
 *   reports/mo-geo-match.md
 *
 * Matching signals:
 *   1. offer.location (city/state text) → CITY_TO_COUNTY map
 *   2. company name → KNOWN_MO_COMPANIES map (covers history rows missing location)
 *   3. title contains MO county name + "MO"
 *
 * Score (additive):
 *   +3 explicit city match
 *   +2 county text match
 *   +2 known MO employer (by company name)
 *   +1 ag/remote-sensing title keywords
 *   +1 county is top-20 for corn OR soy yield
 *
 * Usage: node mo-geo-report.mjs
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';

const HISTORY = 'data/scan-history.tsv';
const GEO_JSON = 'data/mo_crop_counties.json';
const OUT = 'reports/mo-geo-match.md';

const CITY_TO_COUNTY = {
  'st. louis': 'ST. LOUIS',
  'saint louis': 'ST. LOUIS',
  'st louis': 'ST. LOUIS',
  'clayton, mo': 'ST. LOUIS',
  'chesterfield': 'ST. LOUIS',
  'creve coeur': 'ST. LOUIS',
  'ballwin': 'ST. LOUIS',
  'kansas city': 'JACKSON',
  'independence, mo': 'JACKSON',
  'columbia, mo': 'BOONE',
  'jefferson city': 'COLE',
  'springfield, mo': 'GREENE',
  'cape girardeau': 'CAPE GIRARDEAU',
  'joplin': 'JASPER',
  "o'fallon": 'ST. CHARLES',
  'st. charles': 'ST. CHARLES',
  'saint charles': 'ST. CHARLES',
};

// Historical rows lack location. Map companies known to have MO HQ or
// major MO presence to the county where their primary office sits.
const KNOWN_MO_COMPANIES = {
  'bayer crop science': 'ST. LOUIS',
  'bayer': 'ST. LOUIS',
  'monsanto': 'ST. LOUIS',
  'climate corporation': 'ST. LOUIS',
  'benson hill': 'ST. LOUIS',
  'danforth plant science center': 'ST. LOUIS',
  'bunge': 'ST. LOUIS',
  'edward jones': 'ST. LOUIS',
  'boeing': 'ST. LOUIS',
  'boeing st. louis': 'ST. LOUIS',
  'washington university in st. louis': 'ST. LOUIS',
  'saint louis university': 'ST. LOUIS',
  'wustl': 'ST. LOUIS',
  'sigma-aldrich': 'ST. LOUIS',
  'milliporesigma': 'ST. LOUIS',
  'express scripts': 'ST. LOUIS',
  'evernorth': 'ST. LOUIS',
  'emerson': 'ST. LOUIS',
  'mastercard': 'ST. LOUIS',
  'mfa incorporated': 'BOONE',
  'university of missouri': 'BOONE',
  'mu cafnr': 'BOONE',
  'shelter insurance': 'BOONE',
  'stowers institute': 'JACKSON',
  'oracle health': 'JACKSON',
  'cerner': 'JACKSON',
  'biokyowa': 'CAPE GIRARDEAU',
  'h&r block': 'JACKSON',
  'garmin': 'JACKSON',
  'sprint': 'JACKSON',
  't-mobile': 'JACKSON',
};

const AG_KEYWORDS = [
  'agronomist', 'agronomy', 'crop', 'precision agriculture', 'agtech',
  'remote sensing', 'satellite', 'ndvi', 'agricultural', 'soil', 'seed',
];

function loadHistory() {
  if (!existsSync(HISTORY)) return [];
  const lines = readFileSync(HISTORY, 'utf-8').split('\n');
  if (lines.length < 2) return [];
  const header = lines[0].split('\t');
  const locIdx = header.indexOf('location');
  return lines.slice(1).filter(Boolean).map(line => {
    const cols = line.split('\t');
    return {
      url: cols[0] || '',
      first_seen: cols[1] || '',
      portal: cols[2] || '',
      title: cols[3] || '',
      company: cols[4] || '',
      location: locIdx >= 0 ? (cols[locIdx] || '') : '',
      status: cols[cols.length - 1] || '',
    };
  });
}

function loadGeo() {
  if (!existsSync(GEO_JSON)) {
    console.error(`${GEO_JSON} not found — run agri_yield_pipeline/scripts/export_mo_geo.py`);
    process.exit(1);
  }
  return JSON.parse(readFileSync(GEO_JSON, 'utf-8'));
}

function scoreOffer(offer, geoIndex) {
  const loc = (offer.location || '').toLowerCase();
  const title = (offer.title || '').toLowerCase();
  const company = (offer.company || '').toLowerCase();

  let score = 0;
  let matchedCity = null;
  let matchedCounty = null;
  let reason = [];

  // 1. Location-based match
  if (loc) {
    for (const [city, county] of Object.entries(CITY_TO_COUNTY)) {
      if (loc.includes(city)) {
        matchedCity = city;
        matchedCounty = county;
        score += 3;
        reason.push(`location='${offer.location}'`);
        break;
      }
    }
    if (!matchedCounty) {
      for (const rec of geoIndex) {
        const name = rec.county.toLowerCase();
        if (name.length < 4) continue;
        if (loc.includes(`${name} county`) || loc.includes(`${name}, mo`)) {
          matchedCounty = rec.county;
          score += 2;
          reason.push(`county-text='${name}'`);
          break;
        }
      }
    }
  }

  // 2. Company-based fallback
  if (!matchedCounty) {
    for (const [name, county] of Object.entries(KNOWN_MO_COMPANIES)) {
      if (company.includes(name)) {
        matchedCounty = county;
        score += 2;
        reason.push(`company='${name}'`);
        break;
      }
    }
  }

  if (!matchedCounty) return null;

  const rec = geoIndex.find(r => r.county === matchedCounty) || {};
  const isAg = AG_KEYWORDS.some(k => title.includes(k));
  if (isAg) { score += 1; reason.push('ag-keyword'); }
  if ((rec.corn_rank && rec.corn_rank <= 20) || (rec.soy_rank && rec.soy_rank <= 20)) {
    score += 1; reason.push('top-20-yield');
  }

  return {
    ...offer,
    matched_city: matchedCity,
    matched_county: matchedCounty,
    top_crops: rec.crops || [],
    corn_rank: rec.corn_rank ?? null,
    soy_rank: rec.soy_rank ?? null,
    geo_score: score,
    reason: reason.join(', '),
  };
}

function render(matches) {
  matches.sort((a, b) => b.geo_score - a.geo_score);
  const lines = [];
  lines.push('# Missouri Geo-Matched Offers');
  lines.push('');
  lines.push(`Generated: ${new Date().toISOString()}  |  Matches: **${matches.length}**`);
  lines.push('');
  lines.push('Offers cross-referenced against Missouri county data');
  lines.push('(USDA NASS yields + Census centroids) from `agri_yield_pipeline`.');
  lines.push('');
  lines.push('| Score | Company | Title | County | Top crops | Yield rank | Signal |');
  lines.push('|:----:|---------|-------|--------|-----------|------------|--------|');
  for (const m of matches) {
    const ranks = [
      m.corn_rank != null ? `Corn #${m.corn_rank}` : null,
      m.soy_rank != null ? `Soy #${m.soy_rank}` : null,
    ].filter(Boolean).join(' · ') || '—';
    const crops = (m.top_crops || []).slice(0, 4).join(' / ') || '—';
    lines.push(`| ${m.geo_score} | [${m.company}](${m.url}) | ${m.title} | ${m.matched_county} | ${crops} | ${ranks} | ${m.reason} |`);
  }
  lines.push('');
  return lines.join('\n');
}

function main() {
  const offers = loadHistory();
  const geo = loadGeo();
  const matches = offers.map(o => scoreOffer(o, geo)).filter(Boolean);

  if (!existsSync('reports')) mkdirSync('reports', { recursive: true });
  writeFileSync(OUT, render(matches), 'utf-8');

  console.log(`Scanned ${offers.length} offers → ${matches.length} MO geo-matches → ${OUT}`);
  if (matches.length > 0) {
    console.log(`\nTop 10 by geo score:`);
    for (const m of matches.slice(0, 10)) {
      console.log(`  ${String(m.geo_score).padStart(2)}  ${m.matched_county.padEnd(18)} ${m.company.slice(0, 24).padEnd(25)} ${m.title.slice(0, 60)}`);
    }
  }
}

main();
