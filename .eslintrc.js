module.exports = {
  // 此项是用来配置标准的js风格，就是说写代码的时候要规范的写
  extends: ['eslint:recommended', 'plugin:react/recommended', 'prettier'],
  // ecma 支持
  ecmaFeatures: {
    jsx: true, //Enable JSX support
    modules: true //Enable ES6 modules support
  },
  //此项指定环境的全局变量
  env: {
    browser: true,
    node: true,
    es6: true
  },
  //此项是用来指定eslint解析器的，解析器必须符合规则，babel-eslint解析器是对babel解析器的包装使其与ESLint解析
  parser: 'babel-eslint',
  // 规则配置
  rules: {
    strict: 0,
    'valid-jsdoc': 2,
    'react/jsx-uses-react': 2,
    'react/jsx-uses-vars': 2,
    'react/react-in-jsx-scope': 2,
    'no-console': 'off',
    semi: 0,
    // 如果在项目中文件名后缀是 .js 而不是 .jsx 避免报错
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    // props validation 错误
    'react/prop-types': 0,
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
        flatTernaryExpressions: true
      }
    ],
    // @fixable jsx 的 children 缩进必须为两个空格
    'react/jsx-indent': ['error', 2],
    // @fixable jsx 的 props 缩进必须为两个空格
    'react/jsx-indent-props': ['error', 2]
  },
  // 此项是用来提供插件的，
  plugins: ['react', 'jsx-a11y', 'import', 'prettier']
}
