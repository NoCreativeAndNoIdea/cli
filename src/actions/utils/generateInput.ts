import type { ChoiceCollection, PromptModule } from 'inquirer';
import { createPromptModule } from 'inquirer';

export interface IOption{
  message?: string
  name: string
}

export interface IInputOptions extends IOption{
  default?: string
}

export interface IListOptions extends IOption{
  choices: ChoiceCollection
}

export type Answer = Promise<Record<string, string>>;

export const generatePrompt = (): PromptModule => createPromptModule();
export const generateInput = (options: IInputOptions): Answer => {
  const prompt = generatePrompt();
  return prompt({
    'type': 'input',
    ...options,
  });
};

export const generateSelect = (options: IListOptions): Answer => generatePrompt()({
  'type': 'list',
  ...options,
});