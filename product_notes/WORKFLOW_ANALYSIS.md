# Tennis Flyer Design Iteration - Workflow Analysis

## Current Workflow Documentation

### Project Goal
Iterating on a tennis academy flyer design using browser automation to generate screenshots and validate design changes.

### Current Implementation (Plugin-based)

#### Architecture
```
Your Script → Plugin Wrapper → Playwright → Browser → Screenshot
     ↓              ↓               ↓           ↓          ↓
iterate.js → run.js wrapper → chromium.launch → render → PNG
```

#### Issues Identified
1. **Resource Management Disaster**
   - 66+ Chrome/Edge processes running simultaneously
   - 8GB+ RAM consumption from zombie browsers
   - Plugin's `run.js` wrapper doesn't clean up properly

2. **Workflow Complexity**
   - Extra layer of indirection through plugin wrapper
   - Scripts must be run through `C:\Users\Guest1\.claude\plugins\marketplaces\playwright-skill\skills\playwright-skill\run.js`
   - No direct access to Playwright API

3. **Error Handling Problems**
   - Processes marked as "running" even after failure
   - No proper cleanup on script errors
   - Difficult to debug through wrapper layer

### Requirements for New Solution

#### Core Functionality Needed
1. **Browser Automation**
   - Launch headless/headful browser
   - Navigate to local HTML files
   - Take screenshots at specific viewport sizes
   - Wait for page rendering

2. **Design Iteration Workflow**
   - Load HTML design file
   - Capture screenshot
   - Save with versioned naming
   - Keep browser open for review (optional)
   - Clean up resources properly

3. **Multiple Format Support**
   - WhatsApp square (1080x1080)
   - PDF generation
   - Responsive design testing

#### Desired Improvements
1. **Direct API Access** - No wrapper layers
2. **Proper Resource Management** - Auto-cleanup of browser instances
3. **Better Error Handling** - Clear error messages and recovery
4. **Visual Diff Capabilities** - Compare iterations automatically
5. **Integrated with Claude Code** - Native tool support

### Files Currently in Use

#### HTML Designs
- `whatsapp-square-optimized.html` - Square format for WhatsApp
- `flyer-final.html` - Full flyer design
- `flyer-final-optimized.html` - Performance optimized version
- `flyer-one-page.html` - Single page variant

#### Test Scripts
- `iterate-whatsapp.js` - Main iteration script for WhatsApp design
- `check-pdf.js` - PDF validation
- `verify-exports.js` - Export verification

#### Generated Assets
- Multiple PNG screenshots (various iterations)
- `TennisFlyer.pdf` - PDF output
- `flyer-final.pdf` - Final PDF version

### Current Script Pattern
```javascript
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 50 });
  try {
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1080, height: 1080 });

    const htmlFile = 'path/to/file.html';
    const url = `file:///${htmlFile}`;

    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    await page.screenshot({
      path: 'output.png',
      fullPage: false
    });

    // Keep browser open for review
    await page.waitForTimeout(600000);
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
  }
})();
```

### Migration Goals

1. **Eliminate Plugin Dependency** - Use official Playwright MCP or webapp testing skill
2. **Simplify Workflow** - Direct script execution without wrappers
3. **Improve Resource Management** - Automatic cleanup, no zombie processes
4. **Better Integration** - Native Claude Code tool support
5. **Enhanced Capabilities** - Visual regression, parallel testing, better reporting

## Next Steps

1. Research and compare:
   - Official Playwright MCP Server
   - Anthropic Webapp Testing Skill
   - Native Playwright integration options

2. Select best tool based on:
   - Ease of installation
   - Feature completeness
   - Resource management
   - Claude Code integration

3. Refactor existing scripts for new tool
4. Test and validate new workflow
5. Clean up old dependencies