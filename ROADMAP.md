# TerraLens delivery roadmap

**Purpose:** take TerraLens from a browser-only prototype to a safe, useful pilot for exploration teams and ASM cooperatives, then establish the foundations for a multi-site service.

**Planning basis:** phase lengths are relative to an approved project kickoff. They are estimates to be refined with the pilot partners, funding, field access, and regulatory advice. “Working system” means a service people can use for real, consented pilot workflows with reliable data handling; it does not mean that an unvalidated AI model can declare mineral resources.

## Where we are now

The current prototype demonstrates navigation, field-record and assay forms, local browser storage, example target cards, and illustrative cooperative sharing controls. It is useful for product conversations, but it is not a deployable multi-user system:

- Records live only in one browser and are not backed up or shared.
- There is no verified identity, server-side authorisation, audit history, or production consent mechanism.
- Demo records and target cards are not field evidence.
- There are no document-ingestion, GIS, sensor, laboratory, or AI integrations.
- The app is not yet a proven offline field application.

Keep the prototype as a discovery aid until the pilot workflows and consent model have been agreed. Do not enter sensitive or real cooperative data into it.

## Product principles and release boundaries

1. **Prove the workflow before automating it.** Start with one pilot geography, one cooperative partner, and one corporate or research design partner.
2. **Make data quality visible.** Preserve provenance, method, coordinate reference system where applicable, QA/QC evidence, and review status. Screening-grade and reportable-grade data must never be silently mixed.
3. **Make cooperative ownership enforceable.** Cooperative data is private by default. Sharing must be specific, revocable, auditable, and authorised by the data owner. Browser controls alone are not access control.
4. **Treat safety and consent as release requirements.** No field deployment without local security input, informed consent, instrument safety procedures, and relevant permits.
5. **Keep interpretation accountable.** Early target packages are evidence summaries for geoscientist review, not automated resource estimates or field-safety instructions.
6. **Design for intermittent connectivity.** The pilot should retain drafts offline and synchronise safely when a connection returns; never report unsaved work as synced.
7. **Minimise sensitive data.** Collect only what the workflow needs; protect precise site and individual information according to agreed governance and access rules.

## Roadmap at a glance

| Phase | Indicative duration | Outcome | Release gate |
| --- | --- | --- | --- |
| 0. Mobilise and agree the pilot | Weeks 0–3 | Named users, site, workflow, governance, baseline, and funded delivery plan | Partners approve the pilot charter and data-governance rules |
| 1. Build the secure data foundation | Weeks 4–8 | Deployed service, identity and roles, durable records, audit trail, backup and restore | Access, consent, recovery, and data-quality tests pass |
| 2. Deliver the first usable vertical slice | Weeks 9–13 | One end-to-end workflow: capture, QA/QC review, consented sharing, and export | Cooperative and corporate users complete the agreed tasks in usability testing |
| 3. Run a controlled field pilot | Months 4–6 | Real pilot records and assay comparisons gathered under approved protocols | Safety, data-quality, adoption, and value thresholds are met |
| 4. Operationalise and expand | Months 7–12 | Hardened operations and a repeatable deployment for additional blocks or cooperatives | Support, governance, reliability, and unit economics are accepted |
| 5. Add evidence-backed intelligence | Months 12–18+ | Validated geospatial and prospectivity workflows, introduced only when data supports them | Independent validation and geoscientist review approve each released capability |

## Phase 0 — Mobilise and agree the pilot (Weeks 0–3)

**Goal:** reduce the largest product, field, and governance uncertainties before building production infrastructure.

### Work

- Select one pilot geography and mineral focus with the cooperative and corporate/research partners. Nasarawa pegmatites are a candidate, not a preselected commitment.
- Appoint accountable leads for product, geoscience/data quality, community engagement, engineering, security, and regulatory coordination.
- Interview corporate users and cooperative members separately. Map each user's real workflow from observation/sample through interpretation, sharing, and any commercial decision.
- Agree the first two supported workflows:
  - **Field record:** capture a field observation or legacy record, source and method, location precision/access tier, quality grade, owner, and review status.
  - **Assay batch:** record sample identity, method, result, QA/QC evidence, chain of custody, lab confirmation, and who can view it.
