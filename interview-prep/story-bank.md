# Story Bank — Master STAR+R Stories

This file accumulates your best interview stories over time. Each evaluation (Block F) adds new stories here. Instead of memorizing 100 answers, maintain 5-10 deep stories that you can bend to answer almost any behavioral question.

## How it works

1. Every time `/career-ops oferta` generates Block F (Interview Plan), new STAR+R stories get appended here
2. Before your next interview, review this file — your stories are already organized by theme
3. The "Big Three" questions can be answered with stories from this bank:
   - "Tell me about yourself" → combine 2-3 stories into a narrative
   - "Tell me about your most impactful project" → pick your highest-impact story
   - "Tell me about a conflict you resolved" → find a story with a Reflection

## Stories

<!-- Stories will be added here as you evaluate offers -->
<!-- Format:
### [Theme] Story Title
**Source:** Report #NNN — Company — Role
**S (Situation):** ...
**T (Task):** ...
**A (Action):** ...
**R (Result):** ...
**Reflection:** What I learned / what I'd do differently
**Best for questions about:** [list of question types this story answers]
-->

---

## Batch 001–003 | 2026-04-12 | Pearl Health / GameChanger / Bluesight

---

### [Data Pipeline] Biokyowa — Unified Instrument Data Pipeline
**Source:** Reports #001, #002, #003 — Pearl Health / GameChanger / Bluesight
**S (Situation):** At Biokyowa, raw QC data from HPLC, atomic absorption, and microbial seed analysis arrived as independent instrument files with no unified schema.
**T (Task):** Create a reliable, reproducible pipeline from raw instrument output to SPC-ready reporting that any analyst could trust and maintain.
**A (Action):** Designed unified staging table structure in R/Python — raw instrument output normalized to consistent QC tables; applied SPC analysis on top; documented schema for new analyst onboarding.
**R (Result):** Consistent cross-instrument reporting; new analyst onboarding time cut significantly; batch anomalies caught before customer delivery. All work maintained FDA compliance.
**Reflection:** This is what dbt formalizes for business data. I'd implement it natively in dbt today — the philosophy is identical: governed, testable, documented transformation layers.
**Best for questions about:** "End-to-end pipeline ownership," "data model design," "data governance," "why do you want to work in healthcare/pharma data?"

---

### [Data Quality] Dynalabs — Multi-Analyst HPLC Schema Standardization
**Source:** Reports #001, #002, #003 — Pearl Health / GameChanger / Bluesight
**S (Situation):** At Dynalabs, multiple analysts entered HPLC results independently with inconsistent column naming conventions, causing silent errors in aggregate QC reports.
**T (Task):** Implement data validation before aggregation to prevent silent data corruption.
**A (Action):** Created pre-aggregation validation rules (null checks, field format enforcement); standardized data entry schema; enforced via peer review documentation.
**R (Result):** Zero silent errors in subsequent QC reports; GMP audit passed without findings; team adopted as standard.
**Reflection:** Automated schema testing should be the first thing built, not the last. This maps directly to dbt tests and freshness checks.
**Best for questions about:** "Data quality," "testing data pipelines," "working in regulated environments," "technical debt"

---

### [Stakeholder Communication] SEMO Milling — Dual-Audience SPC Reporting
**Source:** Reports #001, #002 — Pearl Health / GameChanger
**S (Situation):** At SEMO Milling, production floor managers and lab staff needed to share the same SPC view but had fundamentally different technical literacy levels.
**T (Task):** Create a shared data output that both audiences could act on independently.
**A (Action):** Built dual-output reporting system: technical SPC charts for lab analysts, red/yellow/green dashboard for floor managers. Ran 2 training sessions to drive adoption.
**R (Result):** Production floor staff started acting on SPC alerts independently without requiring a lab analyst to interpret. Yield improved.
**Reflection:** Self-serve analytics is the real goal — build data products that eliminate the analyst as a bottleneck for routine decisions. The best analytics work disappears into users' workflow.
**Best for questions about:** "Non-technical stakeholders," "self-serve analytics," "communicating complex data," "business impact of data work"

