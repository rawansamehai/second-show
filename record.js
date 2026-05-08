const { chromium } = require('playwright');
const path = require('path');

(async () => {
  // Launch the browser
  const browser = await chromium.launch({
    headless: false // Show the browser while recording
  });

  // Create a new context with video recording enabled
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    recordVideo: {
      dir: './recordings/',
      size: { width: 1280, height: 720 }
    }
  });

  const page = await context.newPage();
  
  // Robust port detection
  const ports = [5173, 5174, 5175, 5176, 5177, 5178, 5179, 5180];
  let url = '';
  
  for (const port of ports) {
    try {
      const testUrl = `http://localhost:${port}`;
      console.log(`Checking port ${port}...`);
      await page.goto(testUrl, { timeout: 2000 });
      url = testUrl;
      console.log(`Successfully connected to ${url}`);
      break;
    } catch (e) {
      continue;
    }
  }

  if (!url) {
    console.error('Could not find your website on any port (5173-5180). Is your server running?');
    await browser.close();
    return;
  }

  try {
    await page.waitForTimeout(2000); // Wait for initial animations

    // 1. Scroll through Home Page
    console.log('Scrolling home page...');
    await page.mouse.wheel(0, 1000);
    await page.waitForTimeout(1000);
    await page.mouse.wheel(0, 1000);
    await page.waitForTimeout(1000);

    // 2. Toggle Theme (Dark/Light)
    console.log('Toggling theme...');
    const themeToggle = await page.locator('.theme-toggle');
    await themeToggle.click();
    await page.waitForTimeout(1500);
    await themeToggle.click();
    await page.waitForTimeout(1500);

    // 3. Switch Language
    console.log('Switching language...');
    const langToggle = await page.locator('.lang-toggle');
    await langToggle.click();
    await page.waitForTimeout(1500);
    await langToggle.click();
    await page.waitForTimeout(1500);

    // 4. Hover effects on Nav links
    console.log('Testing hover effects...');
    const navLinks = page.locator('.nav-links a');
    const count = await navLinks.count();
    for (let i = 0; i < count; i++) {
      await navLinks.nth(i).hover();
      await page.waitForTimeout(500);
    }

    // 5. Navigate through pages
    console.log('Navigating to Music...');
    await page.click('text=الموسيقى'); // Or 'Music' depending on state
    await page.waitForTimeout(2000);

    console.log('Navigating to Cinema...');
    await page.click('text=السينما');
    await page.waitForTimeout(2000);

    console.log('Navigating to About...');
    await page.click('text=عننا');
    await page.waitForTimeout(2000);

    console.log('Recording finished.');
  } catch (err) {
    console.error('Error during recording:', err);
  } finally {
    // Close context to save the video
    await context.close();
    await browser.close();

    console.log('Video saved to the ./recordings/ folder.');
  }
})();
