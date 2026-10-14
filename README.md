# TerraLens prototype

A dependency-free, browser-based starting point for the TerraLens MVP described in the project brief. The first slice focuses on the shared data core and cooperative field workflow.

## Run locally

Open `index.html` in a modern browser. No build step, package installation, backend, or network connection is required for the app to function.

## Current prototype

- Overview for the corporate and cooperative tracks.
- Searchable field-record register with screening/reportable grades and access tiers.
- Local record creation and cooperative opt-in sharing controls.
- Assay log with an XRF/lithium guardrail and QA/QC checks for reportable-grade entries.
- Target-intelligence and secondary-resource example cards, prominently marked as illustrative.
- Browser `localStorage` persistence. Records are not synced, backed up, or transmitted.

The preloaded records and assay samples are fictional demo entries. No real maps, geospatial coordinates, remote sensing, AI prospectivity model, user authentication, cooperative identity verification, or server-side permissions are implemented. Do not use the target cards or demo readings for exploration, investment, safety, or resource-reporting decisions. A production service will need authenticated roles, server-enforced access controls, consent and benefit-sharing workflows, auditable data provenance, QA/QC review, security and privacy threat modelling, and appropriate regulatory and community engagement.

## Suggested next implementation milestone

Replace browser-only storage with a secured, Nigeria-resident API and database; define the JORC/NI 43-101-aligned record schema and auditable consent model before ingesting real or sensitive location data.
