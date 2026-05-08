const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    recordVideo: { dir: './recordings/', size: { width: 1280, height: 720 } }
  });

  const page = await context.newPage();
  const ports = [5173, 5174, 5175, 5176, 5177, 5178, 5179, 5180];
  let baseUrl = '';

  for (const port of ports) {
    try {
      const testUrl = `http://localhost:${port}`;
      console.log(`Checking port ${port}...`);
      await page.goto(testUrl, { timeout: 2000 });
      baseUrl = testUrl;
      console.log(`Successfully connected to ${baseUrl}`);
      break;
    } catch (e) { continue; }
  }

  if (!baseUrl) {
    console.error('Could not find your website on any port (5173-5180).');
    await browser.close();
    return;
  }

  const safeAction = async (name, action) => {
    console.log(`--- ${name} ---`);
    try { await action(); } catch (err) { console.warn(`Skipped: ${name}`, err.message); }
  };

  try {
    await page.waitForTimeout(3000);

    // 1. Universal: Navbar & Toggles
    await safeAction('Universal Features', async () => {
      console.log('Hovering Navbar...');
      const navLinks = page.locator('.nav-links a');
      for (let i = 0; i < await navLinks.count(); i++) {
        await navLinks.nth(i).hover();
        await page.waitForTimeout(500);
      }

      console.log('Toggling Theme...');
      await page.click('.theme-toggle');
      await page.waitForTimeout(1500);
      await page.click('.theme-toggle');
      await page.waitForTimeout(1000);

      console.log('Toggling Language...');
      await page.click('.lang-toggle');
      await page.waitForTimeout(1500);
      await page.click('.lang-toggle');
      await page.waitForTimeout(1000);
    });

    // 2. Home Page
    await safeAction('Home Full Walkthrough', async () => {
      console.log('Clicking Discover...');
      await page.click('.btn-primary');
      await page.waitForTimeout(2000);

      const timelineNodes = page.locator('.timeline-node');
      for (let i = 0; i < await timelineNodes.count(); i++) {
        await timelineNodes.nth(i).hover();
        await page.waitForTimeout(500);
      }

      await page.evaluate(() => document.getElementById('artists')?.scrollIntoView({ behavior: 'smooth' }));
      await page.waitForTimeout(1000);
      
      const artistCards = page.locator('.artist-card');
      for (let i = 0; i < Math.min(3, await artistCards.count()); i++) {
        await artistCards.nth(i).hover();
        await page.waitForTimeout(600);
      }

      await page.evaluate(() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' }));
      await page.waitForTimeout(1000);
      const galleryItems = page.locator('.gallery-item');
      for (let i = 0; i < Math.min(3, await galleryItems.count()); i++) {
        if (await galleryItems.nth(i).isVisible()) {
          await galleryItems.nth(i).hover();
          await page.waitForTimeout(600);
        }
      }

      console.log('Scrolling slowly through remaining sections...');
      for (let i = 0; i < 6; i++) {
        await page.evaluate(() => window.scrollBy(0, 500));
        await page.waitForTimeout(1000);
      }

      console.log('Hovering Social Icons...');
      const socials = page.locator('.social-icons a');
      for (let i = 0; i < await socials.count(); i++) {
        await socials.nth(i).hover();
        await page.waitForTimeout(600);
      }
    });

    // 3. Music Page
    await safeAction('Music Page', async () => {
      await page.goto(`${baseUrl}/#/music`);
      await page.waitForTimeout(2000);
      const cards = page.locator('.artist-card');
      for (let i = 0; i < await cards.count(); i++) {
        await cards.nth(i).hover();
        await page.waitForTimeout(500);
      }
    });

    // 4. Cinema Page
    await safeAction('Cinema Page', async () => {
      await page.goto(`${baseUrl}/#/cinema`);
      await page.waitForTimeout(2000);
      const cards = page.locator('.artist-card');
      for (let i = 0; i < Math.min(6, await cards.count()); i++) {
        await cards.nth(i).hover();
        await page.waitForTimeout(500);
      }
    });

    // 5. Films Page
    await safeAction('Films Page', async () => {
      await page.goto(`${baseUrl}/#/films`);
      await page.waitForTimeout(2000);
      const cards = page.locator('.artist-card');
      for (let i = 0; i < Math.min(3, await cards.count()); i++) {
        await cards.nth(i).hover();
        await page.waitForTimeout(500);
      }
    });

    // 6. Games Page
    await safeAction('Games Page', async () => {
      await page.goto(`${baseUrl}/#/games`);
      await page.waitForTimeout(2000);
      const gameCards = page.locator('.game-card');
      for (let i = 0; i < await gameCards.count(); i++) {
        await gameCards.nth(i).hover();
        await page.waitForTimeout(800);
        const buyBtn = gameCards.nth(i).locator('button');
        if (await buyBtn.isVisible()) await buyBtn.click();
        await page.waitForTimeout(800);
      }
    });

    // 7. About Page (Slow Scroll)
    await safeAction('About Page Slow Reveal', async () => {
      await page.goto(`${baseUrl}/#/about`);
      await page.waitForTimeout(2000);
      
      console.log('Scrolling slowly for team reveal...');
      for (let i = 0; i < 10; i++) {
        await page.evaluate((scrollAmount) => window.scrollBy(0, scrollAmount), 400);
        await page.waitForTimeout(1000); // Wait for animations to trigger
      }
      await page.waitForTimeout(2000);
    });

    console.log('Recording complete!');
  } catch (err) {
    console.error('Critical Error:', err);
  } finally {
    await context.close();
    await browser.close();
  }
})();
