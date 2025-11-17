# CLAUDE.md - ResumeFactory

---
🚨 **CONTEXT: ResumeFactory Project**

This is the **ResumeFactory** project for job application materials (ACTIVE).

**DO NOT confuse with:**
- TennisFlyer (completed promotional flyer project)
- SCAWebsite (future: main institutional website)
- EnrollmentAutomations (future: workflow automation)

This project is a **repeatable workflow** for generating tailored resumes and cover letters.
---

## Project Overview

ResumeFactory is a systematic approach to creating tailored job application materials for Ed O'Connell. Each application gets:
- Job posting analysis (markdown)
- Tailored resume (HTML format)
- Cover letter draft (markdown)
- Visual iterations (screenshots)
- Outcome tracking (Basic Memory)

**Status:** 🔄 Active - Reusable for future applications

---

## Ed O'Connell Quick Reference

### Current Role
**Director of Digital Strategy and AI Enablement**
Springfield Commonwealth Academy (Sep 2025 - Present)

### Core Expertise
- AI Governance & Integration (20+ years higher education)
- Content Management (SharePoint, Drupal, WordPress, Ghost CMS)
- Stakeholder Management & Training
- Process Automation & Optimization
- Educational Technology & Faculty Enablement

### Languages
- English (native)
- Spanish (professional working proficiency)

### Profile Source
See `linkedin-profile-ed-oconnell.md` for complete background

---

## Completed Applications

### ✅ Yale University - Digital Content and Chatbot Manager
- **Status:** SUBMITTED (November 2025)
- **Files:**
  - `Ed_OConnell_Yale_Resume.html`
  - `yale-job-posting.md`
  - `yale-cover-letter-draft-1.0.md`
  - `resume-*.png` (iterations)
- **Memory:** Saved to Basic Memory (sca-projects/resume-factory)
- **Outcome:** Awaiting response

---

## ResumeFactory Workflow

### Step 1: Job Analysis
Create job posting markdown file:
```
[company]-job-posting.md
- Position details
- Requirements analysis
- Match assessment (strengths/gaps)
```

### Step 2: Resume Creation
Generate tailored HTML resume:
```
Ed_OConnell_[Company]_Resume.html
- Highlight relevant experience
- Match language to job description
- Professional layout (ATS-friendly)
- Inline styles for portability
```

### Step 3: Cover Letter
Draft personalized cover letter:
```
[company]-cover-letter-draft-1.0.md
- Address specific requirements
- Show enthusiasm for role
- Explain relevant achievements
- Call to action
```

### Step 4: Visual Review
Preview materials in browser:
```javascript
// Use Playwright for visual iteration
const { chromium } = require('playwright');
// Preview resume, capture screenshots, iterate
```

### Step 5: Document Outcome
Save to Basic Memory:
```
- Application details
- Lessons learned
- Follow-up actions
- Outcome tracking
```

---

## MCP Server Usage

**Context7:** Resume best practices, HTML/CSS reference
**Basic Memory:** Application history, lessons learned, tracking
**Playwright:** Visual preview and iteration

---

## File Naming Conventions

```
Ed_OConnell_[Company]_Resume.html       # Tailored resume
[company]-job-posting.md                 # Job analysis
[company]-cover-letter-draft-X.Y.md     # Cover letter versions
resume-[feature]-screenshot.png          # Visual iterations
```

---

## Related Projects

### TennisFlyer (Reference)
- Playwright visual testing workflow → `../TennisFlyer/POST-MORTEM.md`
- HTML inline styling patterns → `../TennisFlyer/flyer-final-optimized.html`
- Iterative design process → Applies to resume iteration

### Future: SCAWebsite
- May include portfolio page showcasing work
- Consider design consistency with SCA branding

---

## Design Guidelines

### Resume Format
- ✅ Professional, clean layout
- ✅ ATS-friendly (structured HTML, semantic elements)
- ✅ Print-ready (PDF export via browser)
- ✅ Responsive (readable on various screens)
- ✅ Accessible (proper heading hierarchy)

### Cover Letter Format
- ✅ Personalized to institution and role
- ✅ 1-page maximum
- ✅ Address potential gaps proactively
- ✅ Show genuine enthusiasm
- ✅ Clear call to action

---

## Future Enhancements

### Template System
- [ ] Extract common resume structure
- [ ] Create component library (experience, education, skills)
- [ ] Build variable system for customization

### Automation
- [ ] Parse job postings automatically
- [ ] Match skills to requirements
- [ ] Generate initial drafts
- [ ] Track application status dashboard

### Portfolio Integration
- [ ] Link to actual project work (TennisFlyer, SCAWebsite)
- [ ] Create online portfolio page
- [ ] Reference in applications

---

## Quick Commands

```bash
# Preview resume in browser (create script as needed)
node scripts/preview-resume.js

# Search past applications in Basic Memory
# (via Claude Code): "Show me past job applications"

# Reference Yale application details
# (via Claude Code): "Retrieve Yale application from memory"
```

---

## Application Pipeline

**Identify → Analyze → Create → Review → Submit → Track**

1. **Identify opportunities** - LinkedIn, higher ed job boards
2. **Analyze requirements** - Create job posting markdown
3. **Create materials** - Resume + cover letter
4. **Review visually** - Playwright preview, iterate
5. **Submit application** - Via job portal
6. **Track outcome** - Update Basic Memory with results

---

## Target Role Types

**Primary Focus:**
- AI Governance Specialist positions
- Digital Content Management roles
- Educational Technology Leadership
- Higher Education IT Director positions

**Secondary:**
- Content Strategy Consultant
- Learning Technology Manager
- University Web Services Director

---

## Ed's Key Differentiators

- **Current AI Role:** Actively implementing AI governance at SCA (not theoretical)
- **20 Years Higher Ed:** Entire career in educational institutions
- **Content + AI Integration:** Unique combination of traditional CMS + modern AI
- **Training Success:** Proven faculty adoption (NotebookLM, prompt engineering)
- **Process Automation:** Measurable wins (week-long processes → single day)
- **Bilingual:** Spanish professional proficiency (asset for diverse institutions)

---

**Last Updated:** November 13, 2025
**Status:** Active - Yale submitted, ready for next application
**Pattern Established:** ✅ Repeatable workflow documented
