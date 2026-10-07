import { test } from '@fixtures/index';

test('home page displayed', async ({ homePage }) => {
    await homePage.open("https://google.com")
});