---

### [ML Research] ARC-AGI — Solver Architecture Refactor
**Source:** Reports #001, #002, #003 — Pearl Health / GameChanger / Bluesight
**S (Situation):** ARC-AGI neuroevolution solver started as a monolithic, notebook-style research codebase — fast to iterate but architecturally fragile with no reproducibility guarantees.
**T (Task):** Refactor into a modular, reproducible system without losing research velocity or score.
**A (Action):** Decomposed into DSL layer, MCTS layer, evaluation layer — each independently testable. Added ablation checkpoint system tracking holdout scores and architecture variants. Implemented D4 symmetry canonicalization and SSD/SOAR as independent additions.
**R (Result):** Holdout score 0.79+. Iteration speed improved. Architecture now supports potential paper track with reproducible ablations.
**Reflection:** Research code and production code require different design principles. Modular architecture enables composition; monoliths enable only increments. The right time to decompose is always earlier than you think.
**Best for questions about:** "Taking a model from research to production," "technical debt," "balancing speed vs. thoroughness," "ML pipeline architecture"

---

### [KPI Design] ARC-AGI — Defining Solver Performance Metrics
**Source:** Reports #002, #003 — GameChanger / Bluesight
**S (Situation):** Early ARC-AGI competition work had no agreed metric for "is the solver improving?" — making it impossible to distinguish genuine architectural improvements from evaluation noise.
**T (Task):** Define and implement meaningful KPIs that could attribute performance changes to specific architectural decisions.
**A (Action):** Defined holdout score as primary KPI; per-task pass rate as secondary; ablation delta as change detection signal. Structured ablation checkpoints to isolate each variable.
**R (Result):** Could now attribute holdout gains to specific changes (e.g., D4 canonicalization +X%, SOAR +Y%). Removed 2 ineffective techniques that had appeared beneficial in noisy early evaluation.
**Reflection:** KPI design is the hardest part of ML work — the metric you optimize shapes every architectural decision downstream. Define it wrong and you'll optimize toward the wrong thing with great precision.
**Best for questions about:** "Measuring ML model success," "analytics KPIs," "experimental design," "data-driven decision making"

---

### [Regulated Data] Dynalabs — GMP/GLP Data Audit Trail
**Source:** Report #003 — Bluesight
**S (Situation):** At Dynalabs, every analytical method validation had to be documented to FDA GMP standards with full data lineage and audit trail for external regulatory review.
**T (Task):** Maintain data integrity and full documentation across all analytical transformations under active regulatory scrutiny.
**A (Action):** Followed GMP/GLP documentation standards for all data transformations; maintained method validation documentation including all instrument settings, analyst IDs, and transformation logic.
**R (Result):** Passed GMP audits without findings across entire tenure. Documentation approach adopted as team standard for new method validations.
**Reflection:** Regulatory rigor and ML model governance are the same discipline applied to different domains — both require knowing who changed what, when, and why. Companies building on healthcare data need both.
**Best for questions about:** "Sensitive or regulated data," "data governance," "healthcare compliance," "attention to detail"

---

### [Domain Expertise] Biokyowa — Pharma Manufacturing Process Analytics
**Source:** Report #003 — Bluesight
**S (Situation):** At Biokyowa, responsible for QC analytics across large-scale amino acid fermentation for pharmaceutical-grade clients — every batch had to meet FDA pharmaceutical specifications for downstream drug manufacturing.
**T (Task):** Ensure every batch of pharmaceutical-grade amino acids was analytically verified before customer delivery using HPLC, AA, and microbial analysis.
**A (Action):** Managed end-to-end HPLC, atomic absorption quality, and microbial seed analyses; applied SPC to identify and resolve production efficiency gaps; maintained full FDA compliance documentation.
**R (Result):** Zero customer-facing batch failures; FDA compliance maintained; production efficiency gaps resolved before external audit.
**Reflection:** The upstream precursor analytics I did at Biokyowa is conceptually identical to what Bluesight does — detect anomalies in pharmaceutical supply chain data before they cause harm downstream. The scale is different; the principle is the same.
**Best for questions about:** "Why healthcare/pharma," "domain background," "pharma supply chain," "controlled substance data context"

