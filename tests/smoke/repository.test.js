const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');

test('repository includes required enterprise governance files', () => {
  const requiredFiles = [
    '.github/workflows/ci.yml',
    '.github/workflows/dependency-audit.yml',
    '.github/workflows/release.yml',
    'SECURITY.md',
    'SUPPORT.md',
    'CODE_OF_CONDUCT.md'
  ];

  for (const filePath of requiredFiles) {
    assert.equal(fs.existsSync(filePath), true, `${filePath} should exist`);
  }
});
