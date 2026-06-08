import { spawn } from 'node:child_process';

const nodePath = 'C:\\Progra~1\\nodejs\\node.exe';

const processes = [
  {
    name: 'server',
    cwd: 'server',
    args: ['./node_modules/nodemon/bin/nodemon.js', '--exec', nodePath, 'src/index.js']
  },
  {
    name: 'client',
    cwd: 'client',
    args: ['./node_modules/vite/bin/vite.js', '--host', '0.0.0.0']
  }
];

const children = processes.map(({ name, cwd, args }) => {
  const child = spawn(nodePath, args, {
    cwd,
    stdio: 'pipe',
    shell: false,
    env: { ...process.env, FORCE_COLOR: '1' }
  });

  child.stdout.on('data', (data) => {
    process.stdout.write(`[${name}] ${data}`);
  });

  child.stderr.on('data', (data) => {
    process.stderr.write(`[${name}] ${data}`);
  });

  child.on('exit', (code) => {
    if (code !== 0) {
      process.stderr.write(`[${name}] exited with code ${code}\n`);
    }
  });

  return child;
});

function stopAll() {
  for (const child of children) {
    child.kill();
  }
}

process.on('SIGINT', () => {
  stopAll();
  process.exit(0);
});

process.on('SIGTERM', () => {
  stopAll();
  process.exit(0);
});
