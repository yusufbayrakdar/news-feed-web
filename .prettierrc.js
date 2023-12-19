module.exports = {
  bracketSpacing: false,
  jsxBracketSameLine: true,
  singleQuote: false,
  trailingComma: "none",
  printWidth: 120,
  importOrder: [
    "^react.*$",
    "<THIRD_PARTY_MODULES>",
    ".*\\/services\\/.*",
    ".*\\/redux\\/.*",
    ".*\\/Providers\\/.*",
    ".*\\/screens\\/.*",
    ".*\\/components\\/.*",
    ".*\\/hooks\\/.*",
    ".*\\/utils.*",
    ".*\\/assets\\/.*",
    ".*\\/styles.*",
    "^[./]"
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: [require.resolve("@trivago/prettier-plugin-sort-imports")]
};
