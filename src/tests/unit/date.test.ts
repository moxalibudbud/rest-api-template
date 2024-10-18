import { test, expect } from '@jest/globals';
import date from '@utils/date';

test('Test date helper', () => {
  const year = date('2024', 'YYYY').format('YYYY');
  expect(year).toBe('2024');
});

