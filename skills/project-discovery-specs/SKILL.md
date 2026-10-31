---
name: project-discovery-specs
description: Framework for scoping software projects, selecting modern technology stacks, and authoring specifications, data models, and API contracts before coding.
---

# Project Discovery & Specification Protocol

## Purpose
Enforces rigorous planning, stack selection, and specification authoring to prevent premature coding and structural rework.

---

## Stage 1: Discovery & Tech Stack Selection
When a new project is initiated:
1. **Never ask open-ended questions without concrete suggestions.**
2. **Present a ranked technology recommendation** based on scale, latency, and operational cost:
   - **Frontend**: Next.js (SSR/RSC), Vite/React (SPA), SvelteKit, or Flutter/React Native (Mobile).
   - **Backend / Microservices**: Node.js/TypeScript, Go (High throughput), FastAPI (Python/AI).
   - **Persistence**: PostgreSQL/Supabase (Relational), Redis (Caching/Queues), ClickHouse (Analytics).
   - **Styling**: Tailwind CSS + shadcn/ui or modern CSS tokens.
3. **Resolve Constraints**:
   - Confirm timeline, external APIs, auth requirements, and deployment targets (Vercel, AWS, Cloud Run, VPS).

---

## Stage 2: Specs & Contract Authoring
Before touching implementation code, query:
*"Do you require formal specifications (PRD, Data Models, API Contracts) before code generation begins?"*

### If YES:
Author a concrete specification document containing:
1. **Functional Requirements**: Explicit list of user flows and system boundaries.
2. **Data Architecture**:
   - Entity-Relationship definitions (tables, foreign keys, unique indexes, nullability constraints).
   - Migration strategy.
3. **API Contracts**:
   - HTTP Methods, exact routes, request headers, request bodies, and error response shapes.
   - Validation schemas (e.g., Zod, Pydantic).
4. **Edge Cases**:
   - Network drop handling, race conditions, token expiration, idempotency on write actions.

### If NO (Fast-Track Mode):
Produce a concise, 5-step numbered execution plan directly in chat and request immediate user confirmation before scaffolding.