- Draft a data dictionary and record lifecycle, including who may create, review, correct, export, and share each class of record.
- Agree cooperative governance: who is an authorised representative, how consent is recorded, what sharing covers, how it can be revoked, how benefit-sharing is agreed, and how disputes are handled.
- Complete a threat and privacy review covering sensitive coordinates, personal data, unauthorised access, device loss, backups, and data-retention requests.
- Confirm hosting and data-residency requirements with partners and qualified local advisers. Choose hosting only after operational, legal, and cost requirements are understood.
- Confirm site access, field security advice, permits, instrument availability/calibration, lab partner, insurance, and radiation/chemical safety needs as applicable.
- Record baselines: current data turnaround, sample-to-decision time, existing grading/price transparency, connectivity, and the partner's willingness to use the service.

### Exit criteria

- Signed pilot charter naming the site, users, workflows, partners, scope, budget, success metrics, and stop conditions.
- Cooperative-approved data-governance and consent process, including explicit opt-in and revocation.
- Approved fieldwork, safety, sample handling, instrument, and lab-check protocols.
- Prioritised requirements and tested prototype flows; no production data collected in the browser-only prototype.
- A written architecture decision for hosting, application, API, database, identity, offline sync, and backup, with an owner and rationale for each decision.

**Do not proceed to real cooperative-data collection** if ownership, authority to consent, access rules, or field safety remain unresolved.

## Phase 1 — Build the secure data foundation (Weeks 4–8)

**Goal:** replace browser-only persistence with a small, supportable service before real pilot data is entered.

### Minimum system capabilities

- A deployed web application and API backed by a durable database with automated backups and a tested restore procedure.
- Authenticated accounts and server-enforced roles for cooperative members/representatives, field operators, geoscientists/reviewers, corporate users, and administrators.
- A versioned record schema for field observations, legacy-document references, samples, assay readings, QA/QC, ownership, consent, access tier, provenance, and review status.
- Server-side access checks on every read, write, list, search, and export. Cooperative records are owner-only by default; consent grants must be scoped and revocable.
- An append-only audit trail for access grants, consent changes, edits, review decisions, exports, and administrative actions.
- Input validation, safe output encoding, secret management, encrypted transport, and encrypted storage where supported by the selected platform.
- Error reporting, operational health checks, recovery instructions, and named people responsible for handling incidents and user requests.
- A staging environment with synthetic data; production pilot data must not be copied into developer laptops or test fixtures.

### Data-quality workflow

- Preserve source and method rather than overwriting them during correction or transcription.
- Require coordinate reference system and location precision for georeferenced records; support restricted or generalised coordinates for sensitive sites.
- Treat screening-grade as the default.
- Allow reportable-grade designation only when the required QA/QC and chain-of-custody evidence is present and a qualified reviewer accepts it. A form checkbox by itself is not independent verification.
- Track missing information and review status; never infer a grade or silently convert screening data into reportable data.

### Exit criteria

- A cooperative user cannot access another cooperative's private record, including through direct API requests, search, exports, or guessed identifiers.
- Consent can be granted, revoked, and audited; revocation removes future access while keeping an appropriate audit record of the change.
- Backup restoration is demonstrated against a documented recovery objective agreed for the pilot.
- QA/QC requirements are enforced by the API, not only the user interface.
- A privacy/security review finds no unresolved high-risk issue in the pilot's defined threat scope.

## Phase 2 — Deliver the first usable vertical slice (Weeks 9–13)

**Goal:** prove one end-to-end, human-reviewed workflow with pilot users before adding sophisticated integrations.

### Workflow

1. An authorised user creates a field record or sample record on a phone or computer.
2. The record saves locally as a visible draft when offline; the interface clearly distinguishes draft, queued, synced, and failed states.
3. The service synchronises changes without silently overwriting conflicting edits and records the change history.
4. A reviewer checks provenance and QA/QC evidence, requests correction where needed, and records a review decision.
5. The cooperative representative chooses whether a specific cooperative-owned record can be shared, with the audience, purpose, duration, and benefit-sharing terms captured outside or alongside the technical permission.
6. An authorised corporate/research user sees only the records that have been deliberately shared with them.
7. Users can export a documented CSV and a human-readable report that preserve grade, provenance, coordinate metadata, access restrictions, and review status.

### MVP scope

- Start with data entry and small document attachments/references for one agreed use case.
- Provide a lightweight map or location reference only if the selected data provider, accuracy, and access requirements are clear. Do not imply that a sketch or illustrative map is survey-grade.
- Support English for the first pilot; validate Hausa/Pidgin, voice prompts, icons, and accessibility with users before claiming those experiences are production-ready.
- Keep assay values as recorded readings with instrument, operator, calibration, sample preparation, and lab confirmation context.
- Keep target intelligence as a reviewed evidence packet or manual ranking. No predictive model is required for the first usable release.

