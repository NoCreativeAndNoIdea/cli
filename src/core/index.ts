import type { App, Program } from '@/core/types';
import { createCommand } from 'commander';
import packageJson from '../../package.json';
import { use } from '@/core/use';


const init = (program: Program) => (): void => {
  program.parse(process.argv);
  if (!program.args?.length) {
    program.outputHelp();
  }
};

const createApp = (): App => {
  const app: Partial<App> = {};
  const program = createCommand();

  program.version(
    packageJson.version,
    '-v --version',
    'Output the current version',
  );

  app.program = program;
  app.init = init(program);
  app.use = use(app as App);
  return app as App;
};

export default createApp;