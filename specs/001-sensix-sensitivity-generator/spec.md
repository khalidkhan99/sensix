# Feature Specification: SensiX Free Fire Sensitivity Generator

**Feature Branch**: `001-sensix-sensitivity-generator`  
**Created**: 2026-10-31  
**Status**: Ready for Planning  
**Input**: User description: "Free Fire Sensitivity Generator with Presets, Saved Profiles, and Sharing based on sensix-master-prompt.md"

## Clarifications

### Session 2026-10-31
- Q: How should language and localization be handled for the initial release? → A: Option A (English-Only v1) matching official in-game Free Fire settings terms ("General", "Red Dot", "2x Scope") exactly, with localization architecture prepared for v1.1.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Interactive Sensitivity Generation (Priority: P1)

As a Free Fire player, I want to input my device model, playstyle, finger layout, and experience level so that I can instantly get tailored sensitivity recommendations and fire button sizing.

**Why this priority**: This is the core value proposition of SensiX. Without the calculation engine and interactive form, the app cannot deliver its primary function.

**Independent Test**: Can be fully tested by selecting a device (e.g. Samsung A54), a playstyle (e.g. Rusher), 2 fingers, and intermediate experience, then verifying all 6 scope sensitivities and fire button size update deterministically in real time.

**Acceptance Scenarios**:
1. **Given** the user is on the generator screen, **When** they select their phone model and playstyle, **Then** all 6 sensitivity meters (General, Red Dot, 2x Scope, 4x Scope, Sniper Scope, Free Look) and the suggested Fire Button size (%) update instantly without page reloads.
2. **Given** the user has a phone not listed in the preset device catalog, **When** they select "Other / Not Listed", **Then** custom inputs for RAM (GB) and screen size (inches) appear, and adjusting them dynamically recomputes the sensitivity modifiers.
3. **Given** an optional DPI value entered by the user, **When** the DPI is within 240–640, **Then** a DPI modifier is factored into the calculation; if out of range, a friendly validation hint is displayed and the value is clamped safely.

---

### User Story 2 - Instant Expert Presets (Priority: P2)

As a player who wants a quick setup without answering questions, I want to browse tested sensitivity presets (such as Rusher, Headshot Machine, or Low-End Smooth) and adopt them with one click.

**Why this priority**: Presets provide immediate gratification for casual or impatient users and serve as benchmarks.

**Independent Test**: Can be fully tested by navigating to `/presets`, viewing the 6 curated presets, and clicking "Copy" or "Use Preset" to verify pre-calculated values load accurately.

**Acceptance Scenarios**:
1. **Given** the user is on the presets page, **When** they view the catalog, **Then** 6 distinct presets (Aggressive Rusher, Headshot Machine, Balanced All-Rounder, Sniper Specialist, Low-End Smooth, Tablet / iPad) are displayed with their taglines, target playstyle, and full sensitivity breakdown.
2. **Given** the user selects "Copy" on any preset card, **When** tapped, **Then** a formatted text summary is copied to the clipboard and a confirmation toast notification appears.

---

### User Story 3 - Local Profile Management & Data Portability (Priority: P2)

As a regular player who experiments with different weapon setups, I want to save multiple sensitivity profiles on my device and export/import them so I never lose my configurations.

**Why this priority**: Retention and long-term utility require players to save their customized configurations without needing an account or cloud server.

**Independent Test**: Can be fully tested by saving a profile from the generator, navigating to `/saved` to verify it appears, exporting the JSON backup, deleting the profile, and importing the JSON to verify restoration.

**Acceptance Scenarios**:
1. **Given** a generated sensitivity result, **When** the user enters a custom profile name and clicks "Save", **Then** the profile is persisted in local browser storage and accessible on the Saved page.
2. **Given** saved profiles on the Saved page, **When** the user clicks "Export Backup", **Then** a valid JSON file containing all saved profiles is downloaded to their device.
3. **Given** an exported backup JSON file, **When** the user uploads it via "Import Backup", **Then** the profiles are parsed, validated, deduplicated, and merged into the active profile list.

---

### User Story 4 - Social Sharing & High-Res Card Download (Priority: P3)

As a competitive player or content creator, I want to share my sensitivity settings with squad teammates via WhatsApp or download an aesthetically striking PNG image card.

**Why this priority**: Drives organic virality and squad coordination by making it effortless to share configurations.

**Independent Test**: Can be fully tested by clicking "Share" on a result card and confirming the share payload, and clicking "Card" to verify a 1080x1350 PNG image renders and downloads.

**Acceptance Scenarios**:
1. **Given** any generated or saved result card, **When** the user clicks "Share", **Then** the native Web Share dialog triggers, falling back to a pre-filled WhatsApp share link with formatted emoji text if native sharing is unavailable.
2. **Given** any result card, **When** the user clicks "Download Card", **Then** an HTML5 canvas renders a 1080x1350 dark gaming poster with glowing gradients, scope meters, fire button size, and disclaimer, triggering an immediate PNG image download.

---

### User Story 5 - In-Game Calibration & Training Guide (Priority: P4)

As a beginner or intermediate player, I want a concise guide on how to input these values into the Free Fire settings menu and practice them effectively.

**Why this priority**: Ensures users understand how to translate numbers into actual gameplay improvement and avoids frustration.

