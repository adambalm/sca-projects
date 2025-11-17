# SCA Projects - Workspace CLAUDE.md

**Workspace Type:** Monorepo
**Owner:** Ed O'Connell (Director of Digital Strategy and AI Enablement, SCA)
**Purpose:** Unified development environment for SCA-related projects and professional work
**Status:** Active development workspace

---

## 🎯 Workspace Overview

This is a **monorepo** containing multiple independent but related projects. All projects share:
- Playwright 1.56.1 for browser automation
- MCP servers (Playwright, Context7, Basic Memory, GitHub)
- Common workflow patterns and conventions
- Git version control with conventional commits

**Key Principle:** Each project has its own CLAUDE.md with scope headers to prevent context confusion.

---

## 📁 Current Projects

### TennisFlyer/
**Status:** ✅ SHIPPED (November 2025)
**Purpose:** WhatsApp-optimized promotional flyer for SCA Tennis Academy
**Deliverable:** `COMPETITION-ENTRY-FINAL.png`

**Key Achievement:** Established Playwright visual testing workflow for frontend design iteration

**Reference For:**
- Playwright browser automation patterns
- Iterative design workflow with visual testing
- File naming conventions (ALL_CAPS for shipped products)
- Comprehensive post-mortem documentation

**Documentation:** `TennisFlyer/CLAUDE.md`, `TennisFlyer/POST-MORTEM.md`

### ResumeFactory/
**Status:** 🔄 ACTIVE
**Purpose:** Tailored job application materials for Ed O'Connell
**Current:** Yale University application submitted (November 2025)

**Workflow:** Repeatable process for generating resumes, cover letters, and tracking applications

**Pattern:** Job analysis → Tailored materials → Visual preview → Submit → Track in Basic Memory

**Documentation:** `ResumeFactory/CLAUDE.md`

### SCAWebsite/ (Future)
**Status:** 📋 PLANNED
**Purpose:** Main institutional website for Springfield Commonwealth Academy
**Tech Stack:** TBD (React/Next.js/WordPress)

**Will Use:**
- Playwright for E2E testing and visual regression
- Context7 for framework documentation
- Basic Memory for architecture decisions
- Patterns from TennisFlyer (visual testing workflow)

**Create:** `SCAWebsite/CLAUDE.md` when project begins

### EnrollmentAutomations/ (Future)
**Status:** 📋 PLANNED
**Purpose:** Workflow automation for SCA enrollment processes
**Focus:** Browser automation, data processing, notification workflows

**Will Use:**
- Playwright for browser automation
- Basic Memory for process documentation
- Integration with SCAWebsite for data flow
- Automation patterns and error handling

**Create:** `EnrollmentAutomations/CLAUDE.md` when project begins

---

## 🛠️ Shared Infrastructure

### Development Tools
- **Playwright:** 1.56.1 (pinned, exact versioning via .npmrc)
- **Node.js:** Package management at workspace root
- **Browser Binaries:** C:/Users/Guest1/AppData/Local/ms-playwright (centralized cache)

### MCP Servers (User-Level)
Configured in `~/.claude.json` for cross-project availability:

**Playwright MCP** (`@playwright/mcp`)
- Browser automation and testing
- Accessibility snapshots
- Screenshot and network monitoring

**Context7 MCP** (`@upstash/context7-mcp`)
- Up-to-date library documentation
- Code examples and API reference
- Multi-language support

**Basic Memory MCP** (`@basicmachines-co/basic-memory`)
- Persistent knowledge across sessions
- Searchable notes and observations
- Project-specific memory spaces
- Memory directory: C:/Users/Guest1/.claude-memory

**GitHub MCP** (Built-in)
- Git operations and workflow
- File operations (Read, Write, Edit, Glob, Grep)
- Shell commands and background processes

### Configuration Files
```
workspace root/
├── package.json          # Shared Playwright dependency
├── package-lock.json     # Locked versions (commit this!)
├── .npmrc                # save-exact=true (prevent version drift)
├── playwright.config.js  # Shared Playwright config
└── .gitignore           # Workspace-wide ignores
```

---

## 📋 Monorepo Decision

**Why Monorepo?** See `ORGANIZATION-ANALYSIS.md` for comprehensive analysis.

