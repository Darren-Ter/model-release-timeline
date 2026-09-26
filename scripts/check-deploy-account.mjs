import { execFileSync } from 'node:child_process';

const identity = JSON.parse(execFileSync(process.execPath, [
  'node_modules/wrangler/bin/wrangler.js', 'whoami', '--json',
], { encoding: 'utf8' }));
if (!identity.loggedIn || /blazing[\s_-]*fast/i.test(JSON.stringify(identity)) ||
    identity.email !== 'tzyong990808@gmail.com' ||
    !identity.accounts?.some((account) => account.id === '4885217f1786a45387def0b055cf8bb4')) {
  throw new Error('Deployment stopped: log in with the approved Async Web Studio identity before deploying.');
}
console.log('Verified deployment account: Async Web Studio (tzyong990808@gmail.com).');
