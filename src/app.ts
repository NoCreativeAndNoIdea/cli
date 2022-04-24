import createApp from '@/core';
import { installCommands } from '@/commands';
import { installPlugins } from '@/plugins';

const bootstrap = () => {
  const app = createApp();
  const { program } = app;

  installPlugins(app);
  installCommands(program);

  app.init();
};

bootstrap();