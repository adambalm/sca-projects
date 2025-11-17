# Shared Resources

This directory contains patterns, scripts, and templates shared across all SCA Projects.

## Structure

```
shared/
├── templates/        # Project templates and boilerplate
├── scripts/          # Reusable scripts (Playwright helpers, etc.)
├── patterns/         # Documented patterns and best practices
└── README.md         # This file
```

## Usage

### Templates
Copy and customize for new projects:
```bash
cp shared/templates/PROJECT-CLAUDE-TEMPLATE.md NewProject/CLAUDE.md
```

### Scripts
Reference in project-specific scripts:
```javascript
const helpers = require('../shared/scripts/playwright-helpers.js');
```

### Patterns
Reference in documentation:
```markdown
See ../shared/patterns/playwright-visual-testing.md
```

## Contributing Patterns

When you establish a useful pattern in a project:

1. **Extract the pattern** - Generalize it beyond the specific project
2. **Document it** - Create a markdown file in `patterns/`
3. **Reference it** - Link from project CLAUDE.md files
4. **Commit it** - Use `docs(shared): add [pattern name]` convention

## Current Patterns

### From TennisFlyer
- Playwright visual testing workflow
- file:// protocol for local HTML preview
- Infinite wait pattern for manual review
- File naming conventions

See `TennisFlyer/POST-MORTEM.md` for details.

---

## Common Folder Patterns

Create these folders **as your project needs them** (don't pre-create empty folders):

### Image & Asset Folders

**Options (choose what fits your project):**
```
img/               # Images and graphics
assets/            # Broader: images, fonts, icons together
screenshots/       # Design iteration captures
iterations/        # Alternative for iteration screenshots
```

**Examples from existing projects:**
- **TennisFlyer:** Uses `img/` for map, court photos, flyer graphic
- **ResumeFactory:** Currently has screenshots in root - could use `iterations/` for organization
- **SCAWebsite** (future): Likely `assets/` for comprehensive web assets

**Guidelines:**
- Keep images in project-specific folders (avoid cross-project dependencies)
- Use descriptive filenames: `map.png`, `sca-logo.png`, `hero-image.jpg`
- For iterations: `resume-layout-v1.png`, `homepage-2025-11-13.png`
- Optimize file sizes (especially for web projects)

### Other Common Folders

```
src/               # Source code
tests/             # Test files
docs/              # Additional documentation
scripts/           # Project-specific automation scripts
dist/ or build/    # Compiled output (add to .gitignore)
data/              # Project data files
config/            # Configuration files
```

### Shared Assets (Use Sparingly)

If multiple projects need the **exact same assets** (e.g., SCA logo):
```
shared/assets/
  brand/           # SCA logo, brand colors, style guide
  common/          # Truly shared images/icons
```

**Only create shared/assets/ when:**
- Asset is used in 2+ projects
- Asset should be updated centrally (one source of truth)
- Example: SCA logo used in TennisFlyer, SCAWebsite, ResumeFactory

**Benefits of project-specific folders:**
- ✅ Self-contained projects
- ✅ Clear ownership
- ✅ Easy to understand what belongs where
- ✅ Projects remain portable
- ✅ No unexpected dependencies

---

**Last Updated:** November 13, 2025
