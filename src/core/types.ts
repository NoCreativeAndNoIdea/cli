import type { Command } from 'commander';

export type Fn<T,R> = (props: T) => R;
export type FnVoid = () => void;

export type Program = Command;
export interface UseOptions {
  install(app: App): void
}
export interface App{
  program: Program
  init: FnVoid
  use: (options: UseOptions) => void
}