const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
function check(dir) {
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['node_modules', '.git'].includes(item.name)) continue;
    const file = path.join(dir, item.name);
    if (item.isDirectory()) check(file);
    else if (file.endsWith('.js'))
      execFileSync(process.execPath, ['--check', file], { stdio: 'inherit' });
  }
}
check(process.cwd());
console.log('JavaScript syntax OK');
