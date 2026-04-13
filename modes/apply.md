# Modo: apply — Asistente de Aplicación en Vivo

Modo interactivo para cuando el candidato está rellenando un formulario de aplicación en Chrome. Lee lo que hay en pantalla, carga el contexto previo de la oferta, y genera respuestas personalizadas para cada pregunta del formulario.

## Requisitos

- **Mejor con Playwright visible**: En modo visible, el candidato ve el navegador y Claude puede interactuar con la página.
- **Sin Playwright**: el candidato comparte un screenshot o pega las preguntas manualmente.

## Workflow

```
1. DETECTAR    → Leer Chrome tab activa (screenshot/URL/título)
2. IDENTIFICAR → Extraer empresa + rol de la página
3. BUSCAR      → Match contra reports existentes en reports/
4. CARGAR      → Leer report completo + Section G (si existe)
5. COMPARAR    → ¿El rol en pantalla coincide con el evaluado? Si cambió → avisar
6. ANALIZAR    → Identificar TODAS las preguntas del formulario visibles
7. GENERAR     → Para cada pregunta, generar respuesta personalizada
8. PRESENTAR   → Mostrar respuestas formateadas para copy-paste
```

## Paso 1 — Detectar la oferta

**Con Playwright:** Tomar snapshot de la página activa. Leer título, URL, y contenido visible.

**Sin Playwright:** Pedir al candidato que:
- Comparta un screenshot del formulario (Read tool lee imágenes)
- O pegue las preguntas del formulario como texto
- O diga empresa + rol para que lo busquemos

## Paso 2 — Identificar y buscar contexto

1. Extraer nombre de empresa y título del rol de la página
2. Buscar en `reports/` por nombre de empresa (Grep case-insensitive)
3. Si hay match → cargar el report completo
4. Si hay Section G → cargar los draft answers previos como base
5. Si NO hay match → avisar y ofrecer ejecutar auto-pipeline rápido

## Paso 3 — Detectar cambios en el rol

Si el rol en pantalla difiere del evaluado:
- **Avisar al candidato**: "El rol ha cambiado de [X] a [Y]. ¿Quieres que re-evalúe o adapto las respuestas al nuevo título?"
- **Si adaptar**: Ajustar las respuestas al nuevo rol sin re-evaluar
- **Si re-evaluar**: Ejecutar evaluación A-F completa, actualizar report, regenerar Section G
- **Actualizar tracker**: Cambiar título del rol en applications.md si procede

## Paso 4 — Analizar preguntas del formulario

Identificar TODAS las preguntas visibles:
- Campos de texto libre (cover letter, why this role, etc.)
- Dropdowns (how did you hear, work authorization, etc.)
- Yes/No (relocation, visa, etc.)
- Campos de salario (range, expectation)
- Upload fields (resume, cover letter PDF)

Clasificar cada pregunta:
- **Ya respondida en Section G** → adaptar la respuesta existente
- **Nueva pregunta** → generar respuesta desde el report + cv.md

## Paso 5 — Generar respuestas

Para cada pregunta, generar la respuesta siguiendo:

1. **Contexto del report**: Usar proof points del bloque B, historias STAR del bloque F
2. **Section G previa**: Si existe una respuesta draft, usarla como base y refinar
3. **Tono "I'm choosing you"**: Mismo framework del auto-pipeline
4. **Especificidad**: Referenciar algo concreto del JD visible en pantalla
5. **career-ops proof point**: Incluir en "Additional info" si hay campo para ello

**Classify each field before generating:**
- **Prose fields** (cover letter, "why this company/role", "tell us about yourself", any free-text >100 words) → generate draft, then run through prose-craft review gate (Step 5.5 below)
- **Structured fields** (short answers, dropdowns, yes/no, salary, work authorization) → generate directly, no prose-craft gate needed

## Paso 5.5 — Prose-Craft Review Gate (cover letters and long-form prose only)

For every prose field identified in Step 5, run a two-stage review before presenting to the user:

**Stage 1 — Fast pre-screen (pcr)**

If the `pcr` binary is available at `../prose-craft/target/debug/pcr` (or `target/release/pcr`), pipe the draft through it first:

```bash
echo "[draft text]" | /Users/aurascoper/Developer/jobs/prose-craft/target/debug/pcr
```

- **Exit 0** (clean): proceed to Stage 2
- **Exit 1** (hard fails found): fix all hard fails silently before Stage 2. Hard fails: em dashes, fatal negation pattern ("This isn't X. This is Y."), AI vocabulary ("delve", "it's important to note", "in today's [anything]"), ChatGPT-isms ("let me be clear", "here's the thing though", "sit with")

**Stage 2 — Full prose-craft review agents**

Dispatch two review agents in parallel using the Agent tool:

1. **Prose review agent** (`subagent_type: "prose-craft:prose-review"`):
   - Pass the draft text
   - Checks: banned phrases, mid-tier AI vocabulary, structural monotony, voice drift, grounding, soullessness

2. **Craft review agent** (`subagent_type: "prose-craft:craft-review"`):
   - Pass the draft text
   - Checks: naming opportunities, aphoristic endings, central-point dwelling, structural literary devices, human-moment anchoring

Wait for both agents. Then:
- **Hard fails** (from either agent): fix silently before presenting
- **Advisories**: present in a table below the draft. User accepts, rejects, or modifies each row.

**What good cover letter prose looks like for career-ops:**
- Concrete-first: lead with a specific number, scene, or person — not "I am excited to apply"
- Named concepts: if the application describes a dynamic, name it in 2-4 words
- No em dashes, no "passionate about", no "proven track record", no "leveraged"
- Short paragraphs (1-3 sentences). Opening must earn the next sentence.
- The cover letter should read like a person wrote it, not like a committee produced it

**Formato de output (after prose-craft gate clears):**

```
## Respuestas para [Empresa] — [Rol]

Basado en: Report #NNN | Score: X.X/5 | Arquetipo: [tipo]

---

### 1. [Pregunta exacta del formulario]
> [Respuesta lista para copy-paste]

### 2. Cover Letter
> [Prose-craft reviewed draft — hard fails fixed, advisories presented separately]

...

---

Notas:
- [Cualquier observación sobre el rol, cambios, etc.]
- [Sugerencias de personalización que el candidato debería revisar]
```

## Paso 6 — Post-apply (opcional)

Si el candidato confirma que envió la aplicación:
1. Actualizar estado en `applications.md` de "Evaluada" a "Aplicado"
2. Actualizar Section G del report con las respuestas finales
3. Sugerir siguiente paso: `/career-ops contacto` para LinkedIn outreach

## Scroll handling

Si el formulario tiene más preguntas que las visibles:
- Pedir al candidato que haga scroll y comparta otro screenshot
- O que pegue las preguntas restantes
- Procesar en iteraciones hasta cubrir todo el formulario
