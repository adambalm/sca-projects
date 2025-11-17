# TennisFlyer Project Post-Mortem

**Project:** Tennis Academy Promotional Flyer
**Date:** November 2025
**Status:** ✅ Shipped
**Delivered:** `COMPETITION-ENTRY-FINAL.png`

---

## Executive Summary

Simple frontend design project to establish foundational workflows for iterative design using Claude Code and Playwright. Successfully delivered WhatsApp-optimized promotional flyer while establishing reusable patterns for visual testing and AI-assisted development.

**Key Achievement:** Established end-to-end workflow from HTML development → Playwright testing → visual refinement → final delivery.

---

## Project Objectives

### Primary
- ✅ Create WhatsApp-optimized promotional flyer for Springfield Commonwealth Academy
- ✅ Establish foundational frontend design workflow
- ✅ Test Playwright integration for visual design iteration

### Secondary
- ✅ Configure MCP servers (Playwright, Context7, Basic Memory) for enhanced tooling
- ✅ Document workflow for future projects
- ⚠️ Learn Claude Code best practices (partially achieved - see lessons learned)

---

## What Went Well

### 1. **Playwright Visual Testing Workflow**
- Non-headless browser preview with infinite wait (`await new Promise(() => {})`) worked excellently for manual visual review
- `slowMo: 50ms` provided observable interactions during testing
- File protocol (`file:///`) enabled rapid local iteration without server setup
- Centralized browser cache (`%USERPROFILE%\AppData\Local\ms-playwright`) shared across projects efficiently

**Impact:** Enabled rapid design iteration with immediate visual feedback.

### 2. **Dependency Management**
- `.npmrc` with `save-exact=true` prevented version drift
- Pinning Playwright to 1.56.1 ensured consistency
- Lockfile commitment avoided "works on my machine" issues

**Impact:** Reproducible builds and testing environment.

### 3. **Project Documentation**
- `CLAUDE.md` provided excellent context persistence for Claude Code
- Design constraints documented early prevented rework
- Map scaling issue (object-fit: cover → contain) documented with line numbers

**Impact:** Context continuity across sessions, faster problem resolution.

### 4. **Final Product Quality**
- Map displays full route (I-91S and CT-220E) without cropping
- WhatsApp-optimized (< 1MB, mobile-first 720px layout)
- Clean visual hierarchy maintained

---

## What Didn't Go Well

### 1. **MCP Server Configuration Hell** 🔥
**Problem:** Multiple configuration files with conflicting/duplicate server definitions created hours of debugging.

**Issues encountered:**
- `.mcp.json` vs `.claude/settings.json` vs `~/.claude.json` hierarchy unclear
- Windows requires `cmd /c` wrapper for `npx`/`uvx` - not documented clearly
- Malformed JSON (unescaped backslashes in Windows paths) broke silently
- User-level vs project-level scope created conflicts
- Context7 API key placement unclear (env var vs config file)

**Time lost:** ~3-4 hours debugging MCP configuration issues

**Resolution:**
- Moved all MCP servers to user-level (`~/.claude.json`) with proper Windows wrappers
- Documented the requirement for `cmd /c` wrapper pattern
- Removed duplicate project-level configs

### 2. **File Sprawl**
**Problem:** Iterative design process created 15+ PNG screenshot files with unclear naming

**Issues:**
- Timestamped filenames (`2025-10-29T08-17-44-446Z.png`) not human-readable
- No clear "this is the final version" indication
- Multiple files with similar names (`competition-entry-final`, `final-competition-entry`, `competition-final-entry`)

**Resolution:** Cleanup pass to remove intermediate artifacts, keep only shipped version

### 3. **Unclear Design Authority**
**Problem:** `final-review.png` referenced as "source of truth" but was actually an intermediate artifact

**Confusion:** Design evolved through iterations, but documentation didn't track which file was authoritative

**Resolution:** Updated docs to reflect `COMPETITION-ENTRY-FINAL.png` as shipped product

---

## Key Lessons Learned

### Technical

#### 1. **MCP Server Best Practices**
```json
// ✅ CORRECT: Windows MCP server configuration
{
  "mcpServers": {
    "server-name": {
      "type": "stdio",
      "command": "cmd",                    // Windows wrapper required
      "args": ["/c", "npx", "package"],    // Note /c flag
      "env": {
        "KEY": "C:\\\\Escaped\\\\Path"    // Double-escape backslashes
      }
    }
  }
}
```

