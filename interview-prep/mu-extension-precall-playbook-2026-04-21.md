# MU Extension Field Specialist — Pre-Call Playbook

**Applies to:** Reports #050 (Hickory), #051 (Lincoln), #052 (Vernon).
**Date:** 2026-04-21
**Goal:** two phone calls, two URLs, one cover-letter opener.

---

## 1. Find the regional director (5 min)

MU Extension is organized by region, each with a Regional Director who oversees Field Specialists across their counties:

- **Hickory** → West Central Region
- **Vernon** → West Central Region (same director — one call covers both)
- **Lincoln** → East Central Region

**Directory:** <https://extension.missouri.edu/about-us/organizational-structure> — find the regional director's name + phone. If not on that page, go to `https://extension.missouri.edu/counties/<county>` and look for "regional office" contact.

---

## 2. The pre-call script (10 min call)

Don't pitch. Ask. Keep it this short:

> Hi, this is Hunter Kinder. I'm applying for the Field Specialist in Agronomy positions in your region — Hickory and Vernon [or Lincoln]. Before I submit, I wanted to ask you two things directly.
>
> First: the JD asks for an MS in Agronomy. I have a BA in Biology and an MA in Teaching & Learning from Wash U, plus three years teaching certified STEM. I'm planning to earn the MU Graduate Certificate in Plant Sciences through the employee tuition benefit if hired. Is that a viable path in your eyes, or is the MS a hard line?
>
> Second: I built a live Missouri crop-monitoring product — Sentinel-2 NDVI plus a statewide yield model trained on USDA data that actually includes [Lincoln / Hickory / Vernon] County. I can show it to you. Would that kind of tool be useful to the producers you serve, or is the extension role more hands-on agronomy than data?
>
> I want to make sure my application lands on the right priorities.

**Why this works:** it respects their time, it names the gap first (they already saw your resume — don't pretend), and it converts the agri_yield_pipeline into a concrete offer they can taste. Their answer tells you exactly what to lead the cover letter with.

---

## 3. Tuition benefit — the fact to cite

MU employees get the **Educational Assistance Program**: full-time staff receive up to 6 credit hours/semester at in-state rate, with fees waived. The Graduate Certificate in Plant Sciences is 15 credits — doable in 3–4 semesters part-time while employed.

**Sources to verify before you cite numbers:**
- <https://www.umsystem.edu/totalrewards/benefits/educational-assistance>
- <https://cafnr.missouri.edu/academics/graduate-certificates/>

Check current policy — programs change.

---

## 4. Cover letter opener (steal this)

> Your Field Specialist JD asks for a Master's in Agronomy. I don't have one yet — I have a BA in Biology, an MA in Teaching & Learning, and Missouri DESE certification, and I teach STEM full-time in a Missouri public school. What I'm bringing instead is a plan and a running start.
>
> The plan: enroll in the MU Graduate Certificate in Plant Sciences via the employee educational-assistance benefit, completing 15 credits part-time over four semesters while on the job. The running start: github.com/aurascoper/agri_yield_pipeline, a two-layer Missouri crop-monitoring product I built and deployed this year. Layer 1 is a statewide yield model trained on 23 years of USDA, NOAA, and MODIS data across 97 counties — including [Lincoln / Hickory / Vernon]. Layer 2 is per-field monitoring via Google Earth Engine with a stress-alert function that flags anomalies above ±2σ in the county baseline. The live dashboard is at mo-agri-baseline.onrender.com.
>
> I mention the pipeline first because Field Specialists exist to get technology into the hands of producers, and I'm already building it. The teaching credential is the second half: three years in the classroom means I can deliver a workshop on an NDVI map without losing the room. Extension is where those two tracks meet.

The rest of the letter does the usual job-specific connection work. The opener is what has to land.

---

## 5. Key tactical note

**Call *before* submitting, not after.** Extension hiring is relationship-heavy and the director will almost always take a 10-minute call from a serious candidate. If the director's tone is flat on the tuition-benefit path, *lower your priority on that county* and weight the others — it's a signal, not a door slam, but it matters.

---

## Pre-call checklist

- [ ] Look up West Central Regional Director name + phone
- [ ] Look up East Central Regional Director name + phone
- [ ] Verify MU educational-assistance credit cap + fee-waiver status (umsystem.edu link above)
- [ ] Verify Graduate Certificate in Plant Sciences credit count (cafnr link above)
- [ ] Confirm Lincoln/Hickory/Vernon counties are in the L1 training set (quick grep of `data/yields/` in agri_yield_pipeline repo)
- [ ] Have the Render dashboard open in a tab before you dial, in case they ask to see it
- [ ] Call West Central first (covers 2 of 3 applications)
- [ ] Draft cover letters *after* calls, incorporating each director's stated priorities