---

### [Teaching / Communication] Missouri Schools — Tiered Technical Communication
**Source:** Reports #002, #003 — GameChanger / Bluesight
**S (Situation):** As a certified STEM instructor, required to communicate data-driven curriculum insights simultaneously to parents (non-technical), teachers (varied technical literacy), and state DESE reviewers (compliance-focused).
**T (Task):** Translate the same underlying assessment data into three different outputs without losing accuracy.
**A (Action):** Built tiered reporting: raw assessment data for internal records, trend summaries for teachers, narrative progress reports for parents. Ran collaborative review sessions with teachers to validate interpretations.
**R (Result):** All three stakeholder groups engaged with data-driven decisions. State DESE review passed. Teachers adopted data-driven feedback cycles voluntarily.
**Reflection:** Know your audience's question before you present your answer. The data is the same — the framing determines whether it drives action or gets ignored.
**Best for questions about:** "Non-technical communication," "presenting findings to customers," "cross-functional collaboration," "stakeholder management"

---

## Batch 006–007 | 2026-04-12 | Tempus AI (Data Science + Bioinformatics)

---

### [ML Research] ARC-AGI Pipeline Bug Fix — Debugging a Silent Data Corruption
**Source:** Report #006 — Tempus AI — Associate Principal/Director, Data Science
**S (Situation):** Running R58 competition run; task 995c5fa3 was scoring zero despite a known-good solver existing for it.
**T (Task):** Diagnose why a previously validated solver was silently failing on a solvable task.
**A (Action):** Traced through DSL mutation and canonicalization logic; identified a deepcopy bug causing in-place mutation of shared state in search loops, silently corrupting subsequent evaluations.
**R (Result):** Bug fixed; zero-score tasks resolved; competition run restored to expected holdout levels.
**Reflection:** Mutable defaults are silent killers in search-loop contexts. Production ML pipelines need defensive data mutation practices — deepcopy conventions should be enforced as a code standard, not an afterthought.
**Best for questions about:** Debugging data pipelines, attention to detail, identifying silent failures, code quality, reproducibility in ML systems

---

### [QC + Biology] Biokyowa Biopharmaceutical QC — High-Stakes Biological Quality Control
**Source:** Report #007 — Tempus AI — Bioinformatics Analyst QC/VI
**S (Situation):** At Biokyowa, QC failures on pharmaceutical-grade amino acid fermentation could propagate to entire production batches affecting downstream biopharmaceutical manufacturing.
**T (Task):** Ensure sample and product quality through multi-instrument analysis with mandatory escalation protocols for any irregularities.
**A (Action):** Integrated HPLC, atomic absorption, and microbial seed analyses into SPC control charts; built hold protocols for out-of-spec readings; escalated anomalies to production team with clear data summaries and recommended actions.
**R (Result):** Maintained FDA compliance across all production runs; proactively caught process variance before product release; reduced reactive quality interventions.
**Reflection:** In high-stakes quality work, the cost of a false negative (missing a real problem) always outweighs the cost of a false positive (flagging a non-problem). Build systems that err toward sensitivity.
**Best for questions about:** Biological QC, clinical lab culture, data integrity, SPC, escalation protocols, high-stakes decision-making

---

### [Data Provenance] Biokyowa Cross-System Traceability
**Source:** Report #007 — Tempus AI — Bioinformatics Analyst QC/VI
**S (Situation):** Three separate analytical instruments at Biokyowa generated data for the same production run; all results had to be reconciled into a single coherent QC record for FDA audit purposes.
**T (Task):** Integrate HPLC, atomic absorption, and microbial outputs with full traceability from sample collection to analytical sign-off.
**A (Action):** Built a cross-system data tracking protocol; maintained a master QC log linking each instrument output to production lot numbers; ensured no data orphaning across systems.
**R (Result):** Full traceability for every production run; audit-ready records with zero traceability gaps.
**Reflection:** Data provenance is a habit, not a feature. Build it in from the start or spend twice the time reconstructing it during the audit.
**Best for questions about:** Data traceability, multi-system data integration, audit readiness, bioinformatics workflow management, documentation standards