### Exit criteria

- At least five representative users across the cooperative and technical partner roles complete the agreed core workflow in a facilitated usability test.
- All agreed critical tasks can be completed without losing a record; offline drafts and failed synchronisation are apparent and recoverable.
- Cooperative users can explain what they are sharing, with whom, and how to stop future access.
- Geoscience reviewers can trace each reportable-grade record to its source, method, QA/QC evidence, and review decision.
- Pilot users approve the interface and workflow for limited, supervised field use.

## Phase 3 — Run a controlled field pilot (Months 4–6)

**Goal:** collect a small, consented, quality-controlled dataset and decide whether the system creates enough value to expand.

### Work

- Onboard one cooperative and one corporate, university, or accredited-lab partner under the agreed governance model.
- Train users in consent, device handling, sample identifiers, sample preparation, calibration, safety, and the limits of XRF, LIBS, GPR, and other selected tools.
- Begin with a small set of legacy records and a bounded survey area. Obtain rights and licences for every dataset; document restrictions before ingestion.
- Run a proposed 50–100 sample comparison only if the relevant instruments and accredited lab are available, the protocol is approved, and funding supports it. Compare screening readings with lab results; do not promise that one sample count proves a universal calibration.
- Use certified reference materials, blanks, duplicates, chain of custody, and lab checks at the rates defined by the approved method and qualified technical lead.
- Conduct remote sensing or drone work only after permits, airspace/security clearances, insurance, field safety, data rights, and local engagement are in place.
- Review data completeness, duplicate/conflicting records, sync failures, consent comprehension, time to complete tasks, assay turnaround, and user-reported benefit.
- Establish a baseline before claiming gains in price received, productivity, safety, target hit rate, or assay turnaround.

### Pilot measures

Agree numerical thresholds during Phase 0. Track at minimum:

- Share of records with complete provenance and required metadata.
- Share of proposed reportable-grade records accepted by a qualified reviewer.
- Offline capture success and sync-conflict/error rate.
- Median time from sample collection to a usable decision, compared with the agreed baseline.
- Number of active cooperative users and completed workflows, not just accounts created.
- Consent comprehension, revocation handling, and any unauthorised-access or data-loss incident.
- Cost per sample/record/survey unit and partner willingness to continue or pay.
- Verified field follow-up results, reported separately from model predictions.

### Exit criteria

- Pilot partners sign off on results and limitations, including gaps and failed tests.
- No unresolved serious safety event, data breach, or consent violation.
- Dataset provenance and QA/QC are adequate for the specific claims being made.
- At least one partner confirms a concrete reason to continue, such as a paid follow-on, written letter of intent, or funded public-benefit programme.
- A documented go/no-go decision chooses to stop, revise the workflow, or fund Phase 4.

## Phase 4 — Operationalise and expand (Months 7–12)

**Goal:** make the pilot service reliable to operate and repeatable at a second site.

### Work

- Improve onboarding, support, training, consent materials, localisation, and accessibility based on pilot observations.
- Add controlled import/OCR and georeferencing for legacy maps and reports. Preserve scanned originals, transcription provenance, coordinate assumptions, and human correction history; show OCR uncertainty.
- Add agreed geospatial formats and map layers only after data licensing, CRS handling, precision, and sensitivity rules are implemented.
- Introduce batch traceability or QR labels only after sample and lot identity procedures work operationally and do not expose restricted locations.
- Add deployment monitoring, service-level targets, incident response, data retention/deletion workflows, access reviews, and periodic restore/security exercises.
- Perform a scoped independent security assessment before increasing the amount or sensitivity of data stored.
- Test a second cooperative or block with a documented onboarding playbook; compare performance and costs with the first site.
- Validate commercial packaging and benefit-sharing with users; keep free/open data, licensed data, and cooperative-owned data clearly distinguished.

### Exit criteria

- The service has named operational owners, support paths, incident escalation, tested backup recovery, and an agreed availability target.
- A second site can be onboarded using documented procedures without weakening consent or QA/QC.
- Unit costs, partner value, and funding or revenue path are supported by pilot evidence.
- Any significant security findings have owners and remediation dates before broader rollout.

## Phase 5 — Add evidence-backed intelligence (Months 12–18+)

**Goal:** introduce analysis only as labelled evidence coverage grows; make uncertainty and validation visible.

