#!/usr/bin/env node
// Auto-runs after every Claude session: git push → Vercel deploy
import git from 'isomorphic-git';
import http from 'isomorphic-git/http/node';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const GH_TOKEN     = process.env.GH_TOKEN;
const VERCEL_TOKEN = process.env.VERCEL_TOKEN;
const VERCEL_TEAM  = process.env.VERCEL_TEAM_ID;
const DIR          = path.resolve(fileURLToPath(import.meta.url), '../..');

const IGNORE = new Set([
  'node_modules','.next','.git','out','build','.vercel','.DS_Store','scripts',
]);

function walkFiles(dir, base = '') {
  const results = [];
  for (const entry of fs.readdirSync(dir)) {
    if (IGNORE.has(entry)) continue;
    const full = path.join(dir, entry);
    const rel  = base ? `${base}/${entry}` : entry;
    try {
      if (fs.statSync(full).isDirectory()) results.push(...walkFiles(full, rel));
      else results.push(rel);
    } catch {}
  }
  return results;
}

async function gitPush() {
  if (!GH_TOKEN) { console.log('[deploy] no GH_TOKEN, skipping git push'); return; }

  // Stage all changes
  const matrix = await git.statusMatrix({ fs, dir: DIR });
  const changed = matrix.filter(([, head, workdir, stage]) => head !== workdir || workdir !== stage);
  if (changed.length === 0) { console.log('[deploy] no git changes to commit'); return; }

  for (const [filepath] of changed) {
    const full = path.join(DIR, filepath);
    if (fs.existsSync(full)) await git.add({ fs, dir: DIR, filepath });
    else await git.remove({ fs, dir: DIR, filepath });
  }

  const msg = `Update: feedback applied ${new Date().toISOString().slice(0, 16).replace('T', ' ')}`;
  await git.commit({ fs, dir: DIR, message: msg, author: { name: 'Jaycie', email: 'jclorete09@gmail.com' } });

  await git.push({
    fs, http, dir: DIR, remote: 'origin', ref: 'main',
    onAuth: () => ({ username: GH_TOKEN, password: GH_TOKEN }),
    force: false,
  });
  console.log('[deploy] ✓ pushed to GitHub');
}

async function vercelDeploy() {
  if (!VERCEL_TOKEN) { console.log('[deploy] no VERCEL_TOKEN, skipping Vercel deploy'); return; }

  const files = walkFiles(DIR);
  const deployFiles = [];

  for (const rel of files) {
    const content = fs.readFileSync(path.join(DIR, rel));
    const sha1    = crypto.createHash('sha1').update(content).digest('hex');
    await fetch(`https://api.vercel.com/v2/files?teamId=${VERCEL_TEAM}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${VERCEL_TOKEN}`,
        'Content-Type': 'application/octet-stream',
        'x-vercel-digest': sha1,
        'Content-Length': String(content.length),
      },
      body: content,
    });
    deployFiles.push({ file: rel, sha: sha1, size: content.length });
  }

  const res = await fetch(`https://api.vercel.com/v13/deployments?teamId=${VERCEL_TEAM}`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${VERCEL_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'jcportfolio',
      target: 'production',
      framework: 'nextjs',
      files: deployFiles,
      projectSettings: { framework: 'nextjs' },
    }),
  });
  const deploy = await res.json();
  if (deploy.error) { console.error('[deploy] Vercel error:', deploy.error.message); return; }

  console.log(`[deploy] building… https://${deploy.url}`);

  // Poll until ready (max 3 min)
  let state = deploy.readyState || 'BUILDING';
  let tries = 0;
  while (!['READY','ERROR','CANCELED'].includes(state) && tries++ < 45) {
    await new Promise(r => setTimeout(r, 4000));
    const s = await fetch(`https://api.vercel.com/v13/deployments/${deploy.id}?teamId=${VERCEL_TEAM}`, {
      headers: { 'Authorization': `Bearer ${VERCEL_TOKEN}` },
    }).then(r => r.json());
    state = s.readyState || state;
  }

  if (state === 'READY') console.log(`[deploy] ✓ live → https://jclorete-portfolio.vercel.app`);
  else console.log(`[deploy] build ended: ${state}`);
}

(async () => {
  try {
    await gitPush();
    await vercelDeploy();
    // Output JSON so Claude Code sees a clean system message
    console.log(JSON.stringify({ systemMessage: '✓ Deployed to production → https://jclorete-portfolio.vercel.app' }));
  } catch (e) {
    console.error('[deploy] error:', e.message);
  }
})();
