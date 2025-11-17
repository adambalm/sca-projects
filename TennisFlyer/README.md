# TennisFlyer

WhatsApp-optimized promotional flyer for Springfield Commonwealth Academy tennis program.

**Status:** ✅ Shipped
**Delivered:** November 2025

---

## Quick Start

### Preview the Flyer
```bash
node scripts/view-final.js
```

### Validate Map Rendering
```bash
node scripts/test-optimized-map.js
```

---

## Project Structure

```
TennisFlyer/
├── COMPETITION-ENTRY-FINAL.png      # 🎯 Shipped product
├── flyer-final-optimized.html       # Source HTML
├── flyer-final.pdf                  # PDF export
│
├── img/                             # Source assets
│   ├── map.png                      # Route map (I-91S, CT-220E)
│   ├── SCA_Tennis_Flyer.png         # Main flyer content
│   └── court.png.png                # Tennis court image
│
├── scripts/                         # Playwright testing
│   ├── view-final.js               # Visual preview (main)
│   └── test-optimized-map.js       # Map validation
│
├── tools/                           # Playwright wrappers
│   ├── pw-run.sh                   # Bash wrapper
│   └── pw-run.cmd                  # Windows wrapper
│
├── docs/
│   └── design-review-notes.md      # Design iteration notes
│
├── product_notes/                   # Development history
│
├── CLAUDE.md                        # AI context & developer guide
└── POST-MORTEM.md                  # Lessons learned & project analysis
```

---

## Key Features

- **WhatsApp-optimized:** < 1MB file size, mobile-first layout (720px max-width)
- **Full route visibility:** Map displays I-91S and CT-220E without cropping
- **Responsive design:** 9:16 aspect ratio, optimized for mobile viewing
- **Print-ready:** PDF export available

---

## Technology Stack

- **HTML/CSS:** Hand-crafted, inline styles for portability
- **Playwright 1.56.1:** Visual testing and automated preview
- **Node.js:** Test script execution
- **Git:** Version control

---

## Design Constraints

### Map Section (Critical)
- **Height:** 180px (minimum 140px)
- **Object-fit:** `contain` (not `cover` - prevents route cropping)
- **Object-position:** `center`
- **Background:** `#f8fafc` (fills letterbox space)
- **Dimensions:** 714x140px

### WhatsApp Optimization
- **File size:** < 1MB
- **Recommended dimensions:** 1080x1920px (9:16 ratio)
- **Max-width:** 720px

---

## Development Workflow

### Established Pattern
1. Edit `flyer-final-optimized.html`
2. Run `node scripts/view-final.js` (browser opens for visual inspection)
3. Make adjustments based on visual review
4. Run `node scripts/test-optimized-map.js` to validate map rendering
5. Update `docs/design-review-notes.md` with changes
6. Export to PDF if needed: `flyer-final.pdf`

### Playwright Pattern
```javascript
// Non-headless browser, infinite wait for manual review
const browser = await chromium.launch({ headless: false, slowMo: 50 });
// ... navigate to file:/// URL
await new Promise(() => {}); // Keep browser open
```

**Benefits:**
- Immediate visual feedback
- Designer controls review duration
- Observable interactions with slowMo
- No server setup required (file:// protocol)

---

## Installation

```bash
# Install dependencies (Playwright 1.56.1 pinned via .npmrc)
npm install

# Verify Playwright wrapper
./tools/pw-run.sh --version  # Bash
tools\pw-run.cmd --version   # Windows
```

**Note:** Browser binaries cached at `%USERPROFILE%\AppData\Local\ms-playwright`

---

## MCP Configuration

This project uses user-level MCP servers (available across all Claude Code projects):

- **Playwright MCP** (`@playwright/mcp`) - Browser automation
- **Context7 MCP** (`@upstash/context7-mcp`) - Context management
- **Basic Memory MCP** (`basic-memory` via uvx) - Knowledge persistence

Configuration: `~/.claude.json` (user-level, Windows cmd /c wrappers applied)

---

## Files

### Core Deliverables
- `COMPETITION-ENTRY-FINAL.png` - **Shipped product** (final screenshot)
- `flyer-final-optimized.html` - Source HTML
- `flyer-final.pdf` - PDF export for print

### Documentation
- `README.md` - This file (project overview)
- `CLAUDE.md` - Claude Code context & developer guide
- `POST-MORTEM.md` - **Comprehensive lessons learned** (highly recommended read)
- `docs/design-review-notes.md` - Design iteration notes

### Assets
- `img/map.png` - Route map (I-91S, CT-220E to Springfield)
- `img/SCA_Tennis_Flyer.png` - Main flyer content
- `img/court.png.png` - Tennis court photograph

---

## Known Issues

### Resolved
- ✅ **Map cropping:** Resolved by changing `object-fit: cover` → `contain`
- ✅ **File size:** Optimized to < 1MB for WhatsApp
- ✅ **Mobile layout:** 720px max-width ensures mobile compatibility

### Active
- None

---

## Future Considerations

### Potential Backend Integration
- CMS for flyer content management
- API for personalized flyers (per-student customization)
- Dynamic map generation based on student location
- A/B testing different design variants

### Template Reusability
- Extract HTML as template system
- Move inline styles to external CSS
- Create variable system for content sections
- Build component library for flyer elements

---

## Project Purpose

This project served as a **foundational frontend design exercise** to:
1. Establish Playwright visual testing workflow
2. Learn Claude Code best practices
3. Configure MCP servers for enhanced tooling
4. Create reusable patterns for AI-assisted design

**Success criteria:** ✅ All met - see `POST-MORTEM.md` for detailed analysis

---

## Contributing

This is a completed, shipped project. For reference or learning purposes only.

**To learn from this project:**
1. Read `POST-MORTEM.md` for lessons learned
2. Review `CLAUDE.md` for Claude Code patterns
3. Examine Playwright scripts in `scripts/` for visual testing patterns
4. Check `.npmrc` for dependency management approach

---

## License

Private project - Springfield Commonwealth Academy

---

## Links

- **Playwright Docs:** https://playwright.dev
- **Claude Code Docs:** https://docs.claude.com/claude-code
- **MCP Servers:** https://github.com/modelcontextprotocol

---

## Contact

Project completed by Claude Code (AI-assisted development)
For questions about methodology, see `POST-MORTEM.md`

---

**Last updated:** November 6, 2025
**Project status:** ✅ Shipped and archived
