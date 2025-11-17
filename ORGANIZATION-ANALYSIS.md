# Monorepo vs Multi-Repo Analysis for SCA Projects

**Date:** November 13, 2025
**Context:** Deciding organizational structure before adding SCA Website and Enrollment Automations projects
**Current State:** "SCA Projects" workspace with TennisFlyer (shipped) and ResumeFactory (active)

---

## Executive Summary

**Recommendation:** 🟢 **USE MONOREPO for your use case**

Your situation is **different from typical software development**. You're using Claude Code as an AI-assisted development environment for a **portfolio of related SCA projects**. The monorepo approach provides significant advantages for context management and tool availability.

**However:** Use a **hybrid approach** - monorepo structure with project-specific context isolation techniques.

---

## Your Specific Situation

### What You Have
```
C:/Users/Guest1/ClaudeProjects/SCA Projects/
├── TennisFlyer/          # Shipped promotional flyer
├── ResumeFactory/        # Active job applications
├── (future) SCAWebsite/  # Main school website
└── (future) EnrollmentAutomations/  # Workflow automation
```

### What Makes This Different
1. **Single Developer:** You (Ed O'Connell) are the only developer
2. **Related Projects:** All SCA-focused work
3. **Shared Infrastructure:** Playwright, MCP servers, workflow patterns
4. **AI-Assisted Development:** Claude Code as primary development tool
5. **Cross-Project Learning:** Patterns from one project inform others

**This is NOT:**
- A large team with multiple developers
- Unrelated projects needing strict isolation
- A company with separate product lines
- Projects with different tech stacks

---

## Monorepo Approach: Detailed Analysis

### ✅ Advantages for Your Use Case

#### 1. **Tool Availability (HUGE WIN)**
**Current Setup:**
- Playwright 1.56.1 installed at workspace root
- All MCP servers available everywhere (user-level config)
- Shared node_modules, config files

**Benefit:**
```
✅ TennisFlyer uses Playwright → ResumeFactory gets it for free
✅ SCAWebsite needs Playwright → Already installed
✅ EnrollmentAutomations needs browser automation → Ready to go
```

**Alternative (Multi-Repo):**
```
❌ Install Playwright 4 separate times
❌ Maintain 4 separate package.json files
❌ Keep 4 copies in sync manually
❌ 4x the disk space for node_modules
```

**Cost Savings:**
- **Disk Space:** ~500MB per project × 4 = 2GB vs. 500MB (75% savings)
- **Setup Time:** Install once vs. 4 times
- **Maintenance:** Update once vs. 4 times

#### 2. **Context Management (Misunderstood Benefit)**

**Common Misconception:** "Monorepo means context overload"

**Reality for Your Case:** Claude Code with Basic Memory MCP changes the game

**How Context Actually Works:**

```markdown
## Without Basic Memory (Old Way)
Problem: Folder rename breaks --continue
Solution: Monorepo keeps consistent path

## With Basic Memory (Your Setup)
Advantage: Project-specific memory notes provide context
Strategy: Create focused CLAUDE.md per project
Result: Best of both worlds - shared tools + isolated context
```

**Example Context Management:**
```
SCA Projects/
├── CLAUDE.md                     # Workspace overview (this file, high-level)
├── TennisFlyer/
│   ├── CLAUDE.md                 # TennisFlyer-specific context
│   └── (TennisFlyer files)
├── ResumeFactory/
│   ├── CLAUDE.md                 # ResumeFactory-specific context
│   └── (Resume files)
└── SCAWebsite/
    ├── CLAUDE.md                 # Website-specific context
    └── (Website files)
```

**When Claude starts:**
1. Reads workspace CLAUDE.md (high-level)
2. Asks "Which project?" or you say "Working on SCAWebsite"
3. Reads SCAWebsite/CLAUDE.md (project-specific)
4. Optionally queries Basic Memory for SCAWebsite notes
5. **Ignores other projects unless explicitly needed**

#### 3. **Pattern Reusability (Learning Benefit)**

**Your Workflow Patterns:**
```
TennisFlyer established:
  → Playwright visual testing
  → File:// protocol for local HTML
  → Infinite wait pattern for manual review
  → Exact versioning with .npmrc
  → Clean deliverable naming (ALL_CAPS)

ResumeFactory can reuse:
  → Same Playwright scripts pattern
  → Same naming conventions
  → Same testing workflow

SCAWebsite will reuse:
  → Visual regression testing
  → Component preview patterns
  → Design iteration workflow

EnrollmentAutomations will reuse:
  → Browser automation patterns
  → Workflow testing
  → Error handling approaches
```

**In monorepo:** Copy/reference scripts easily
**In multi-repo:** Manual copying or complex git submodules

#### 4. **Cross-Project References (Documentation Benefit)**

**Example:** SCAWebsite might reference TennisFlyer's design patterns

**In Monorepo:**
```markdown
# SCAWebsite/CLAUDE.md
## Design Patterns
See ../TennisFlyer/POST-MORTEM.md for:
- Playwright testing workflow
- File naming conventions
- Design iteration process
```

**In Multi-Repo:**
```markdown
# SCAWebsite/CLAUDE.md
## Design Patterns
See https://github.com/eoc/TennisFlyer (if public)
Or: "Refer to TennisFlyer project on your machine" (vague)
```

#### 5. **Git History (Audit Trail)**

**Monorepo Git Log:**
```
commit a1b2c3  Fix: TennisFlyer map scaling
commit d4e5f6  Add: ResumeFactory Yale resume
commit g7h8i9  Update: Shared Playwright config
commit j0k1l2  Feature: SCAWebsite homepage
```

**Benefits:**
- See all SCA work chronologically
- Understand evolution across projects
- Track when shared infrastructure changes
- Easy rollback across related changes

**Multi-Repo:**
- 4 separate histories
- No cross-project timeline
- Harder to see big picture

#### 6. **Dependency Management (Maintenance Benefit)**

**Scenario:** Playwright 1.57.0 releases with breaking changes

**Monorepo:**
```bash
# Update once
cd "SCA Projects"
npm install playwright@1.57.0
# Test all projects
npm test
# Fix any issues across all projects
# Commit once
```

**Multi-Repo:**
```bash
# Update 4 times
cd TennisFlyer && npm install playwright@1.57.0 && npm test
cd ResumeFactory && npm install playwright@1.57.0 && npm test
cd SCAWebsite && npm install playwright@1.57.0 && npm test
cd EnrollmentAutomations && npm install playwright@1.57.0 && npm test
# Fix same issues 4 times (or forget some)
# Commit 4 times
# Eventually projects drift out of sync
```

---

### ⚠️ Potential Disadvantages (And How to Mitigate)

#### 1. **Context Overload**
**Concern:** Claude might confuse projects

**Mitigation Strategies:**

**A. Project-Specific CLAUDE.md Files**
```markdown
# Project CLAUDE.md Template
---
IMPORTANT: This is the [ProjectName] project.
Do NOT confuse with:
- TennisFlyer (shipped promotional flyer)
- ResumeFactory (job applications)
- [other projects]
---
```

**B. Explicit Project Scoping in Commands**
```bash
# When starting work
"I'm working on SCAWebsite today"
"Focus on EnrollmentAutomations project"
"Switch context to ResumeFactory"
```

**C. Basic Memory Project Separation**
```bash
# Create memory projects
basic-memory create project sca-website
basic-memory create project enrollment-automations

# Query project-specific memory
# Claude reads only relevant notes
```

**D. Directory-Based Context (Claude Code already does this)**
```bash
# When you cd into a project, Claude prioritizes that context
cd SCAWebsite
claude
# Claude focuses on SCAWebsite, not other projects
```

**Reality Check:** With 4 projects, this is **minimal risk**. Monorepos with 50+ projects have issues. Your 4 related projects are fine.

#### 2. **Build/Test Complexity**
**Concern:** Running tests might affect all projects

**Mitigation:**
```json
// package.json
{
  "scripts": {
    "test": "npm run test:tennis && npm run test:resume && npm run test:website",
    "test:tennis": "cd TennisFlyer && node scripts/view-final.js",
    "test:resume": "cd ResumeFactory && node scripts/preview.js",
    "test:website": "cd SCAWebsite && npm run test:integration"
  }
}
```

**Or simply:** Test projects individually
```bash
cd SCAWebsite
npm run test
```

**Reality Check:** Your projects are mostly independent. Not a real issue.

#### 3. **Git Noise**
**Concern:** Commits to one project clutter history for others

**Mitigation:**
```bash
# Use conventional commits with scope
git commit -m "feat(website): add homepage component"
git commit -m "fix(enrollment): correct date parsing"
git commit -m "docs(tennis): update post-mortem"

# Git log filtering
git log --all -- SCAWebsite/  # Only website changes
git log --grep="website"      # Only website commits
```

**Reality Check:** With clear commit messages, this is actually **beneficial** (see #5 above).

#### 4. **Deployment Complexity**
**Concern:** Deploying one project might affect others

**Your Case:** **Not Applicable**
- TennisFlyer: Static PNG (already delivered)
- ResumeFactory: Local HTML files (no deployment)
- SCAWebsite: Separate deployment (likely Netlify, Vercel, or WordPress)
- EnrollmentAutomations: Local scripts (no deployment)

**None of these share deployment pipelines, so no issue.**

---

## Alternative Structures Considered

### Option A: Pure Monorepo (Current Trajectory)
```
SCA Projects/
├── .git
├── package.json (shared)
├── node_modules/
├── TennisFlyer/
├── ResumeFactory/
├── SCAWebsite/
└── EnrollmentAutomations/
```

**Pros:** Maximum tool sharing, single git history
**Cons:** Potential context confusion (mitigated above)
**Best for:** Your current use case

### Option B: Multi-Repo
```
~/ClaudeProjects/
├── TennisFlyer/
│   ├── .git
│   └── node_modules/
├── ResumeFactory/
│   ├── .git
│   └── node_modules/
├── SCAWebsite/
│   ├── .git
│   └── node_modules/
└── EnrollmentAutomations/
    ├── .git
    └── node_modules/
```

**Pros:** Complete isolation, no confusion
**Cons:** 4x duplication, no shared learning, harder cross-reference
**Best for:** Large teams, unrelated projects

### Option C: Monorepo with Workspaces (npm/yarn)
```
SCA Projects/
├── .git
├── package.json (root)
├── packages/
│   ├── tennis-flyer/
│   │   └── package.json
│   ├── resume-factory/
│   │   └── package.json
│   ├── sca-website/
│   │   └── package.json
│   └── enrollment-automations/
│       └── package.json
└── node_modules/ (hoisted, shared)
```

**Pros:** Official tool support, dependency hoisting
**Cons:** Overkill for your 4 projects, adds complexity
**Best for:** 10+ projects with shared libraries

### Option D: Git Submodules (Hybrid)
```
SCA Projects/
├── .git
├── TennisFlyer/     → submodule to TennisFlyer repo
├── ResumeFactory/   → submodule to ResumeFactory repo
├── SCAWebsite/      → submodule to SCAWebsite repo
└── EnrollmentAutomations/ → submodule
```

**Pros:** Separate repos with monorepo feel
**Cons:** Git submodule complexity (notoriously difficult)
**Best for:** Large companies, not solo developers

---

## Recommendation: Hybrid Approach

### Recommended Structure

```
C:/Users/Guest1/ClaudeProjects/SCA Projects/
├── .git                        # Single git repository
├── .gitignore
├── package.json                # Shared dependencies (Playwright, etc.)
├── package-lock.json
├── node_modules/               # Shared node_modules
├── .npmrc                      # Exact versioning
├── playwright.config.js        # Shared Playwright config
│
├── CLAUDE.md                   # 🎯 Workspace overview (YOU ARE HERE)
├── MCP-SERVER-TESTS.md         # MCP server documentation
├── ORGANIZATION-ANALYSIS.md    # This file
│
├── TennisFlyer/
│   ├── CLAUDE.md               # 🎯 Project-specific context
│   ├── README.md
│   ├── POST-MORTEM.md
│   └── (project files)
│
├── ResumeFactory/
│   ├── CLAUDE.md               # 🎯 Project-specific context
│   ├── README.md
│   └── (project files)
│
├── SCAWebsite/
│   ├── CLAUDE.md               # 🎯 Project-specific context (FUTURE)
│   ├── README.md
│   ├── src/
│   ├── tests/
│   └── (website files)
│
├── EnrollmentAutomations/
│   ├── CLAUDE.md               # 🎯 Project-specific context (FUTURE)
│   ├── README.md
│   ├── scripts/
│   └── (automation files)
│
└── shared/                     # 🎯 Optional: Shared utilities
    ├── playwright-helpers.js
    ├── naming-conventions.md
    └── templates/
```

### Key Principles

1. **Single Git Repo:** Track everything together
2. **Shared Dependencies:** package.json at root
3. **Project Isolation:** Each project has own CLAUDE.md
4. **Context Hierarchy:**
   - Workspace CLAUDE.md: High-level, cross-project info
   - Project CLAUDE.md: Project-specific, detailed context
5. **Basic Memory:** Create project-specific memory projects
6. **Optional Shared Folder:** Extract common patterns

---

## Context Management Strategy

### How Claude Code Will Handle Context

#### Level 1: Workspace Context (Always Available)
**File:** `SCA Projects/CLAUDE.md`

**Contains:**
- High-level overview of all projects
- MCP server documentation
- Shared infrastructure (Playwright, dependencies)
- Cross-project patterns and conventions
- Ed's professional context (optional)

**Claude reads this:** When starting ANY conversation in this workspace

#### Level 2: Project Context (On Demand)
**Files:** `ProjectName/CLAUDE.md`

**Contains:**
- Project-specific architecture
- File structure
- Key commands
- Design decisions
- Status (active, shipped, on-hold)

**Claude reads this:** When you say "working on [ProjectName]" or `cd ProjectName`

#### Level 3: Basic Memory Context (Semantic)
**Storage:** Basic Memory MCP with project-specific tags

**Contains:**
- Design decisions and rationale
- Lessons learned
- Bug fixes and solutions
- User feedback and iterations

**Claude queries this:** When relevant to current work

**Example:**
```bash
# Working on SCAWebsite enrollment form
# Claude automatically queries memory for:
# - Tags: sca-website, enrollment, forms
# - Related: enrollment-automations (finds relevant patterns)
# Result: Context from both projects without manual cross-reference
```

### Context Isolation Techniques

#### 1. **Explicit Scoping in Conversation**
```
❌ Bad: "Update the homepage"
   (Which project's homepage?)

✅ Good: "Update SCAWebsite homepage"
   (Clear project reference)

✅ Good: "Working on enrollment automations - need to parse CSV"
   (Sets context at start)
```

#### 2. **Project Headers in CLAUDE.md**
```markdown
# SCAWebsite/CLAUDE.md

---
🚨 CONTEXT: This is the SCA WEBSITE project
DO NOT confuse with:
- TennisFlyer (completed promotional flyer)
- ResumeFactory (job application materials)
- EnrollmentAutomations (separate automation scripts)
---
```

#### 3. **Basic Memory Project Separation**
```bash
# Create separate memory projects
basic-memory create-project sca-website
basic-memory create-project enrollment-automations

# Tag notes appropriately
write_note:
  project: sca-website
  title: "Homepage Component Design"
  tags: [website, frontend, react]

# Query is automatically scoped
# Claude knows to search sca-website project, not others
```

#### 4. **Directory-Based Focus**
```bash
# Claude Code already does this
cd SCAWebsite
claude

# When you're in SCAWebsite directory:
# - File operations default to this directory
# - Context prioritizes SCAWebsite/CLAUDE.md
# - Less likely to confuse with other projects
```

#### 5. **Conventional Commit Messages**
```bash
# Scope commits to projects
git commit -m "feat(website): add contact form"
git commit -m "fix(enrollment): handle missing dates"
git commit -m "docs(tennis): update post-mortem"

# Claude can understand project context from commit history
git log --grep="website"
```

---

## What This Means for Context Management

### The Real Question
**"Will Claude get confused between projects?"**

### The Real Answer
**"Only if you let it"** - but you have 5 layers of protection:

1. **Explicit Communication:** Tell Claude which project
2. **CLAUDE.md Files:** Project-specific context
3. **Directory Structure:** Physical separation
4. **Basic Memory:** Semantic tagging and search
5. **Claude's Intelligence:** It's designed to handle this

### Why This Works

**Claude Code's Design:**
```
Claude doesn't randomly read files from your entire workspace.
It reads:
  1. Files you tell it to read
  2. Files in your current directory context
  3. Files needed to answer your question
  4. CLAUDE.md for context (if present)
```

**Example Session:**
```
You: "I'm working on the SCA Website enrollment form"

Claude:
  1. Sees you're in C:/Users/Guest1/ClaudeProjects/SCA Projects
  2. Reads SCA Projects/CLAUDE.md (workspace overview)
  3. Infers you mean SCAWebsite/ directory
  4. Reads SCAWebsite/CLAUDE.md (project context)
  5. Focuses on enrollment-related files
  6. IGNORES TennisFlyer, ResumeFactory (unless you ask)
  7. Might query Basic Memory for "enrollment" tags
  8. Keeps context focused on SCAWebsite
```

**You won't accidentally get:**
- TennisFlyer's map scaling advice when asking about enrollment forms
- ResumeFactory's HTML layout when building website components
- Cross-project contamination

**Why?**
- Claude understands semantic context
- Directory structure provides physical boundaries
- CLAUDE.md files provide explicit boundaries
- Your explicit communication sets intention

---

## Practical Example: Adding SCA Website

### Scenario
You want to add the SCA Website project to your monorepo.

### Steps

#### 1. **Create Project Directory**
```bash
cd "C:/Users/Guest1/ClaudeProjects/SCA Projects"
mkdir SCAWebsite
cd SCAWebsite
```

#### 2. **Create Project CLAUDE.md**
```bash
# SCAWebsite/CLAUDE.md
---
🚨 CONTEXT: SCA Main Website Project
This is the primary website for Springfield Commonwealth Academy.
DO NOT confuse with TennisFlyer (promotional materials).
---

## Project Overview
Main institutional website for SCA...

## Tech Stack
- [Framework: TBD - React? Next.js? WordPress?]
- Playwright for E2E testing
- [Hosting: TBD - Netlify? Vercel?]

## Development Commands
[TBD - will add as project develops]

## MCP Servers Used
- Playwright: E2E testing, visual regression
- Context7: Framework documentation
- Basic Memory: Architecture decisions

## Related Projects
- See ../TennisFlyer/POST-MORTEM.md for Playwright patterns
- See ../EnrollmentAutomations/ for data integration patterns
```

#### 3. **Create Basic Memory Project**
```bash
claude
> "Create a Basic Memory project for SCA Website"

# Claude uses mcp__basic-memory__create_memory_project
# Result: Separate memory space for website notes
```

#### 4. **Start Development**
```bash
# In your conversation with Claude:
You: "I'm working on SCA Website now. Let's plan the homepage architecture."

Claude:
  - Reads workspace CLAUDE.md (overview)
  - Reads SCAWebsite/CLAUDE.md (project context)
  - Queries Basic Memory "sca-website" project
  - Focuses entirely on website development
  - Doesn't mention TennisFlyer unless relevant
```

#### 5. **Leverage Monorepo Benefits**
```bash
# Playwright already installed? ✅ Yes
# Need to test homepage? ✅ Use same Playwright setup
# Want to reference TennisFlyer patterns? ✅ Easy: ../TennisFlyer/
# Create new scripts? ✅ Reuse TennisFlyer patterns
```

### Result
- SCA Website has full context isolation
- Shared tools work immediately
- Cross-project learning is easy
- No confusion between projects
- Git history tracks everything
- Basic Memory keeps notes organized

---

## Comparison: Your Use Case vs Typical Monorepo

### Typical Monorepo (Google, Facebook)
```
google-monorepo/
├── gmail/           (100k+ lines)
├── maps/            (200k+ lines)
├── search/          (500k+ lines)
├── youtube/         (1M+ lines)
└── (thousands more)

Problems:
- Context overload (too many projects)
- Build complexity (interdependencies)
- Team conflicts (shared code)
- CI/CD complexity (selective deployment)
```

### Your Monorepo
```
SCA Projects/
├── TennisFlyer/         (1-2k lines, shipped)
├── ResumeFactory/       (500 lines, active)
├── SCAWebsite/          (future: 5-10k lines)
└── EnrollmentAutomations/ (future: 2-3k lines)

Advantages:
- Small scale (4 projects, not 4,000)
- Single developer (no team conflicts)
- Related domain (all SCA work)
- Independent deployment (no shared pipelines)
- Shared learning (patterns transfer)
```

**Your monorepo has NONE of the typical monorepo problems.**

---

## Decision Matrix

| Factor | Monorepo Score | Multi-Repo Score | Winner |
|--------|---------------|------------------|--------|
| **Tool Sharing** | 10/10 (Playwright installed once) | 3/10 (Install 4x) | Monorepo |
| **Disk Space** | 10/10 (500MB total) | 3/10 (2GB total) | Monorepo |
| **Setup Time** | 10/10 (Once) | 4/10 (4x setup) | Monorepo |
| **Pattern Reuse** | 10/10 (Easy copy/reference) | 5/10 (Manual copy) | Monorepo |
| **Cross-Reference** | 10/10 (Relative paths) | 4/10 (URLs or manual) | Monorepo |
| **Git History** | 9/10 (Unified timeline) | 7/10 (Separate histories) | Monorepo |
| **Context Isolation** | 8/10 (Needs technique) | 10/10 (Automatic) | Multi-Repo |
| **Deployment** | 10/10 (N/A for your case) | 10/10 (N/A) | Tie |
| **Team Collaboration** | 10/10 (Single dev) | 10/10 (Single dev) | Tie |
| **Maintenance** | 10/10 (Update once) | 4/10 (Update 4x) | Monorepo |

**Total Score:**
- **Monorepo:** 97/100
- **Multi-Repo:** 60/100

**Winner:** Monorepo by significant margin

---

## Final Recommendation

### For SCA Projects: USE MONOREPO

**Why:**
1. ✅ **Your scale is perfect for monorepo** (4 related projects, not 400)
2. ✅ **Single developer** (no team conflict issues)
3. ✅ **Shared tools** (Playwright, MCP servers)
4. ✅ **Learning transfer** (patterns evolve across projects)
5. ✅ **Context management is solvable** (CLAUDE.md + Basic Memory)
6. ✅ **Maintenance efficiency** (update dependencies once)
7. ✅ **Historical continuity** (see evolution of all SCA work)

### Implementation Checklist

#### Phase 1: Setup (Now)
- ✅ Current directory structure is good
- [ ] Initialize git repository
- [ ] Create workspace CLAUDE.md (update existing)
- [ ] Document monorepo decision

#### Phase 2: Before Adding SCA Website
- [ ] Ensure all existing CLAUDE.md files have project scope headers
- [ ] Create Basic Memory project structure plan
- [ ] Document shared patterns in shared/ folder (optional)

#### Phase 3: Adding New Projects
- [ ] Create project directory
- [ ] Create project-specific CLAUDE.md with scope header
- [ ] Create Basic Memory project
- [ ] Reference shared patterns as needed

#### Phase 4: Ongoing
- [ ] Use conventional commits with project scopes
- [ ] Update workspace CLAUDE.md when adding projects
- [ ] Extract shared patterns to shared/ as they emerge
- [ ] Review context management strategy quarterly

---

## Context Management: Deep Dive

### The Key Insight
**Claude Code + Basic Memory = Best of Both Worlds**

**Old Problem:**
- Folder rename broke `--continue`
- Context tied to file paths
- No persistent memory across sessions

**New Reality:**
- Basic Memory provides semantic context
- CLAUDE.md provides structural context
- File paths are just organization
- Context survives renames and moves

### How to Think About Context

**Think of your workspace like a library:**

```
Library Building (Workspace)
├── Reading Room A (TennisFlyer)
│   └── Books about flyer design
├── Reading Room B (ResumeFactory)
│   └── Books about resume writing
├── Reading Room C (SCAWebsite)
│   └── Books about web development
└── Main Desk (Workspace CLAUDE.md)
    └── Directory of all rooms

When you ask Claude a question:
1. You specify which reading room (project)
2. Claude enters that room (reads project CLAUDE.md)
3. Claude accesses that room's books (project files)
4. Claude can reference the directory (workspace CLAUDE.md)
5. Claude can visit other rooms IF NEEDED (cross-references)

But Claude doesn't randomly read books from all rooms at once.
```

### Context Loading is Sequential
```
User: "I'm working on SCA Website enrollment form"

Claude's process:
1. Read workspace CLAUDE.md
   → Learns: 4 projects exist, this is a monorepo, here's Ed's context
2. Identify project: "SCA Website"
   → Read SCAWebsite/CLAUDE.md
   → Learns: Tech stack, architecture, file locations
3. Query Basic Memory: project="sca-website", tags=["enrollment", "forms"]
   → Gets: Past decisions, related automations
4. Focus context: Enrollment form development
5. STOP - Don't load TennisFlyer or ResumeFactory unless asked

Result: Focused context, no overload
```

### Context Boundaries

**Automatic Boundaries:**
1. **Directory Structure** - Physical organization
2. **CLAUDE.md Scope Headers** - Explicit declarations
3. **Basic Memory Projects** - Semantic separation
4. **Claude's Inference** - AI understands your intent

**Manual Boundaries (You Control):**
1. **Explicit Communication** - "Working on X project"
2. **Current Directory** - `cd ProjectName`
3. **File References** - "Look in SCAWebsite/src/"

**Result:** Multiple layers of protection against context confusion

---

## Common Scenarios

### Scenario 1: Starting New Work Session
```
You: cd "SCA Projects/SCAWebsite"
You: claude
You: "Let's continue working on the enrollment form"

Claude:
- Reads SCA Projects/CLAUDE.md (workspace)
- Sees current dir is SCAWebsite
- Reads SCAWebsite/CLAUDE.md (project)
- Queries Basic Memory for recent "enrollment form" work
- Continues where you left off
- Doesn't mention TennisFlyer or ResumeFactory
```

### Scenario 2: Cross-Project Reference
```
You: "When building the enrollment form, can we use similar patterns to the TennisFlyer design?"

Claude:
- Understands you want cross-project reference
- Reads TennisFlyer/CLAUDE.md and POST-MORTEM.md
- Extracts relevant patterns (Playwright testing, naming conventions)
- Applies them to SCAWebsite context
- Returns to focusing on SCAWebsite

Result: You explicitly requested cross-reference, so it happened
```

### Scenario 3: Context Confusion (How to Fix)
```
You: "Update the contact form"

Claude: "Which project? I see you have:
- SCAWebsite (has contact form)
- ResumeFactory (doesn't have contact form)
Should I work on the SCAWebsite contact form?"

You: "Yes, SCAWebsite"

Claude: Now focused on SCAWebsite

Result: Claude asked for clarification, avoiding confusion
```

### Scenario 4: Adding Related Knowledge
```
You: "The enrollment automation uses a specific date format. Document this."

Claude:
- Recognizes this affects multiple projects
- Creates Basic Memory note tagged: [enrollment, automation, sca-website]
- Updates EnrollmentAutomations/CLAUDE.md
- Optionally references in SCAWebsite/CLAUDE.md
- Both projects can now access this knowledge

Result: Shared knowledge without project confusion
```

---

## When to Reconsider Monorepo

**Move to multi-repo IF:**
1. You add 10+ unrelated projects (not just SCA work)
2. You start collaborating with a team (multiple developers)
3. Projects need different deployment pipelines (your don't)
4. Projects have conflicting dependencies (yours don't)
5. You find yourself constantly confused (use techniques above first)

**For your 4 SCA projects:** Monorepo is the right choice.

**If you expand to 20 projects:** Might reconsider, but even then...
- Google has 1 monorepo with millions of files
- Your 20 projects would still be tiny in comparison

---

## Conclusion

**Your Question:** "Is using this as one big monorepo a bad idea? What does it mean for context management?"

**Answer:**

### Is it a bad idea?
**No, it's actually an EXCELLENT idea** for your specific situation:
- Single developer (you)
- Related projects (all SCA work)
- Shared infrastructure (Playwright, MCP servers)
- Small scale (4 projects, not 400)
- Learning transfer (patterns evolve together)

### What does it mean for context management?
**It means you have OPTIONS:**

**Option 1: No Management** (Might work, might confuse)
- Just use monorepo, hope Claude figures it out
- ⚠️ Risk: Occasional confusion between projects

**Option 2: Light Management** (Recommended minimum)
- Create project-specific CLAUDE.md files
- Use explicit project names in conversations
- ✅ Result: Minimal effort, good results

**Option 3: Full Management** (Optimal)
- Project-specific CLAUDE.md with scope headers
- Basic Memory projects for each area
- Conventional commits with project scopes
- Shared patterns extracted to shared/ folder
- ✅ Result: Perfect context, zero confusion

**Your choice should be Option 2 or 3.** The techniques are simple and the benefits are massive.

---

## Action Items

### Immediate (Before Adding Projects)
1. ✅ **Review this analysis**
2. [ ] **Initialize git** in SCA Projects workspace
3. [ ] **Update workspace CLAUDE.md** with project list and organization
4. [ ] **Add scope headers** to existing project CLAUDE.md files

### When Adding SCA Website
1. [ ] Create `SCAWebsite/` directory
2. [ ] Create `SCAWebsite/CLAUDE.md` with scope header
3. [ ] Create Basic Memory project: `sca-website`
4. [ ] Reference TennisFlyer patterns as needed

### When Adding Enrollment Automations
1. [ ] Create `EnrollmentAutomations/` directory
2. [ ] Create `EnrollmentAutomations/CLAUDE.md` with scope header
3. [ ] Create Basic Memory project: `enrollment-automations`
4. [ ] Document integration points with SCAWebsite

### Ongoing
1. [ ] Use conventional commits: `feat(project): description`
2. [ ] Update workspace CLAUDE.md when structure changes
3. [ ] Extract shared patterns to `shared/` as they emerge
4. [ ] Review context management quarterly

---

**Decision:** 🟢 **PROCEED WITH MONOREPO**

**Confidence:** 95% - This is the right choice for your use case.

**Fallback:** If you ever encounter persistent confusion (unlikely), you can always split into multi-repo later. Going from monorepo → multi-repo is much easier than multi-repo → monorepo.

---

**Analysis completed:** November 13, 2025
**Analyst:** Claude (Sonnet 4.5) via Claude Code CLI
**Next:** Initialize git and prepare for SCA Website project creation