---

## Batch 008–010 | 2026-04-12 | Correlation One + MagicSchool AI

---

### [Curriculum / Pedagogy] Scaffolding AI Concepts for Mixed-Level Learners
**Source:** Report #008 — Correlation One — Curriculum Developer (AI Learning Lab #1)
**S (Situation):** Teaching 5-12 STEM in Missouri, with students ranging from complete beginners to advanced in data/technology fluency — all in the same classroom.
**T (Task):** Design a lesson on AI/data concepts that worked for all levels without losing the advanced students or overwhelming beginners.
**A (Action):** Created tiered activities: core accessible concept for all, with clearly labeled extension challenges for advanced students. Used analogy-first framing to build the ramp, then layered in technical depth for those who wanted it.
**R (Result):** All learners completed core objective; advanced students engaged with extension challenges; post-assessment showed strong gains across the ability range.
**Reflection:** Scaffolding is not dumbing down — it is engineering multiple entry points into the same concept. Tiering is the technique.
**Best for questions about:** curriculum design, differentiated instruction, working with diverse learners, building accessible content, STEM education

---

### [Curriculum / Technical Communication] Translating ML Research into Accessible Curriculum
**Source:** Report #008 — Correlation One — Curriculum Developer (AI Learning Lab #1)
**S (Situation):** ARC-AGI research involved highly technical concepts (neuroevolution, MCTS, DSL design) that needed to be explained to non-expert audiences — students, collaborators, and potentially paper reviewers.
**T (Task):** Translate complex ML/AI concepts into accessible, accurate explanations without sacrificing correctness.
**A (Action):** Broke down each concept into analogy-first explanations, iterated on language until a non-expert could repeat the concept back correctly, then layered in technical precision.
**R (Result):** Successfully communicated research concepts to non-technical audiences in classroom and collaborative contexts; documentation adopted by collaborators without confusion.
**Reflection:** Abstract-first explanations fail beginners. Concrete example first, then theory — always.
**Best for questions about:** technical communication, curriculum design, explaining complex topics, simplifying without oversimplifying

---

### [Curriculum / Assessment] Building a Full Unit from Scratch Using Backward Design
**Source:** Report #008 — Correlation One — Curriculum Developer (AI Learning Lab #1)
**S (Situation):** First time teaching a data/statistics unit with no existing school curriculum or templates to start from.
**T (Task):** Build the complete unit including learning objectives, daily lessons, formative checks, and a summative assessment — aligned to state standards.
**A (Action):** Applied backward design: identified desired learning outcomes first, designed the summative assessment that would measure them, then built lessons that scaffolded toward that endpoint.
**R (Result):** Unit met Missouri state standards; assessment data showed strong learning gains; reused in subsequent years.
**Reflection:** Backward design is underrated outside formal education. Start from what you want the audience to know, then build backward.
**Best for questions about:** curriculum development, instructional design, assessment design, standards alignment

---

### [Python / Algorithm Design] Explaining MCTS as a Game-Theory Algorithm
**Source:** Report #009 — Correlation One — Curriculum Developer (AI Learning Lab #2)
**S (Situation):** ARC-AGI research required implementing MCTS and documenting it for collaborators with no prior game-tree search background.
**T (Task):** Write technical documentation that explained the game-tree search concept accurately to a non-expert.
**A (Action):** Used a tic-tac-toe analogy first (decision branches + smart pruning + simulation), mapped the analogy onto the ARC-AGI search space, then layered in full technical precision.
**R (Result):** Documentation was clear enough for a collaborator to implement a variation independently; the analogy persisted in team vocabulary.
**Reflection:** Analogies are scaffolding, not shortcuts. They don't replace the concept — they build the ramp to it.
**Best for questions about:** algorithm design, game theory, technical writing, Python, explaining ML concepts

