---
name: production-hardening
description: Production-readiness audit and optimization protocol covering application security, Core Web Vitals performance, modern SEO, and observability.
---

# Production Hardening Protocol

## Purpose
Enforces non-negotiable standards for security, speed, discoverability, and system resilience prior to production deployment.

---

## 1. Security Architecture & OWASP Defense
- **Authentication & RBAC**:
  - Secure session storage: HttpOnly, Secure, SameSite=Strict cookies. Avoid sensitive data in `localStorage`.
  - Role-based route middleware protecting privileged endpoints.
- **Injection & Tampering Defense**:
  - Parameterized database queries exclusively (zero raw string SQL concatenation).
  - Strict input sanitization and payload validation.
  - Rate limiting on public and auth endpoints (`express-rate-limit`, Upstash Redis).
- **HTTP Security Headers**:
  - Enforce Content-Security-Policy (CSP), Strict-Transport-Security (HSTS), X-Frame-Options: DENY, and X-Content-Type-Options: nosniff.

---

## 2. Speed & Performance (Core Web Vitals)
- **Target Metrics**:
  - Largest Contentful Paint (LCP) < 2.5s.
  - Cumulative Layout Shift (CLS) < 0.1.
  - Interaction to Next Paint (INP) < 200ms.
- **Frontend Optimization**:
  - Modern image pipelines: WebP/AVIF formats with explicit width/height dimensions.
  - Font optimization: Local self-hosting or preloading with `font-display: swap`.
  - Route-level and component-level code splitting.
- **Backend & Database**:
  - Query indexing verified via `EXPLAIN ANALYZE`.
  - Cursor-based pagination on large collections.
  - Cache strategies (HTTP Cache-Control headers, Redis caching for hot queries).

---

## 3. Modern SEO & Discoverability
- **Metadata Automation**:
  - Dynamic OpenGraph (og:title, og:image, og:description) and Twitter Card tags per route.
  - Canonical link tags to prevent duplicate indexing.
  - Auto-generated `robots.txt` and `sitemap.xml`.
- **Semantic Crawling**:
  - JSON-LD Structured Data (Organization, WebSite, Article, or Product schemas).
  - Strict heading hierarchy (Single `h1` per page, sequential `h2` to `h6`).

---

## 4. Observability & Resilience
- **Structured JSON Logging**:
  - Standardized log schema: timestamp, log level (INFO, WARN, ERROR), request_id, user_id, message.
- **Error Tracking & Alerting**:
  - Centralized error boundaries in frontend frameworks to catch React/Vue crashes.
  - Integration hooks for error aggregation services (e.g., Sentry, Datadog).
- **Circuit Breakers & Retries**:
  - Exponential backoff on outgoing external API calls.
  - Fallback UI components when third-party services fail.