**Independent Test**: Can be fully tested by navigating to `/guide` and reviewing the 4 structured educational modules.

**Acceptance Scenarios**:
1. **Given** the user navigates to `/guide`, **When** the page renders, **Then** 4 clear educational cards display: (1) Applying settings in Free Fire, (2) 10-minute Training Grounds routine, (3) 3-5 point fine-tuning principles, and (4) Pro crosshair placement habits.

---

### Edge Cases

- **Custom / Unlisted Hardware**: If a user enters an unlisted device with atypical specs (e.g. 1GB RAM or 14-inch screen), calculation clamps values safely within 1–100 without NaN or breaking layout.
- **DPI Boundary Conditions**: If a user inputs negative numbers, non-numeric strings, or DPI > 1000, the input rejects or clamps the value to 240–640 with an inline validation notice.
- **Corrupted / Invalid JSON Import**: If a user uploads an invalid file or corrupted JSON during profile import, the app displays a specific error toast without crashing or erasing existing saved profiles.
- **Storage Cap (100 Profiles)**: If the user reaches the maximum threshold of 100 saved profiles, the system informs them to delete unused profiles or export a backup before adding new ones.
- **Offline Network State**: If the device loses internet connection, the PWA continues to function completely without degraded capabilities.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST compute 6 sensitivity values (General, Red Dot, 2x Scope, 4x Scope, Sniper Scope, Free Look) deterministically based on playstyle, hardware performance (RAM), screen dimensions, finger count, experience, and optional DPI.
- **FR-002**: System MUST clamp all sensitivity outputs strictly between 1 and 200 (integers) aligned with Free Fire's modern 200-point sensitivity system.
- **FR-003**: System MUST compute a recommended Fire Button size (%) clamped strictly between 30% and 80%.
- **FR-004**: System MUST bundle a device catalog containing 29+ popular models across Apple, Samsung, Xiaomi, Realme, Vivo, Oppo, Infinix, Tecno, and OnePlus.
- **FR-005**: System MUST provide a "Custom / Other" device option allowing manual entry of RAM (2GB–16GB) and screen size (4.7"–12.9").
- **FR-006**: System MUST provide 4 distinct playstyles (Rusher, Headshot Specialist, Balanced All-Rounder, Sniper Specialist) with distinct base numbers and contextual tips.
- **FR-007**: System MUST provide 6 static, pre-calibrated presets accessible from a dedicated Presets view.
- **FR-008**: System MUST persist custom profiles in browser `localStorage` under key `sensix:profiles:v1` without requiring backend accounts or network calls.
- **FR-009**: System MUST allow users to export all saved profiles as a downloadable JSON file and import previously exported JSON backups with duplicate avoidance.
- **FR-010**: System MUST format sensitivity settings into structured plain text with emoji headers for instant clipboard copying and WhatsApp sharing.
- **FR-011**: System MUST render and export a high-resolution 1080x1350 PNG image card directly in the browser using the HTML5 Canvas API.
- **FR-012**: System MUST provide a dedicated mobile bottom navigation bar (Home, Generator, Presets, Saved, Guide) on viewports < 768px and top navigation on desktop viewports.
- **FR-013**: System MUST support offline access as a Progressive Web App (PWA) via a web app manifest and service worker cache.
- **FR-014**: System MUST display an unambiguous disclaimer stating it is an unofficial fan-made tool with no affiliation to Garena or Free Fire.
- **FR-015**: System MUST present all calculated sensitivities explicitly as "recommended starting points" rather than guaranteed in-game cheats or auto-headshot tools.
- **FR-016**: System UI labels and guide copy MUST be presented in standard English in v1 to ensure 1:1 parity with in-game Free Fire settings menus.

### Key Entities

- **Device**: Represents mobile hardware profile. Attributes: `id` (string), `brand` (string), `name` (string), `ram` (number, GB), `screen` (number, inches), `hz` (number, optional refresh rate).
- **SensValues**: Represents the sensitivity settings package. Attributes: `general` (1-100), `redDot` (1-100), `scope2x` (1-100), `scope4x` (1-100), `sniper` (1-100), `freeLook` (1-100), `fireButton` (30-80%).
- **SavedProfile**: Represents a stored user setup. Attributes: `id` (string UUID), `name` (string, max 30 chars), `createdAt` (ISO timestamp), `label` (string, playstyle/device summary), `values` (SensValues).
- **Preset**: Represents a static benchmark setup. Attributes: `id` (string), `name` (string), `tagline` (string), `tag` (string badge), `bestFor` (string description), `values` (SensValues).

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A user can select their device, playstyle, and view calibrated sensitivity numbers in under 15 seconds.
- **SC-002**: 100% of generated sensitivity scope values fall strictly within the 1–200 integer range, and fire button sizes fall within 30–80%.
- **SC-003**: 100% of the application functionality (generating, browsing presets, saving profiles, reading guides) works when the device is completely disconnected from the network (offline PWA test).
- **SC-004**: Client-side PNG card generation completes in under 500ms on standard mobile hardware with crisp 1080x1350 resolution.
- **SC-005**: All UI touch targets meet or exceed the 44x44px ergonomic accessibility requirement on mobile screens down to 360px viewport width.
- **SC-006**: Zero runtime errors or TypeScript compilation failures across the entire codebase.