**Learnings:**
- Use user-level config (`~/.claude.json`) for servers needed across all projects
- Use project-level (`.mcp.json`) only for project-specific servers
- Never define same server in multiple config files
- Always validate JSON syntax after editing
- Windows paths require double-escaped backslashes in JSON

#### 2. **Playwright for Design Iteration**
**Pattern that worked:**
```javascript
const browser = await chromium.launch({
  headless: false,  // Visual inspection
  slowMo: 50        // Observable interactions
});
// ... navigate to file:/// URL
await new Promise(() => {}); // Infinite wait for manual review
```

**Why it works:**
- Designer controls when to close (not automated timeout)
- slowMo makes interactions debuggable
- File protocol = no server setup overhead

#### 3. **Documentation as Code Context**
`CLAUDE.md` is not just docs - it's **AI context persistence**

**Critical inclusions:**
- Absolute paths to avoid ambiguity
- Line numbers for specific issues (`flyer-final-optimized.html:140`)
- Design constraints with rationale (why object-fit: contain, not cover)
- Commands with exact syntax (not just descriptions)

### Process

#### 1. **Name Final Deliverables Clearly**
- ❌ `final-review.png`, `competition-entry-final-2025-10-29T08-17-44-446Z.png`
- ✅ `COMPETITION-ENTRY-FINAL.png` (all caps = shipped product)

**Rule:** Shipped products get clear, permanent names. Iterations get timestamped/descriptive names.

#### 2. **Clean Up Early, Clean Up Often**
**Problem:** 12+ intermediate PNG files accumulated before cleanup

