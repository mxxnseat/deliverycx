const ts = require("typescript");

const formatHost = {
    getCanonicalFileName: path => path,
    getCurrentDirectory: ts.sys.getCurrentDirectory,
    getNewLine: () => ts.sys.newLine,
  };
  
  function getTSConfig() {
    const configPath = ts.findConfigFile('./', ts.sys.fileExists, 'tsconfig.json');
    const readConfigFileResult = ts.readConfigFile(configPath, ts.sys.readFile);
    if (readConfigFileResult.error) {
      throw new Error(ts.formatDiagnostic(readConfigFileResult.error, formatHost));
    }
    const jsonConfig = readConfigFileResult.config;
    const convertResult = ts.convertCompilerOptionsFromJson(jsonConfig.compilerOptions, './');
    if (convertResult.errors && convertResult.errors.length > 0) {
      throw new Error(ts.formatDiagnostics(convertResult.errors, formatHost));
    }
    const compilerOptions = convertResult.options;

    console.log(compilerOptions);
    return compilerOptions;
  }

function compile() {
  const compilerOptions = getTSConfig();
  const program = ts.createProgram(['./src/index.ts'], compilerOptions);
  const emitResult = program.emit();

  console.log(emitResult);
}

compile();