### Work

- Build a licensed, documented evidence catalogue across legacy data, verified occurrences, geophysics, remote sensing, geochemistry, and reviewed field labels.
- Assess spatial bias, label quality, temporal consistency, coordinate uncertainty, missing-data patterns, and data rights before model training.
- Establish a reproducible baseline model with held-out spatial validation. Avoid random splits that leak nearby observations between training and validation.
- Publish uncertainty and coverage layers with every prospective ranking. Record model/version, input layers, exclusions, validation results, and responsible reviewer.
- Require geoscientist review and feedback before any target list is released; maintain a clear distinction between a hypothesis and a verified observation.
- Compare rankings against a defined baseline and prospective field checks. Do not claim commercial hit rates until independently measured against a pre-agreed denominator.
- Add secondary-resource inventory as a separate evidence programme: verify feedstock ownership/access, volumes, representative sampling, lab-confirmed grades, and radiation/environmental controls before process studies.

### Exit criteria

- Technical lead and independent reviewer accept the validation method and limitations for the proposed use.
- Users can see why a target was ranked, what is uncertain, where coverage is sparse, and who approved release.
- No model output is represented as a mineral resource/reserve estimate or as a substitute for qualified professional work.

## Critical path and decisions

These are prerequisites, not parallel nice-to-haves:

1. **Pilot site and partner authority** → determines the workflow, security plan, permits, language needs, and what data may be collected.
2. **Ownership, consent, and data classification** → determines the record schema, roles, storage, sharing, exports, and retention.
3. **Record schema and QA/QC protocol** → determines the API, review screens, assay workflow, and whether any record may be labelled reportable-grade.
4. **Hosting and threat model** → determines the deployment, identity, backup, encryption, and operations plan.
5. **Working vertical slice** → required before the first real records are collected at scale.
6. **Validated data coverage** → required before prospectivity modelling or performance claims.

Decide early with pilot partners:

- Which mineral/site is in scope, and which is explicitly out of scope?
- Which partner is authorised to consent for cooperative data, and how is that authority checked?
- What location detail is necessary for each workflow, and who may see it?
- What QA/QC protocol and accredited lab are available and affordable?
- Which permitted remote-sensing/drone sources and licences are actually obtainable?
- What connectivity, device, language, training, and support can be provided in the field?
- Which measurable pilot outcomes would justify stopping, changing, or expanding the work?

## First 30 days: action checklist

- [ ] Name the product owner, cooperative liaison, technical lead, geoscience/QA-QC lead, and field-safety contact.
- [ ] Choose the pilot-site shortlist with local partner input; verify access and current security advice before committing.
- [ ] Conduct separate workflow sessions with cooperative members and prospective corporate/research users.
- [ ] Draft and review consent, benefit-sharing, data classification, access, and revocation procedures with the cooperative.
- [ ] Identify the first available legacy dataset, check its ownership/licence, and inventory its format and quality.
- [ ] Confirm instrument access, calibration, lab partner, sample protocol, permits, and cost for a bounded assay comparison.
- [ ] Define a small, measurable baseline and set go/no-go thresholds for the pilot.
- [ ] Approve the minimum architecture and delivery budget; keep production and demo data completely separate.
- [ ] Turn the agreed workflows into acceptance tests before implementation begins.

## Explicitly out of scope for the first working pilot

- Automated mineral-resource/reserve estimates or JORC/NI 43-101 certification.
- Unreviewed AI target recommendations, deep-learning lineament detection, or claims of prospectivity accuracy.
- Live individual tracking, covert surveillance, or sharing sensitive location data without specific cooperative consent.
- General-purpose national cadastre replacement, regulator integration, or nationwide archive migration.
- Claims that field XRF can measure lithium, that a portable rare-earth reading is definitive, or that GPR is suitable in all soils.
- Processing or co-processing of radioactive tailings before specialist radiation, environmental, and regulatory review.
- Multi-state commercial rollout before the pilot meets its safety, governance, data-quality, and sustainability gates.

## Definition of a successful first working system

The first production pilot is ready to be called “working” when an authorised cooperative user can capture a record on an intermittent connection; the service durably synchronises it; the cooperative retains enforceable control over sharing; a qualified reviewer can inspect provenance and QA/QC; an approved external partner can access only the specifically shared records; and the team can recover the service and respond to a reported issue. Any public or investment-facing interpretation is clearly labelled with its evidence, uncertainty, limitations, and reviewer.
