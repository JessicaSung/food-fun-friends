// Simple Jest file example

// const sum = require('./example');
import sum from './example';

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});