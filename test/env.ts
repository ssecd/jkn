import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

// Load .env for integration tests (replaces `node --env-file=.env` from the old test script).
// Existing process.env values take precedence, same as Node's --env-file behavior.
if (existsSync(resolve(process.cwd(), '.env'))) {
	process.loadEnvFile(resolve(process.cwd(), '.env'));
}