**Key Reasons:**
- ✅ Single developer (no team conflicts)
- ✅ 4 related SCA projects (small scale, not 400 projects)
- ✅ Shared tools (install Playwright once, not 4 times)
- ✅ Pattern reuse (TennisFlyer workflow applies to future projects)
- ✅ Disk space efficiency (500MB vs 2GB for multi-repo)
- ✅ Unified git history (see evolution of all SCA work)

**Score:** Monorepo 97/100, Multi-Repo 60/100

---

## 🧠 Context Management Strategy

**Problem:** How does Claude avoid confusing projects in a monorepo?

**Solution:** Multiple layers of protection:

### 1. **Project-Specific CLAUDE.md Files**
Each project has its own CLAUDE.md with scope header:
```markdown
---
🚨 **CONTEXT: ProjectName Project**
DO NOT confuse with: [other projects]
---
```

### 2. **Basic Memory Project Separation**
Create project-specific memory spaces:
```bash
# Future: Create memory projects
basic-memory create-project sca-website
basic-memory create-project enrollment-automations
```

### 3. **Explicit Communication**
User specifies which project:
```
"I'm working on SCA Website enrollment form"
"Switch to TennisFlyer for reference"
"Working on ResumeFactory - new application"
```

### 4. **Directory-Based Focus**
```bash
cd SCAWebsite
claude
# Claude prioritizes SCAWebsite context
```

### 5. **Claude's Intelligence**
Claude understands semantic context and won't randomly mix projects

**Result:** Context confusion is **extremely unlikely** with these protections.

---

## 🎨 Workflow Patterns

### Playwright Visual Testing (Established in TennisFlyer)

```javascript
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: false,    // Visual debugging
    slowMo: 50          // Observable interactions
  });

  const page = await browser.newPage();
  await page.setViewportSize({ width: 1200, height: 900 });

  const htmlFile = 'C:/Users/Guest1/ClaudeProjects/SCA Projects/[project]/file.html';
  await page.goto(`file:///${htmlFile}`, { waitUntil: 'networkidle' });

  // Test/preview logic here

  await new Promise(() => {}); // Keep open for manual review
})();
```

**Benefits:**
- Designer controls review duration
- slowMo makes interactions debuggable
- file:// protocol = no server setup
- Immediate visual feedback

### Design Iteration Loop

```
1. Edit source file (HTML, component, etc.)
2. Run Playwright preview script
3. Visual inspection in browser
4. Document changes in project notes
5. Commit iteration
6. Repeat until shipped
7. Clean up intermediate artifacts
8. Write lessons learned (if significant)
```

### File Naming Conventions

```
FINAL-PRODUCT-NAME.ext           # Shipped deliverable (ALL CAPS)
product-name-iteration-v1.ext    # Iteration with version
product-name-2025-11-13.ext      # Iteration with date
temp-product-name.ext            # Temporary/working file
```

---

## 🔄 Git Workflow

### Branch Strategy
```
main (currently 'master') - stable, shipped code
feature/description - new features
fix/description - bug fixes
docs/description - documentation updates
```

### Commit Message Convention
```
type(scope): description

feat(website): add contact form component
fix(enrollment): handle missing date fields
docs(tennis): update post-mortem lessons
chore(deps): update Playwright to 1.57.0
```

**Scopes:** `website`, `enrollment`, `tennis`, `resume`, `workspace`, `deps`, `docs`

**Types:** `feat`, `fix`, `docs`, `chore`, `refactor`, `test`, `style`

### Commit Template
```
type(scope): short description

Longer explanation if needed:
- Bullet points for details
- Context about why this change
- Any breaking changes or important notes

