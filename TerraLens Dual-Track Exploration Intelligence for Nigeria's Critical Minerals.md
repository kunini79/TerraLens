# TerraLens: Dual-Track Exploration Intelligence for Nigeria's Critical Minerals

*Proposed solution to the Challenge Statement: Nigeria, Pan African Exploration Technology Pre-Incubation Program (Nasarawa State University Keffi Mine-Tech UniPod). TerraLens is a working name.*

## 1. Executive summary

Nigeria's critical-minerals opportunity is constrained less by geology than by information. Deposits sit under thick regolith, historical data is on paper, assays take weeks, ground access is risky, and the artisanal and small-scale miners (ASM) who do 80% to 90% of the physical extraction have none of the tools that corporate explorers use.

TerraLens is one platform with two entry points sharing a single data core:

- **Corporate track:** remote-first exploration (drone magnetics and radiometrics, satellite SAR, AI target generation) built on a digitised legacy-data cloud aligned with JORC and NI 43-101 reporting.
- **ASM track:** an offline-first cooperative toolkit (digital cadastre, safe-corridor mapping, pit-side assay, transparent grading) that formalises informal mining and produces the ground-truth data corporates need.

**The core idea:** ASM operators are the densest ground-truth network in the country, and corporates are the main buyers of exploration intelligence. Connecting them, with consent, benefit-sharing and strict data-quality rules, turns the dual operational spectrum from a policy headache into a data flywheel. A third module audits secondary sources (Jos Plateau tailings, fly ash, brines, carbon-rich residues) for the same two customer groups.

## 2. The problem in one page

The challenge statement lists six bottlenecks. They reduce to three questions every explorer is asking:

1. **Can we see it?** Regolith and vegetation hide targets, and optical remote sensing struggles.
2. **Can we get there?** Security risks make conventional ground surveys dangerous.
3. **Can we trust and use the data?** Legacy records are fragmented, assays are slow, and sedimentary-hosted systems lack suitable models.

On top of this sits a structural split. Corporates need bankable, standards-compliant data. ASM cooperatives need cheap, simple tools and fair prices. A solution built for only one side leaves the other as either a bottleneck or a casualty. TerraLens is designed so each side makes the other's product better.

## 3. Solution architecture

### Layer 1: Data core (TerraLens Data Cloud)

- **Digitisation pipeline:** scan, OCR, georeference, standardise, then flag quality. Output schema mirrors JORC Table 1 and NI 43-101 fields (sampling, QA/QC, coordinate system, lab method).
- **Sources:** legacy maps and reports, borehole logs, geochemical archives, national airborne geophysical grids where licensing allows, open satellite data (Sentinel-1/2, Landsat, ASTER, L-band SAR such as ALOS PALSAR and NISAR), plus new drone and field data.
- **Three access tiers:** an open pre-competitive layer (to attract investment), a licensed layer for paying clients, and a cooperative-owned layer that miners control and can choose to share.
- **Data sovereignty:** a Nigeria-resident hosting option and a mirrored national archive for the regulator, so the platform strengthens public geoscience rather than extracting from it.

### Layer 2: Sensing

**Corporate track**

- Long-range UAV magnetometry and radiometrics for low- or zero-ground-footprint reconnaissance of insecure belts.
- SAR time-series (including L-band, which penetrates vegetation better than C-band) for structure, drainage and surface-change mapping.
- Partner-operated deep-penetrating time-domain EM over high-priority targets.
- Handheld XRF and LIBS plus mobile micro-labs for real-time vectoring.

**ASM track**

- Low-cost rugged handheld analysers shared through a cooperative **assay hub** (a rentable, pit-side service point) rather than sold to individual miners.
- Simple stratigraphic sampling kits for placer and soft-sediment work.
- Satellite-derived deposit and corridor maps delivered through the mobile app.
- Shallow GPR only where soil conditions suit it (see Section 5).

### Layer 3: Intelligence (AI target generation)