**Better approach:**
- Delete intermediate artifacts immediately after iteration
- Keep only: current working version + shipped final
- Archive (don't delete) if needed for audit trail

#### 3. **Document Design Decisions in Context**
**What worked:** Documenting map scaling fix with:
- Problem description
- Solution (object-fit: contain)
- File location (line number)
- Rationale (must show full route)

**Impact:** Future Claude sessions immediately understood constraint without re-explanation

### Workflow

#### 1. **Iterative Design Loop**
```
1. Edit HTML
2. Run Playwright preview (view-final.js)
3. Visual inspection in browser
4. Document changes in design-review-notes.md
5. Commit iteration
6. Repeat
```

**Worked well** - tight feedback loop, clear audit trail

**Improvement needed:** Step 4 (documentation) often skipped during rapid iteration

#### 2. **Configuration Before Coding**
**Lesson:** Spend time upfront getting MCP servers, Playwright, dependencies correct

**Cost of skipping:** Hours of mid-project debugging when tools don't work

**Future approach:**
- Validate MCP config immediately after setup
- Run `/mcp` and check all expected servers show up
- Test basic tool functionality before starting work

---

## Project Statistics

### Files Created
- **Delivered:** 1 HTML file, 1 PNG, 1 PDF
- **Documentation:** 6 markdown files
- **Scripts:** 11 Playwright test scripts
- **Config:** 3 config files (.npmrc, playwright.config.js, package.json)

### Time Spent (Estimated)
- **Design & Development:** ~4 hours
- **MCP Configuration:** ~3-4 hours (unexpectedly high)
- **Testing & Iteration:** ~2 hours
- **Documentation:** ~1 hour
- **Total:** ~10-11 hours

**Key insight:** MCP setup took 30-40% of project time - not acceptable for simple projects

---

## Files Audit

### Keep (Core Deliverables)
```
✅ flyer-final-optimized.html       # Source HTML
✅ flyer-final.pdf                  # PDF export
✅ COMPETITION-ENTRY-FINAL.png      # Shipped product
✅ CLAUDE.md                        # AI context
✅ POST-MORTEM.md                   # This document
```

### Keep (Essential Assets)
```
✅ img/map.png                      # Source map image
✅ img/SCA_Tennis_Flyer.png         # Source flyer content
✅ img/court.png.png                # Source court image
```

### Keep (Infrastructure)
```
✅ package.json, package-lock.json  # Dependencies
✅ .npmrc                           # Dependency config
✅ playwright.config.js             # Playwright config
✅ .gitignore                       # Git config
✅ tools/pw-run.sh, pw-run.cmd      # Playwright wrappers
```

### Archive (May be useful for reference)
```
📦 docs/design-review-notes.md      # Design iteration notes
📦 scripts/view-final.js            # Main preview script
📦 scripts/test-optimized-map.js    # Map validation
📦 product_notes/*.md               # Development notes
```

### Delete (Intermediate artifacts)
```
❌ competition-entry-final-2025-10-29T08-17-44-446Z.png   # Duplicate
❌ FINAL-COMPETITION-ENTRY-2025-10-29T08-19-44-999Z.png   # Duplicate
❌ final-competition-entry-2025-10-29T08-12-11-843Z.png   # Duplicate
❌ competition-final-entry.png                             # Duplicate
❌ scripts/test-*.js (except test-optimized-map.js)        # Iteration tests
❌ scripts/iterate-whatsapp.js                             # One-off script
❌ scripts/check-pdf.js                                    # One-off script
❌ scripts/verify-exports.js                               # One-off script
❌ capture-complete.js                                     # Root-level orphan
❌ SETUP-SUMMARY.md                                        # Superseded by POST-MORTEM.md
❌ COMPETITION-ENTRY-SUMMARY.md                            # Superseded by POST-MORTEM.md
❌ JUDGING-CHECKLIST.md                                    # One-off document
❌ MCP-AUDIT-REPORT.md                                     # Now in POST-MORTEM.md
❌ .mcp_playwright_pkg.txt                                 # Unknown artifact
❌ .claude/settings.local.json                             # Empty/unused
❌ tests/smoke/example.spec.js                             # Unused test
```

---

## Recommendations for Future Projects

### 1. **Start with Clearer Scope**
**This project:** "Make a flyer" → evolved into "establish workflow for design iteration"

**Better:** Define workflow establishment as explicit goal from start

**Impact:** Set proper time expectations, document learnings systematically

### 2. **MCP Configuration Template**
**Action:** Create `~/.claude/mcp-template.json` with commented examples

**Include:**
- Windows cmd /c wrapper pattern
- Path escaping examples
- User vs project scope guidance
- Environment variable patterns

**Benefit:** Avoid re-learning MCP config on every project

### 3. **Automated Cleanup Workflow**
**Proposal:** Add npm script for cleanup:
```json
{
  "scripts": {
    "clean": "node scripts/cleanup-iterations.js"
  }
}
```

**Script:** Deletes files matching `*-2025-*T*.png` pattern (timestamped screenshots)

### 4. **Standardize Naming Convention**
```
FINAL-PRODUCT-NAME.ext           # Shipped deliverable (ALL CAPS)
product-name-iteration-v1.ext    # Iteration with version
product-name-2025-11-05.ext      # Iteration with date
temp-product-name.ext            # Temporary/working file
```

### 5. **Backend Integration Planning**
**Consideration:** If adding backend later:
- Keep HTML as template/reference
- Move inline styles to external CSS
- Identify dynamic content sections
- Plan data model for flyer content

**Question for future:** CMS for flyer generation? API for personalized flyers?

---

## Success Metrics

### Delivered
- ✅ Functional, WhatsApp-optimized promotional flyer
- ✅ Complete source code and assets
- ✅ Documented workflow and lessons learned
- ✅ Reusable Playwright testing patterns

### Learning Objectives
- ✅ Playwright visual testing workflow established
- ✅ Claude Code project structure patterns learned
- ⚠️ MCP configuration learned (painful but complete)
- ✅ Dependency management best practices established

### Future Reusability
- ✅ Playwright scripts reusable for other design projects
- ✅ `.npmrc` pattern reusable for version pinning
- ✅ `CLAUDE.md` pattern reusable for AI context
- ✅ MCP configuration now understood for future projects

---

## Conclusion

**Project success:** ✅ Delivered quality product on time

**Process success:** ⚠️ Mixed - workflow established but at higher cost than expected due to tooling configuration

**Key achievement:** Established reusable patterns for AI-assisted frontend design with Playwright visual testing

**Main learning:** MCP configuration requires systematic documentation and templates to avoid repeated time sink

**Next project:** Apply these lessons to reduce setup time from 30-40% to <10% of project duration

---

## Action Items for Workspace

- [ ] Create `~/ClaudeProjects/.mcp-config-template.json` with documented examples
- [ ] Add MCP setup guide to workspace `CLAUDE.md`
- [ ] Create file naming conventions guide for workspace
- [ ] Consider automation for cleanup of intermediate files
- [ ] Archive this project as reference for future design projects

---

**Document created:** 2025-11-06
**Project duration:** October 28 - November 6, 2025 (~10-11 hours)
**Final status:** ✅ Shipped and documented
