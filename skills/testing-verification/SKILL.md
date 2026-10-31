---
name: testing-verification
description: Enforces automated testing, type verification, linter execution, and zero-stub code delivery standards.
---

# Testing & Verification Protocol

## Purpose
Guarantees code reliability through automated verification, eliminating placeholder logic, untested assumptions, and silent regressions.

---

## 1. Zero-Stub & Zero-Placeholder Mandate
- **No Mock Implementations in Production Code**:
  - Never leave `// TODO: implement later`, `pass`, `throw new NotImplementedError()`, or stubbed dummy functions in functional code.
  - Every required feature path must be completely written and functional.
- **Type Safety**:
  - Strict typing enabled (`noImplicitAny`, TypeScript strict mode, Python mypy/type hints).
  - Schema-validated boundaries (`zod`, `pydantic`) for all external I/O (API requests, database reads).

---

## 2. Automated Test Suite Standards
Every new feature or major refactor must include automated tests:

### A. Unit Testing
- Test critical business logic in isolation.
- Cover happy path, boundary edge cases (null, empty arrays, extreme numbers), and intentional failure paths (invalid inputs).

### B. Integration Testing
- Test API route handlers with simulated database interactions or transactional test databases.
- Test authentication flows, unauthorized access blocks, and state transitions.

### C. Pre-Delivery Verification Steps
Before declaring any task or project complete:
1. Run static analysis and linting (`npm run lint`, `eslint`, `ruff`, `flake8`).
2. Run type checking (`npm run type-check`, `tsc --noEmit`, `mypy`).
3. Run the automated test runner (`npm test`, `pytest`, `cargo test`, `vitest`).
4. Fix all warnings and errors. Never suppress linter errors with disable comments (`eslint-disable`, `type: ignore`) without explicit architectural justification.