---

### [GenAI / Education] Teaching Students to Use GenAI as a Thinking Partner
**Source:** Report #009 — Correlation One — Curriculum Developer (AI Learning Lab #2)
**S (Situation):** Students were using ChatGPT to complete Python homework rather than learn to code — GenAI was bypassing learning, not supporting it.
**T (Task):** Design an activity that taught productive GenAI use (strategy and problem decomposition) rather than passive output copying.
**A (Action):** Created a structured prompt-engineering exercise where students had to explain their intent to the AI, evaluate the output critically, modify or reject it based on their own understanding, and explain what they changed and why.
**R (Result):** Students engaged more critically with AI output; began using GenAI as a sounding board rather than an answer machine; metacognitive quality of coding explanations improved.
**Reflection:** GenAI in education is a strategy tool, not a shortcut. The pedagogical lesson is how to use it well.
**Best for questions about:** GenAI in education, AI literacy, iterative refinement, Python instruction, EdTech

---

### [Growth Analytics / EdTech] Educator Activation as a Product Design Problem
**Source:** Report #010 — MagicSchool AI — Senior Data Scientist, Growth
**S (Situation):** Teaching 5-12 STEM, a subset of students were persistently passive — present but never activating on new content or skills.
**T (Task):** Diagnose the activation failure and redesign the content entry point to convert passive students into active learners.
**A (Action):** Designed a "need to know" opening: a high-stakes problem requiring immediate engagement before any instruction was given. Students had to attempt something, fail productively, then receive the concept that unlocked success.
**R (Result):** Engagement and concept uptake measurably improved; previously passive students self-selected into extension activities they had never attempted before.
**Reflection:** The onboarding funnel exists in education too. The first 10 minutes determines whether a user activates. Activation is a design problem, not a motivation problem.
**Best for questions about:** user activation, growth analytics, EdTech, product thinking, student engagement, behavior change

---

### [Measurement Infrastructure] Building Holdout Scoring + Ablation Tracking for ARC-AGI
**Source:** Report #010 — MagicSchool AI — Senior Data Scientist, Growth
**S (Situation):** Competing in ARC-AGI Prize 2026 independently, making changes to a complex solver with no external validation loop — flying blind without a measurement system.
**T (Task):** Design a measurement infrastructure that reliably distinguished real solver improvements from noise.
**A (Action):** Built a systematic scoring pipeline: holdout set locked before tuning, checkpoint naming conventions, ablation comparisons run one variable at a time, research log maintained across all runs.
**R (Result):** System identified a canonicalization bug (D4 symmetry) invisible without systematic ablation tracking. Holdout score reached 0.79+.
**Reflection:** Measurement infrastructure is not a nice-to-have — it is what separates iteration from guessing.
**Best for questions about:** measurement systems, data infrastructure, experimental design, A/B testing, self-directed research, growth analytics

---

### [Cohort Analysis / Retention] Diagnosing a Cohort Retention Drop in the Classroom
**Source:** Report #010 — MagicSchool AI — Senior Data Scientist, Growth
**S (Situation):** Mid-year, a student cohort showed a sharp engagement and performance drop after a topic transition — confusing because the new topic was not objectively harder.
**T (Task):** Diagnose whether the drop was content-related, timing-related, or prerequisite-related before making any intervention.
**A (Action):** Ran a formative diagnostic to segment the cohort by prior knowledge; found the drop was concentrated in students with a specific prerequisite gap, not content difficulty; designed a targeted catch-up intervention only for that segment.
**R (Result):** Targeted intervention re-engaged the affected cohort; overall class performance recovered without unnecessary remediation for the rest.
**Reflection:** Cohort analysis before intervention. Don't treat all users the same because the aggregate metric is down. Segment, diagnose, then act.
**Best for questions about:** cohort analysis, retention analysis, EdTech, user segmentation, growth analytics, data-driven intervention

