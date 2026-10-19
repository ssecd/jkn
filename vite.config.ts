import { defineConfig } from 'vite-plus';

export default defineConfig({
	lint: {
		categories: {
			correctness: 'error'
		},
		env: {
			builtin: true,
			node: true
		},
		rules: {
			'vite-plus/prefer-vite-plus-imports': 'error'
		},
		options: {
			typeAware: true,
			typeCheck: true
		},
		jsPlugins: [
			{
				name: 'vite-plus',
				specifier: 'vite-plus/oxlint-plugin'
			}
		]
	},
	test: {
		include: ['test/**/*.{test,spec}.{js,ts}'],
		watch: false,
		setupFiles: ['./test/env.ts']
	},
	pack: {
		entry: ['src/index.ts'],
		dts: true,
		format: ['esm'],
		// Emit .js/.d.ts (not .mjs/.d.mts) so the package.json exports map keeps working unchanged
		fixedExtension: false
	},
	fmt: {
		useTabs: true,
		singleQuote: true,
		trailingComma: 'none',
		printWidth: 100,
		sortPackageJson: false,
		ignorePatterns: ['pnpm-lock.yaml']
	}
});
