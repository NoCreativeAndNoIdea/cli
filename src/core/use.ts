import type { App,UseOptions } from '@/core/types';

export const use = (app: App) => (options: UseOptions) => {
  options.install(app);
};