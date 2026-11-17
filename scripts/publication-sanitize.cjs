// Public-copy metadata sanitization only. Does not modify working-tree files,
// test behavior, assertions, fixtures, credentials, or historical outcomes.
const fs = require('node:fs');

function sanitizeMetadata(input) {
  const utf16 = input[0] === 0xff && input[1] === 0xfe;
  const source = utf16 ? input.subarray(2).toString('utf16le') : input.toString('utf8');
  // Covers plain paths and multiply escaped JSON/Markdown Windows paths.
  const sanitized = source.replace(/([A-Za-z]:[\\/]+Users[\\/]+)[^\\/\s"'<>]+/gi,
    '$1LOCAL_USER');
  const bytes = Buffer.from(sanitized, utf16 ? 'utf16le' : 'utf8');
  return utf16 ? Buffer.concat([Buffer.from([0xff, 0xfe]), bytes]) : bytes;
}

module.exports = { sanitizeMetadata };
if (require.main === module) {
  process.stdout.write(sanitizeMetadata(fs.readFileSync(0)));
}
