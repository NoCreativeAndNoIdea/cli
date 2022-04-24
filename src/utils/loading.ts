import ora from 'ora';

export const createLoading = async (message: string) => ora(message).start();

export const createActionLoading = async (fn: () => void,message?: string) => {
  const spinner = await createLoading(message ?? 'loading...');
  await fn();
  return spinner;
};