- **Mineral-systems approach:** model the geological process (source, pathway, trap) rather than just the commodity, so features like structure, magnetic lows, radiometric potassium/thorium signatures and drainage geochemistry are used as evidence layers.
- **Models:** start with interpretable baselines (gradient boosting, random forests) for prospectivity mapping, add deep-learning lineament and basement-feature detection once labelled data exists, and always output **uncertainty maps** alongside targets.
- **Training labels:** known occurrences, historic workings, and verified ASM pit data. Labels are sparse and biased toward accessible ground, so the system uses weak-label methods and flags areas of low coverage rather than pretending to certainty.
- **Geoscientist in the loop:** every target list is reviewed by a geologist before release; the model is a ranking tool, not an oracle.
- **Flywheel:** every new drone line, pit-side reading and lab-confirmed sample retrains the models, so accuracy improves with adoption.

### Layer 4: Community and formalisation

- **Cooperative app:** offline-first, icon-led, available in English, Hausa and Pidgin, with voice prompts for low-literacy users.
- **Digital cadastre and registration:** georeferenced pit and licence boundaries, simple onboarding to formal registration, and a path to legitimate supply chains.
- **Safe corridors:** opt-in geofencing and safety alerts, with satellite-monitored cooperative boundaries. Data stays under cooperative control.
- **Fair-price grading:** pit-side assay results are displayed to the miner and logged, with batch-level traceability (QR-coded lots) aligned with the OECD Due Diligence Guidance for responsible mineral supply chains. This is how the platform counters ore downgrading by middlemen.

### Module: Secondary and non-conventional sources

A **Secondary Resource Inventory** comes first, before any process development:

- Map and sample Jos Plateau tin and columbite tailings for monazite, xenotime, zircon and residual battery metals.
- Screen other candidates (coal fly ash, oilfield produced-water brines, refinery petroleum coke) for **actual volumes, grades and accessibility**. Some of these examples may turn out to be small or hard to source in Nigeria, so the inventory decides priorities with evidence.
- Hand promising feedstocks to process partners (leaching and solvent extraction, direct lithium extraction, synthetic graphite) and offer ASM co-processing models where safe.

## 4. Bottleneck-to-solution map

| Bottleneck | Corporate track | ASM track | TerraLens component |
| --- | --- | --- | --- |
| Obscured subsurface geology | UAV magnetics/radiometrics, SAR, TDEM partners, AI target generation | Satellite deposit maps, shallow geophysics where soil allows, community sampling | Sensing + Intelligence |
| Security and access | Long-range drone surveys, SAR reconnaissance | Safe-corridor geofencing, SOS alerts, cooperative boundary monitoring | Sensing + Community |
| Fragmented legacy data | Digitisation and standardisation to JORC/NI 43-101 | Simple georeferenced deposit maps, digital registration | Data Cloud |
| Delayed field assaying | Handheld XRF/LIBS, mobile micro-labs, matrix correction | Shared pit-side assay hubs, transparent grading | Sensing + Community |
| Sedimentary-hosted minerals | Shallow seismic, GPR, borehole logging workflows | Modular stratigraphic sampling kits | Sensing + Intelligence |
| Secondary sources | Industrial auditing and characterisation workflows | Co-processing pathways for tailings | Secondary Resource Inventory |

## 5. Field protocols and data quality

This is where most exploration-tech pitches fail, and where credibility is won.

**Two data grades.** Everything in the platform is tagged:

- **Screening-grade:** fast field readings and model outputs, useful for ranking and decisions in the field.
- **Reportable-grade:** data produced under documented QA/QC (certified reference materials, field duplicates, blanks, a set share of samples sent to an accredited lab, chain of custody) so it can support formal resource reporting.

Mixing the two without labels would destroy trust with investors, so the platform never allows it.

**Instrument realism:**

