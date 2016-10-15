const buildModeOptions = [
  'webapp_use_vendorjs',
  'webapp_use_external_script',
  'umd_libs_use_external_script',
];
const specificConfig = {
  useCssModules: true,
  useSourceMapInProd: true,
  buildMode: buildModeOptions[1],
  extractResourcePublicPath: './assets',
};

module.exports = specificConfig;
