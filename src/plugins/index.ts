import type { App } from '@/core/types';
import dotenv from './dotenv';

export const installPlugins = (app: App) => {
  app.use(dotenv);
};