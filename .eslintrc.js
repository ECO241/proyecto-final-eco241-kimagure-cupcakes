//hay q arreglar esta mrd porque wtf 💀

module.exports = {
    env: {
      browser: true,
      commonjs: true
    },
    extends: 'airbnb-base',
    overrides: [
      {
        env: {
          node: true,
        },
        files: ['.eslintrc.{js,cjs}'],
        parserOptions: {
          sourceType: 'script',
        },
      },
    ],
    parserOptions: {
      ecmaVersion: 'latest',
    },
    rules: {},
  };