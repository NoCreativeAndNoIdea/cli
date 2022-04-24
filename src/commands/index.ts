import type { Program } from '@/core/types';
import { createCommand } from '@/commands/create.command';
export type CommandFn = (program: Program) => void;
export const installCommands = (program: Program) => {
  createCommand(program);
};