🤖 Generated with Claude Code (https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

---

## 👤 Ed O'Connell Context

### Current Role
**Director of Digital Strategy and AI Enablement**
Springfield Commonwealth Academy (Sep 2025 - Present)

### Professional Background
- 20+ years in higher education technology
- University of Massachusetts (12+ years, Senior Application Specialist)
- Western New England University (10+ years, Senior Web Content Specialist)
- Springfield Commonwealth Academy (current, 3+ months)

### Core Expertise
- AI Governance & Integration (Gemini for Workspace, NotebookLM, LLM prompt engineering)
- Content Lifecycle Management (SharePoint, Drupal, WordPress, Ghost CMS)
- Stakeholder Management & Training (bridge between technical and business)
- Process Automation & Optimization (reducing week-long workflows to single days)
- Educational Technology & Faculty Enablement

### Languages
- English (native)
- Spanish (professional working proficiency)

### Key Differentiators
- Current AI enablement role (not theoretical - actively implementing)
- 20 years exclusively in higher education
- Unique combination: traditional CMS + modern AI capabilities
- Proven training success (NotebookLM faculty adoption)
- Measurable automation wins

**Full Profile:** `ResumeFactory/linkedin-profile-ed-oconnell.md`

---

## 📚 Documentation Structure

### Workspace Level (Root)
- `CLAUDE.md` - This file (high-level overview)
- `MCP-SERVER-TESTS.md` - MCP server capabilities and test results
- `ORGANIZATION-ANALYSIS.md` - Monorepo decision analysis
- `product_notes/` - Historical documentation and migration notes

### Project Level
- `ProjectName/CLAUDE.md` - Project-specific context (with scope header)
- `ProjectName/README.md` - User-facing project documentation
- `ProjectName/POST-MORTEM.md` - Lessons learned (if completed)

### Best Practices
- **Workspace CLAUDE.md:** High-level, cross-project information
- **Project CLAUDE.md:** Detailed, project-specific context
- **Always include scope headers** to prevent context confusion
- **Update when structure changes** to keep Claude informed
- **Document lessons learned** for future reference

---

## 🚀 Adding New Projects

### Step-by-Step Process

#### 1. Create Project Directory
```bash
mkdir ProjectName
cd ProjectName
```

#### 2. Create Project CLAUDE.md
```markdown
# CLAUDE.md - ProjectName

---
🚨 **CONTEXT: ProjectName Project**
DO NOT confuse with: [list other projects]
---

## Project Overview
[Project description]

## Related Projects
- See ../TennisFlyer/ for [specific patterns]
- See ../ResumeFactory/ for [specific workflows]
```

#### 3. Create Basic Memory Project (Optional)
```
Via Claude: "Create a Basic Memory project for [ProjectName]"
```

#### 4. Start Development
```
Tell Claude: "I'm working on [ProjectName]"
Claude reads workspace overview, then project-specific context
```

#### 5. Leverage Shared Tools
- Playwright already installed ✅
- MCP servers already configured ✅
- Reference other project patterns ✅

---

## 🎯 Future Project Setup

### When Creating SCAWebsite/

```bash
mkdir SCAWebsite
cd SCAWebsite

# Create CLAUDE.md with scope header
# Choose tech stack (React? Next.js? WordPress?)
# Reference TennisFlyer for Playwright E2E testing patterns
# Create Basic Memory project: "sca-website"
# Document architecture decisions
```

### When Creating EnrollmentAutomations/

```bash
mkdir EnrollmentAutomations
cd EnrollmentAutomations

# Create CLAUDE.md with scope header
# Document integration points with SCAWebsite
# Reference TennisFlyer for browser automation patterns
# Create Basic Memory project: "enrollment-automations"
# Document workflow processes and error handling
```

---

## 🧪 Testing & Verification

### MCP Server Status
All MCP servers tested and verified ✅
See `MCP-SERVER-TESTS.md` for detailed results.

### Quick Health Check
```bash
# Verify Playwright installation
npx playwright --version  # Should show 1.56.1

# Check git status
git status

# List MCP servers (via Claude Code)
# Type: /mcp or use MCP status command
```

---

## 📖 Key Resources

### Documentation
- **Claude Code Docs:** https://docs.claude.com/claude-code
- **Playwright Docs:** https://playwright.dev
- **MCP Servers:** https://github.com/modelcontextprotocol

### Project-Specific
- TennisFlyer complete guide: `TennisFlyer/CLAUDE.md`
- TennisFlyer lessons: `TennisFlyer/POST-MORTEM.md`
- ResumeFactory workflow: `ResumeFactory/CLAUDE.md`
- Workflow evolution: `product_notes/`

### Ed's Links
- **LinkedIn:** https://www.linkedin.com/in/ed-o-connell-4b38483/
- **Institution:** Springfield Commonwealth Academy

---

## 🎓 Lessons Learned

### From TennisFlyer (Full details: POST-MORTEM.md)
- ✅ Playwright visual testing = fast iteration
- ✅ file:// protocol = no server needed
- ✅ Project-specific CLAUDE.md = context persistence
- ✅ Exact dependency versioning = reproducible builds
- ⚠️ MCP config took 30-40% of project time initially
- ⚠️ File sprawl from iterations (clean up early!)

### From Monorepo Setup
- ✅ Shared tools save significant time and space
- ✅ Context management is solvable with good documentation
- ✅ Git history across projects provides valuable insights
- ✅ Pattern reuse accelerates development
- ✅ Basic Memory provides continuity across sessions

---

## 🔍 Quick Reference

### Starting Work on Existing Project
```bash
cd "C:/Users/Guest1/ClaudeProjects/SCA Projects/ProjectName"
claude
"I'm working on [ProjectName] - [specific task]"
```

### Referencing Other Projects
```
"Can we use similar patterns to TennisFlyer for this?"
"Check ResumeFactory workflow for this use case"
```

### Searching Basic Memory
```
"Show me past job applications"
"Retrieve Yale application details"
"What did we learn from TennisFlyer?"
```

### Common Commands
```bash
# Preview with Playwright (pattern from TennisFlyer)
node scripts/preview.js

# Check MCP servers
# Via Claude: /mcp

# Git status
git status

# Commit changes
git add -A && git commit -m "type(scope): description"
```

---

## ⚙️ Workspace Configuration

### .npmrc
```
save-exact=true
```
Ensures exact version pinning (no ^ or ~ ranges)

### .gitignore
```
/node_modules/
/test-results/
UsersGuest1AppDataLocalms-playwright/
.claude/settings.local.json
/.mcp.json
```

### Playwright Config
```javascript
// playwright.config.js
testDir: './tests',
reporter: 'list',
projects: [{ name: 'chromium' }]
```

---

## 🎬 Getting Started (For New Claude Sessions)

When Claude starts in this workspace:

1. **Read this file** to understand workspace structure
2. **Ask user** which project they're working on (or infer from conversation)
3. **Read project-specific CLAUDE.md** for detailed context
4. **Query Basic Memory** if needed for historical context
5. **Focus on that project** - ignore others unless explicitly referenced

### Example Session Start
```
User: "Let's work on adding a contact form to the website"

Claude:
  1. Reads SCA Projects/CLAUDE.md (workspace overview)
  2. Infers: "website" = SCAWebsite project
  3. Reads SCAWebsite/CLAUDE.md (project context)
  4. Queries Basic Memory for "sca-website" + "contact form"
  5. Focuses on SCAWebsite, ignores TennisFlyer/ResumeFactory
  6. References TennisFlyer patterns only if relevant
```

---

## 📞 Asking for Help

If you encounter issues:

1. **Check documentation first**
   - Project CLAUDE.md for project-specific issues
   - Workspace CLAUDE.md (this file) for cross-project issues
   - MCP-SERVER-TESTS.md for MCP server issues

2. **Search Basic Memory**
   - Past solutions to similar problems
   - Lessons learned from previous projects

3. **Reference other projects**
   - TennisFlyer for design/testing patterns
   - ResumeFactory for workflow patterns

4. **Ask Ed** for clarification on priorities or context

---

## 🎯 Success Metrics

### Workspace Goals
- ✅ Efficient tool sharing across projects
- ✅ Clear context management (no project confusion)
- ✅ Pattern reuse accelerates development
- ✅ Comprehensive documentation for continuity
- ✅ Git history provides valuable audit trail

### Project Health Indicators
- CLAUDE.md exists with scope header
- Basic Memory notes for significant decisions
- Git commits follow conventional format
- Documentation stays current
- Lessons learned captured (for completed projects)

---

## 📋 Action Items for New Projects

### Before Starting SCAWebsite or EnrollmentAutomations:

- [ ] Create project directory
- [ ] Create CLAUDE.md with scope header
- [ ] Decide on tech stack
- [ ] Create Basic Memory project
- [ ] Reference TennisFlyer/ResumeFactory patterns
- [ ] Document architecture decisions
- [ ] Set up project-specific dependencies (if any)
- [ ] Create initial commit: `feat(project): initialize [ProjectName]`

---

**Last Updated:** November 13, 2025
**Git Commits:** 2 (Initial commit + project documentation)
**Active Projects:** 2 (TennisFlyer shipped, ResumeFactory active)
**Planned Projects:** 2 (SCAWebsite, EnrollmentAutomations)

**Ready for:** Adding SCA Website and Enrollment Automations projects

---

*This workspace uses Claude Code for AI-assisted development.*
*All projects co-authored with Claude (Sonnet 4.5) via Claude Code CLI.*
