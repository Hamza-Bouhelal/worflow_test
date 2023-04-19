import {
  Browser,
  BrowserContext,
  chromium,
  Page,
  request,
  APIRequestContext,
} from "@playwright/test";

export async function executeInBrowser(
  toExecute: (args: { page: Page }) => Promise<any>
) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  let result;
  try {
    result = await toExecute({ page });
  } finally {
    await page.close();
    await context.close();
    await browser.close();
  }
  return result;
}
