import type { CommandFn } from '@/commands';
import { createAction } from '@/actions/create.action';

export interface ICreateActionOptions{
  path?: string
}

export const createCommand: CommandFn = program => {
  program
    .command('create [project-name]')
    .alias('c')
    .description('create a new project according to you select template')
    .option('--path [path]','Specify the destination path')
    .action(createAction);
};