- **Handheld XRF cannot measure lithium.** Lithium is too light for the technique. Use **LIBS** for lithium, and use XRF for pathfinder elements (Rb, Cs, Nb, Ta, Sn) and for tin, tantalum, niobium, copper, nickel and manganese.
- **Rare earths** are only roughly screened by portable tools at typical field detection limits. Treat results as indicative and confirm at a lab.
- **GPR** loses depth quickly in conductive, clay-rich tropical soils. Use it selectively (dry sandy ground, shallow placers) and rely on magnetics, EM and geochemistry as primary tools elsewhere.
- **Matrix correction** needs calibration per mineral and per region, built from lab-confirmed local samples. This calibration library becomes a core platform asset.

## 6. Business model

Two-sided, with the commercial side funding access for the community side.

| Customer | What they buy | Revenue model |
| --- | --- | --- |
| Exploration and mining companies | Licensed data layers, AI target packages, drone survey services, assay-as-a-service | Subscriptions, per-survey and per-package fees |
| Government and regulators | Digitisation, a national data archive, cadastre and formalisation tooling | Service contracts and development-finance-funded programmes |
| ASM cooperatives | App, assay hub access, traceability, market linkage | Low-cost membership, per-test fees, small traceability margin on formalised sales |
| Process and refining partners | Secondary resource inventories and feedstock characterisation | Project fees |
| Development partners and funders | Verified formalisation and safety outcomes | Grants and results-based financing |

**Principle:** miners must never pay for access to their own data, and any data a cooperative shares with corporates is compensated through a transparent benefit-sharing agreement.

## 7. Pilot and roadmap

**Pilot geographies (suggested):**

- **Nasarawa:** lithium and associated pegmatite minerals, with both ASM and corporate activity and proximity to the host university.
- **Jos Plateau:** tin and columbite tailings for the secondary-source module.

Choose specific sites with security input from local partners; where access is uncertain, begin with remote sensing and community-collected data.

| Phase | Timeline | Key activities | Exit milestone |
| --- | --- | --- | --- |
| 0: Foundation | Months 0 to 3 | Partner agreements, data-access requests, digitise a first set of legacy records, field-validate instrument protocols, community consultation | Working data pipeline and signed pilot cooperative(s) |
| 1: Pilot | Months 3 to 9 | Drone magnetic/radiometric surveys on 1 to 2 blocks, SAR analysis, first AI prospectivity model, cooperative app v1, two assay hubs, tailings sampling | First ground-verified targets, reportable-grade dataset, first paying or letter-of-intent corporate client |
| 2: Scale | Months 9 to 18 | Expand to additional blocks and minerals, cadastre and traceability for more cooperatives, secondary-resource inventory release, regulator integration | Repeatable service across multiple states and a sustainable revenue base |

**MVP in the first 90 days (what a small team can realistically prove):**

1. Digitise and publish a legacy dataset for one pilot area.
2. Fly one drone magnetic/radiometric survey over a known pegmatite field and compare results with known workings.
3. Run LIBS and XRF side by side with lab results on 50 to 100 samples to prove the calibration approach.
4. Put a clickable cooperative app prototype in front of one ASM group and record their feedback.

## 8. Safeguards and responsible practice

- **Community consent and data governance:** free, prior and informed consent for any data collection; a data-trust or cooperative-ownership model; opt-in geofencing with no tracking of individuals.
- **No surveillance creep:** location and safety data is never sold or handed to third parties without cooperative consent.
- **Responsible sourcing:** screening for conflict, child labour and illegal-trade risk in line with OECD guidance; safety training bundled with every assay hub.
- **Radiation and chemical safety:** monazite and xenotime-bearing tailings can carry thorium and uranium. Radiation screening and handling protocols are mandatory in the tailings module. Mercury use is addressed in training where relevant.
- **Environmental safeguards:** reclamation baselines for tailings sites and a do-no-harm review before any co-processing proposal.
- **Inclusion:** target participation of women and youth in cooperative training and assay-hub operation.
- **Regulatory compliance:** drone permits and security clearances, licensing for radiation sources and instruments, and alignment with solid-minerals regulations from day one.

## 9. Partners

