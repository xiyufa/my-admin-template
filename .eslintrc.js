module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    //生产环境中禁止在 return、throw、continue 和 break 语句之后出现不可达代码
    'no-unreachable': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-alert': 'error', // 禁止使用alert confirm prompt
    'linebreak-style': 'off',
    'eqeqeq': ['error', 'always'], // 强制使用===或!==
    'no-eval': 'error',
    'no-param-reassign': 'error',
    'no-sequences': 'error',
    'radix': ['error', 'always'], // 在parseInt需要提供第二个参数 parseInt('1', 10)
    'require-await': 'error', // 禁止使用不带 await 表达式的 async 函数
    'strict': ['error', 'global'], // 全局使用严格模式
    'init-declarations': ['error', 'always'], // 变量在声明的时候必须初始化
    'no-use-before-define': 'error', // 禁止在变量定义之前使用
    'semi': ['error', 'never'], // 末尾不允许分号
    'comma-dangle': ['error', 'never'], // 对象等最后一个键值对后面不允许加逗号
    'block-spacing': ['error', 'always'],
    'brace-style': ['error', '1tbs'],
    'no-multiple-empty-lines': ['error', {
      'max': 2, // 最大连续空行 2
      'maxEOF': 1, // 文件末尾最多1行
      'maxBOF': 0 // 文件开始不允许有空行
    }],
    'eol-last': ['error', 'always'],
    'func-style': ['error', 'expression'],
    'no-multi-assign': 'error',
    'quotes': ['error', 'single'],
    'arrow-parens': ['error', 'as-needed'],
    'no-var': 'error',
    'object-shorthand': ['error', 'always'],
    'prefer-destructuring': ['error', {
      'array': false,
      'object': true
    }],
    'prefer-rest-params': 'error',
    'prefer-template': 'error',
    'symbol-description': 'error'
  }
}
