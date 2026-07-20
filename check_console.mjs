import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

const logs = [];
page.on('console', msg => logs.push(`[${msg.type()}] ${msg.text()}`));
page.on('pageerror', err => logs.push(`[PAGE_ERROR] ${err.message}`));

await page.goto('https://carofeed.vercel.app', { waitUntil: 'networkidle', timeout: 30000 });
await page.waitForTimeout(3000);

console.log('=== CONSOLE LOGS ===');
for (const l of logs) console.log(l);

const elements = await page.evaluate(() => ({
  guideSteps: !!document.getElementById('guide-steps')?.children.length,
  presetBarHidden: document.getElementById('preset-bar')?.classList.contains('hidden'),
  styleGrid: !!document.getElementById('style-grid')?.children.length,
  styleGridHTML: document.getElementById('style-grid')?.innerHTML?.substring(0, 200),
  presetSelect: document.getElementById('preset-select')?.style.display,
  enhancedTriggers: document.querySelectorAll('.enhanced-trigger').length,
  enhancedDropdowns: document.querySelectorAll('.enhanced-dropdown').length,
  dataEnhanced: document.querySelectorAll('[data-enhanced]').length,
  emptyStateHidden: document.getElementById('empty-state')?.classList.contains('hidden'),
  slidesAreaHidden: document.getElementById('slides-area')?.classList.contains('hidden'),
}));
console.log('\n=== ELEMENTS ===');
console.log(JSON.stringify(elements, null, 2));

await browser.close();