- **Academic and incubation:** Nasarawa State University Keffi Mine-Tech UniPod and UNDP for mentorship, convening and credibility; geoscience departments for validation.
- **Government:** Ministry of Solid Minerals Development, the Nigerian Geological Survey Agency, the Mining Cadastre Office, and state mining bodies for data access, licensing context and formalisation pathways.
- **Industry:** exploration firms and processors as design partners and first customers; accredited labs for check assays.
- **Community:** ASM cooperatives, traditional institutions and local civil-society organisations for trust, training and adoption.
- **Technology:** drone and sensor providers, satellite data providers, and cloud partners (with local-hosting options).
- **Finance:** development finance institutions, impact investors and grant makers.

## 10. Risks and mitigations

| Risk | Mitigation |
| --- | --- |
| Poor-quality or sparse training data produces unreliable AI targets | Uncertainty maps, geologist review, staged rollout, publish validation results openly |
| Field instruments give misleading results | Local calibration library, two-grade data tagging, regular lab checks, honest limits per instrument |
| Security incidents during fieldwork | Remote-first sensing, local partner guidance, opt-in safety tools, no work in unsafe zones |
| Miners distrust the platform or fear regulators | Cooperative-owned data tier, transparent governance, benefit-sharing, no forced reporting |
| Corporates will not pay for early-stage data | Free pre-competitive layer to build demand, pilot letters of intent, results-based pricing |
| Regulatory or permitting delays (drones, instruments, radiation sources) | Early engagement with regulators, use of licensed partners during pilot |
| Hardware cost and theft | Shared assay hubs instead of per-miner devices, insurance, local operator model |
| Data sovereignty and political sensitivity | Nigeria-hosted option, mirrored national archive, public-benefit layer |

## 11. Impact metrics

Targets below are illustrative and should be calibrated once pilot baselines exist.

- **Data:** legacy records digitised and standardised; share of records rated reportable-grade.
- **Exploration efficiency:** targets generated, hit rate on ground verification, time from survey to target list compared with conventional methods.
- **Assay speed:** median turnaround from sample to decision (field screening in minutes to hours versus weeks for lab-only workflows).
- **ASM outcomes:** cooperatives onboarded, miners formally registered, share of sales with transparent grading, change in price received versus local middleman baseline.
- **Safety:** incidents and near-misses reported, safe-corridor adoption.
- **Secondary resources:** tailings and other sites characterised, volumes and grades published.
- **Commercial:** paying clients, recurring revenue, cost per survey kilometre.
- **Inclusion:** share of women and youth trained and employed.

## 12. Resource allocation (indicative)

Approximate split of a pre-incubation to seed-stage budget:

- Field operations and sensing (drone surveys, instruments, calibration, lab checks): about 30%
- Software and data engineering (data cloud, AI models, mobile app): about 30%
- Community engagement, training and assay hubs: about 15%
- Team, geoscience expertise and advisory: about 15%
- Compliance, insurance, security and contingency: about 10%

**Core team needed:** a geoscientist (exploration and geochemistry), a geophysicist or remote-sensing specialist, a certified drone operations lead, a data and machine-learning engineer, a mobile and web developer, a community and cooperative liaison, and a regulatory and partnerships lead.

## 13. Why this approach wins

- It addresses **both** spectrum ends instead of choosing one, and makes each side more valuable to the other.
- It is **remote-first**, which fits the security reality.
- It is **honest about instrument limits**, which is rare and builds investor trust.
- It builds a **reusable data asset** (digitised archive, calibration library, ground-truth labels) that competitors cannot copy quickly.
- It has a **credible path to revenue** while still producing public-benefit outcomes that funders and the UNDP ecosystem value.

## 14. Next steps

1. Confirm program requirements (format, length, judging criteria, funding ceiling) so this can be trimmed to fit.
2. Choose the pilot mineral and site, and open conversations with one cooperative and one corporate design partner.
3. Secure access to a first legacy dataset and book a drone survey window.
4. Draft the one-page pitch and a 90-day MVP plan from Sections 7 and 12.
