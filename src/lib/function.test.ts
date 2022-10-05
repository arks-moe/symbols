import { test, expect } from 'vitest';
import add from './function';

test('adds', () => {
	expect(add(1, 2)).toEqual(3);
});
