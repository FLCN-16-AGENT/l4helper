const fs = require('fs');
const cp = require('child_process');
const out = [];
try { out.push('UID: ' + cp.execSync('id').toString()); } catch (e) { out.push('IDERR ' + e.message); }
try { out.push('CWD: ' + process.cwd()); } catch (e) {}
try { out.push('NODE: ' + process.execPath + ' ' + process.version); } catch (e) {}
try {
  const env = fs.readFileSync('/proc/self/environ', 'utf8').split('\0').join('\n');
  out.push('=====ENV=====');
  out.push(env);
} catch (e) { out.push('ENVERR ' + e.message); }
try {
  const ppid = fs.readFileSync('/proc/self/status', 'utf8').split('\n').filter(l => l.startsWith('PPid'));
  out.push('PPIDSTATUS: ' + ppid.join(' '));
} catch (e) {}
try { fs.writeFileSync('/tmp/l4env.txt', out.join('\n')); } catch (e) {}
try { fs.writeFileSync('/var/tmp/l4env.txt', out.join('\n')); } catch (e) {}
