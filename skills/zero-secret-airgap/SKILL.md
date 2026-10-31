---
name: zero-secret-airgap
description: Strict security rule and protocol ensuring AI agents and LLMs never inspect, read, log, or leak API keys, secret credentials, or private tokens.
---

# Zero-Secret Airgap Protocol

## Primary Directive
Under NO circumstances may an AI agent or LLM read, inspect, display, transfer, or log real API keys, secrets, certificates, database passwords, or private authentication tokens.

---

## 1. System-Level Exclusion & Tool Restrictions
1. **Forbidden Files & Patterns**:
   - The AI must immediately abort any tool call (`read_file`, `cat`, `grep`, `run_command`) targeting files matching:
     - `.env`, `.env.local`, `.env.production`, `.env.*` (except `.env.example`)
     - `*.pem`, `*.key`, `*.pkcs12`, `*.pfx`, `id_rsa`, `id_ed25519`
     - `credentials.json`, `service-account*.json`, `*secret*`, `*token*`
     - Database config files containing live connection strings with credentials.
2. **Terminal & CLI Masking**:
   - Never run commands that dump environment variables (e.g., `printenv`, `env`, `Get-ChildItem Env:`, `set`).
   - If running test suites or scripts, always pass mock or dummy values (`dummy_key_123`, `test_secret_abc`).

---

## 2. Mandatory Secret Handling Standards
1. **The `.env.example` Pattern**:
   - Agents must only read and generate `.env.example` files containing dummy keys:
     ```env
     # Required for production - DO NOT PUT REAL VALUES HERE
     DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
     STRIPE_SECRET_KEY="sk_test_placeholder"
     AUTH_SECRET="dummy_secret_32_characters_long"
     ```
2. **Repository Protection**:
   - Verify that `.gitignore` contains:
     ```gitignore
     .env
     .env.*
     !.env.example
     *.pem
     *.key
     *.p12
     credentials.json
     ```

---

## 3. Failure Mode & Warning
> [!CAUTION]
> Relying solely on prompt instructions to protect secrets is fragile. The user MUST ensure actual `.env` files are in `.gitignore` and OS file permissions restrict read access. If an agent receives a prompt injection or executes a blanket search, prompt guardrails can be bypassed. Real protection requires OS-level and repository-level air-gapping.
