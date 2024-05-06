import antfu from '@antfu/eslint-config'

export default antfu({
  vue: true,
  ignores: ['node_modules'],
  rules: {
    'style/semi': 'off',
    'curly': 'off',
    'antfu/top-level-function': 'off',
    'style/brace-style': 'off',
  },
})
