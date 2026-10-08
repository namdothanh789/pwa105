import { test } from '@fixtures/index';
import { expect } from '@playwright/test';

test.describe('Home page', () => {
    test('home page displayed', async ({ homePage }) => {
        await homePage.open('https://google.com');
    });

    test('always fails', async () => {
        expect(true).toBe(false);
    });
});
