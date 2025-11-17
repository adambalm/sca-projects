# CLAUDE.md

---
🚨 **CONTEXT: TennisFlyer Project**

This is the **TennisFlyer** promotional flyer project (SHIPPED - November 2025).

**DO NOT confuse with:**
- ResumeFactory (job application materials)
- SCAWebsite (future: main institutional website)
- EnrollmentAutomations (future: workflow automation)

This project is **completed and archived**. Use as reference for patterns and workflows.
---

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Tennis Academy promotional flyer for Springfield Commonwealth Academy. This project establishes a foundational workflow for frontend design using Playwright for visual testing and iterative design refinement via automated browser preview.

**Shipped product:** `COMPETITION-ENTRY-FINAL.png` - Final delivered promotional flyer
**Primary deliverable:** `flyer-final-optimized.html` - WhatsApp-optimized promotional flyer (HTML source)

**Project purpose:** Simple frontend design exercise to establish workflow patterns for future projects. Backend integration may be added in future iterations.

## Development Commands

### Testing & Preview
```bash
# Preview the final flyer design (browser stays open)
node scripts/view-final.js

# Test and validate the optimized map rendering
node scripts/test-optimized-map.js

# Run other test scripts (various design iterations)
node scripts/test-map-check.js
node scripts/test-map-fixed.js
node scripts/test-courts-version.js
node scripts/test-refined.js
```

### Playwright Setup
```bash
# Install dependencies
npm install

# Use project wrappers for consistent Playwright version (1.56.1)
./tools/pw-run.sh --version          # Bash
tools\pw-run.cmd --version           # Windows cmd

# Browser binaries location (centralized)
# C:\Users\Guest1\AppData\Local\ms-playwright
```

### Dependency Management
- **Playwright version:** Pinned at 1.56.1 (exact)
- **npm configuration:** `.npmrc` enforces exact versioning
- **Lockfile:** `package-lock.json` must be committed
- **Wrappers:** Use `tools/pw-run.*` scripts to ensure consistent browser cache path

## Architecture

### Design Process Workflow
1. **HTML Implementation** (`flyer-final-optimized.html`) - Production flyer source
2. **Playwright Scripts** (`scripts/*.js`) - Automated visual testing and preview
3. **Design Review** (`docs/design-review-notes.md`) - Comprehensive design analysis
4. **Final Output** (`COMPETITION-ENTRY-FINAL.png`) - Shipped product screenshot

### Critical Design Constraint
**Map section must display full route** (I-91S and CT-220E) without cropping:
- Height: 140px minimum (current: 180px in optimized version)
- Object-fit: `contain` (not `cover` - this was a critical fix)
- Object-position: `center`
- Background: `#f8fafc` to fill letterbox space
- Map dimensions: 714x140px

### Playwright Test Pattern
All test scripts follow this pattern:
```javascript
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1200, height: 900 });

  const htmlFile = 'C:/Users/Guest1/ClaudeProjects/TennisFlyer/[filename].html';
  const url = `file:///${htmlFile}`;
  await page.goto(url, { waitUntil: 'networkidle' });

  // Test/preview logic here

  await new Promise(() => {}); // Keep browser open for manual review
})();
```

**Key characteristics:**
- Non-headless mode for visual verification
- SlowMo: 50ms for observable interactions
- File:// protocol for local HTML testing
- Browser stays open indefinitely for manual review

## Design Review Process

**CRITICAL DIRECTIVE:** After ANY design modification to `flyer-final-optimized.html`:

1. Update `docs/design-review-notes.md` with:
   - What was changed
   - Why it was changed
   - Impact assessment
   - Any new issues discovered
   - Updated recommendations

2. Run visual verification:
   ```bash
   node scripts/test-optimized-map.js  # Validates map rendering
   node scripts/view-final.js           # Full design preview
   ```

3. Check against design constraints:
   - File size < 1MB (WhatsApp requirement)
   - Map route fully visible (no cropping)
   - Mobile-optimized layout (720px max-width)
   - Visual hierarchy maintained per `docs/design-review-notes.md`

## MCP Configuration

This project uses user-level MCP servers configured in `~/.claude.json` (available across all projects):

- **Playwright MCP** (`@playwright/mcp`) - Official Playwright integration
- **Context7 MCP** (`@upstash/context7-mcp`) - Context management with API authentication
- **Basic Memory MCP** (via `uvx`) - Knowledge persistence

Browser cache is centralized at `%USERPROFILE%\AppData\Local\ms-playwright` for sharing across projects.

## File Organization

```
/
├── flyer-final-optimized.html    # PRODUCTION FILE - Primary deliverable (HTML source)
├── flyer-final.pdf               # PDF export
├── COMPETITION-ENTRY-FINAL.png   # Shipped product screenshot
├── /img                          # Source images (tennis facility photos)
├── /scripts                      # Playwright test/preview scripts
│   ├── view-final.js            # Main preview script
│   └── test-optimized-map.js    # Map validation script
├── /docs
│   └── design-review-notes.md   # Comprehensive design analysis
├── /tools
│   ├── pw-run.sh                # Playwright wrapper (bash)
│   └── pw-run.cmd               # Playwright wrapper (Windows)
└── /product_notes               # Development history and migration notes
```

## Known Issues & Solutions

### Map Scaling (RESOLVED)
- **Problem:** Map was cropped, hiding route details
- **Solution:** Changed `object-fit: cover` → `contain`, increased height to 180px
- **File affected:** `flyer-final-optimized.html:140` (map-image class)

### WhatsApp Optimization
- Target file size: < 1MB
- Recommended dimensions: 1080x1920px (9:16 ratio)
- Current max-width: 720px (maintained for consistency)

## Testing Workflow

When modifying the flyer:

1. Edit `flyer-final-optimized.html`
2. Run `node scripts/test-optimized-map.js` to validate map
3. Run `node scripts/view-final.js` for full preview
4. Update `docs/design-review-notes.md` per directive above
5. Generate screenshots if needed (scripts save to `*.png` files)
6. Export to PDF if distributing print version

## Important Notes

- **Absolute paths:** Test scripts use Windows absolute paths (`C:/Users/Guest1/...`)
- **Browser persistence:** Test scripts keep browser open for manual review (infinite promise)
- **Viewport sizes:** Use 1200x900 or 1920x1080 for testing (desktop preview of mobile design)
- **Shipped product:** `COMPETITION-ENTRY-FINAL.png` represents the final delivered design
- **Future development:** Project may be extended with backend integration
- **Version control:** Commit `package-lock.json` and `.npmrc` to maintain consistent Playwright version
