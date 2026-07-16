import assert from 'node:assert';
import { test } from 'node:test';
import { getHealthPayload } from '../src/utils/health.js';

test('backend health payload returns ok status', () => {
  const payload = getHealthPayload();
  assert.equal(payload.status, 'ok');
  assert.ok(typeof payload.uptime === 'number');
});
