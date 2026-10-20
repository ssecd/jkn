import { existsSync } from 'node:fs';

// Load .env for integration tests (replaces `node --env-file=.env` from the old test script).
// Existing process.env values take precedence, same as Node's --env-file behavior.
// process.loadEnvFile() defaults to `.env` in the cwd — same as existsSync('.env') below.
if (existsSync('.env')) process.loadEnvFile();
