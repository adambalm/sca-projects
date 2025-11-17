const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 50 });

  try {
    console.log('🎯 Testing Map Fix in flyer-final-optimized.html\n');
    console.log('═══════════════════════════════════════════\n');

    const page = await browser.newPage();
    await page.setViewportSize({ width: 1920, height: 1080 });

    const htmlFile = 'C:/Users/Guest1/ClaudeProjects/TennisFlyer/flyer-final-optimized.html';
    const url = `file:///${htmlFile}`;

    console.log('📄 Loading flyer-final-optimized.html...\n');
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);

    // Check map image properties
    const mapImage = await page.locator('.map-image').first();
    const isMapVisible = await mapImage.isVisible();
    console.log(`✅ Map image visible: ${isMapVisible}`);

    if (isMapVisible) {
      const mapBox = await mapImage.boundingBox();
      console.log(`📏 Map dimensions: ${mapBox.width}x${mapBox.height}px`);

      // Get computed styles
      const objectFit = await mapImage.evaluate(el => window.getComputedStyle(el).objectFit);
      const height = await mapImage.evaluate(el => window.getComputedStyle(el).height);
      console.log(`🎨 object-fit: ${objectFit}`);
      console.log(`📐 CSS height: ${height}\n`);
    }

    // Take full page screenshot
    await page.screenshot({
      path: 'flyer-optimized-tested.png',
      fullPage: true
    });
    console.log('📸 Full page screenshot saved to flyer-optimized-tested.png\n');

    // Scroll to map and take focused screenshot
    await page.evaluate(() => {
      const mapElement = document.querySelector('.map-image');
      if (mapElement) {
        mapElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
    await page.waitForTimeout(1000);

    await page.screenshot({
      path: 'map-optimized-focused.png',
      fullPage: false
    });
    console.log('📸 Map focused screenshot saved to map-optimized-focused.png\n');

    console.log('═══════════════════════════════════════════\n');
    console.log('✅ FIX SUMMARY:\n');
    console.log('Changes applied to flyer-final-optimized.html:');
    console.log('  • object-fit: cover → contain');
    console.log('  • height: 130px → 180px');
    console.log('  • Added object-position: center');
    console.log('  • Added background: #f8fafc\n');
    console.log('Result: Full map route should now be visible!');
    console.log('═══════════════════════════════════════════\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await browser.close();
  }
})();
