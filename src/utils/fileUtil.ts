import { existsSync } from 'fs';
import { mkdir, readdir } from 'fs/promises';

export const hasDir = async (path: string) => existsSync(path);

export const isEmptyDir = async (path: string) => {
  if(await hasDir(path)){
    const dir = await readdir(path);
    return !dir.length;
  }
  return false;
};

export const createDirectory = async (path: string) => {
  const canCreate = !await hasDir(path);
  if(canCreate){
    await mkdir(path);
    return true;
  }
  return false;
};