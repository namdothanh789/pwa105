import { Page } from "@playwright/test";

export class BasePage {
    page: Page;

    constructor(page: Page, private baseUrl: string) {
        this.page = page;
    }

    async open(url: string) {
        // Good
        if (url.includes("http") || url.includes("https")) {
            return this.page.goto(url);
        }

        return this.page.goto(`${this.baseUrl}/${url}`);
    }
}