---

## Batch 011 | 2026-04-12 | Correlation One — Lead Instructor: GenAI

---

### [GenAI / Live Practitioner] ARC-AGI — Daily Prompt Engineering at the Frontier
**Source:** Report #011 — Correlation One — Lead Instructor: GenAI
**S (Situation):** Competing independently in ARC-AGI Prize 2026 — building a solver that required daily design, test, and refinement of prompt strategies using Claude API, ChatGPT, and open-source LLMs across ~1000 abstract visual reasoning tasks.
**T (Task):** Design and iterate prompt strategies capable of solving machine-frontier difficulty tasks; maintain a parallel applied-prompt project (prose-craft) to validate prompt engineering principles in a different domain.
**A (Action):** Daily prompt engineering cycles: hypothesis → prompt construction → evaluation against holdout → refinement. Built prose-craft as a parallel project: Claude API-powered content workflow with dual review gate and iterative voice-matching.
**R (Result):** ARC-AGI holdout score 0.79+; prose-craft producing accurate voice-matched output with dual review gates. Prompt strategies documented and iterated across 50+ runs.
**Reflection:** Prompt engineering is iterative design — the discipline is in the feedback loop, not the first draft. The same principles apply whether you're solving abstract reasoning tasks or generating matched prose.
**Best for questions about:** GenAI hands-on experience, real-world prompt engineering, Claude/ChatGPT applied use, iterative refinement, AI practitioner depth, "tell me about a GenAI project you built"

---

## Batch 012 | 2026-04-12 | Correlation One — AI Coach

---

### [AI Coaching / Business Problem Solving] SEMO Milling — Needs Analysis + Dual-Audience AI Adoption
**Source:** Report #012 — Correlation One — AI Coach
**S (Situation):** Production floor managers and lab analysts at SEMO Milling needed to act on the same SPC data but had fundamentally different technical literacy levels. Neither group was equipped to use existing technical outputs effectively.
**T (Task):** Diagnose the stakeholder needs, design a solution both groups could use independently, and train them to adopt it without ongoing analyst support.
**A (Action):** Conducted needs analysis across both stakeholder groups; built dual-output reporting system (technical SPC charts for analysts, red/yellow/green dashboard for floor managers); ran two training sessions focused on self-service use.
**R (Result):** Production floor staff began acting on SPC alerts independently; analyst bottleneck removed from routine decisions; yield improved.
**Reflection:** This is the coaching cycle: diagnose the gap, build or configure the solution, train the team, measure adoption. AI coaching at Correlation One is the same workflow with GenAI tools instead of SPC charts.
**Best for questions about:** AI adoption coaching, business problem diagnosis, training across expertise levels, stakeholder communication, customizing solutions to client needs

---

### [AI Coaching / Practitioner Depth] prose-craft — End-to-End AI Solution Delivery
**Source:** Report #012 — Correlation One — AI Coach
**S (Situation):** Real business problem: AI-generated content reliably fails to match a user's writing voice, making it unusable in professional contexts where authenticity matters.
**T (Task):** Diagnose the problem, design a Claude-based solution, build it, and validate that it works at a level that passes both AI-detection and craft-quality review.
**A (Action):** Built prose-craft — a Claude Code plugin that extracts user voice patterns, generates matched output, and runs a dual review gate (AI-pattern detection + craft depth evaluation). Added iterative learning loop that promotes observations to rule changes across sessions.
**R (Result):** Voice-matched output that passes both review gates; Rust CLI pre-screener for fast structural pattern detection; learning loop accumulates improvements automatically.
**Reflection:** Coaching an enterprise team to adopt a GenAI workflow is the same consulting cycle — diagnose, build, validate, iterate. The practitioner who has done this for themselves can do it with any client.
**Best for questions about:** "Tell me about an AI solution you built," hands-on Claude experience, end-to-end AI workflow design, stakeholder problem diagnosis, AI coaching depth
