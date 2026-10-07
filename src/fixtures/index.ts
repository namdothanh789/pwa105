import { mergeTests } from '@playwright/test';
import { test as homeTest } from '@fixtures/storefront/home/home.fixture';

export const test = mergeTests(homeTest);