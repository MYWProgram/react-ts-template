module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-rational-order',
    // ! 解决 stylelint 和 Prettier 的规范冲突，放在最后。
    'stylelint-config-prettier'
  ],
  plugins: ['stylelint-order', 'stylelint-declaration-block-no-ignored-properties', 'stylelint-scss'],
  rules: {
    'plugin/declaration-block-no-ignored-properties': true,
    'comment-empty-line-before': null,
    'declaration-empty-line-before': null,
    'function-name-case': 'lower',
    'no-descending-specificity': null,
    'no-invalid-double-slash-comments': null,
    'rule-empty-line-before': 'never',
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global']
      }
    ]
  },
  ignoreFiles: ['node_modules/**/*', 'build/**/*', 'dist/**/*']
};
