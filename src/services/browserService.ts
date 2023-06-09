import { executeInBrowser } from "../utils/browserUtils";

export class BrowserService {
  static async getData() {
    return await executeInBrowser(async ({ page }) => {
      await page.goto("https://www.coindesk.com/price/bitcoin/");
      await page.locator("//span[.='$']/parent::div/span[2]").waitFor();
      return await page
        .locator("//span[.='$']/parent::div/span[2]")
        .textContent();
    });
  }
}
