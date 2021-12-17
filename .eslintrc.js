module.exports = {
	'parserOptions': {
		'ecmaVersion': 2018,
		'sourceType': 'module'
	},
	'env': {
		'browser': true,
		'es6': true,
		'node': true
	},
	'extends': [
		"eslint:recommended",
	],
	'rules': {
		'indent': ['warn','tab'],
		'linebreak-style': ['warn','unix'],
		'quotes': ['warn','single'],
		'semi': ['warn','never'],

		'no-use-before-define': 0,
		'no-unused-vars': 0
	},
	'overrides': [
		{
			'files': ['**/*.ts'],
			'parser': '@typescript-eslint/parser',
			'parserOptions': {
				'ecmaVersion': 2018,
				'sourceType': 'module'
			},
			'env': {
				'browser': true,
				'es6': true,
				'node': true
			},
			'plugins': [
				'@typescript-eslint/eslint-plugin'
			],
			'extends': [
				"plugin:@typescript-eslint/recommended"
			],
			'rules': {
				'indent': ['warn', 'tab'],
				'linebreak-style': ['warn', 'unix'],
				'quotes': ['warn', 'single'],
				'semi': ['warn', 'never'],

				'@typescript-eslint/no-use-before-define': 0,
				'@typescript-eslint/no-unused-vars': 0
			}
		}
	]
}
