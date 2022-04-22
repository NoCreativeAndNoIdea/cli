import { config } from 'dotenv';

export default {
  install(){
    config();
  },
};

export const getEnv = (key: string) => process.env[key];
export const isDev = (): boolean => getEnv('NODE_MODE') === 'development';