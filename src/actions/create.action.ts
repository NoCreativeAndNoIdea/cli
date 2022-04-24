import type { ICreateActionOptions } from '@/commands/create.command';
import type { IInputOptions } from '@/actions/utils/generateInput';
import { generateInput, generateSelect } from '@/actions/utils/generateInput';
import { resolve } from 'path';
import { cp } from 'shelljs';
import simpleGit from 'simple-git';
import { createActionLoading } from '@/utils/loading';
import { readFile, writeFile } from 'fs/promises';
import { log } from '@/utils/log';

export type AskInputOptions = Omit<IInputOptions, 'name'>;

interface IOptions {
  projectName: string
  projectPath: string
  dirPath: string
  template: string
}

const TEMPLATE_URL = resolve(__dirname,'../','templates');

const templateList = [
  {
    'name': '默认模板',
    'value': 'default',
    'description': '初始化git flow',
  },
  {
    'name': 'Monorepo',
    'value': 'monorepo',
    'description': ' monorepo 模板',
  },
  // {
  //   'name': 'Vue',
  //   'value': 'vue',
  //   'description': 'Vite+Typescript+Vue3全家桶项目模板',
  // },
  // {
  //   'name': 'React',
  //   'value': 'react',
  //   'description': 'Vite+Typescript+React全家桶项目模板',
  // },
];

const askForInputProjectName = async (options: AskInputOptions): Promise<string> => {
  const { projectName } = await generateInput({
    'name': 'projectName',
    'message': options.message ?? '请输入项目名称:',
    'default': options.default ?? 'no_idea',
  });
  return projectName;
};

const askForInputProjectPath = async (path?: string): Promise<string> => {
  const { projectPath } = await generateInput({
    'name': 'projectPath',
    'message': '请输入项目路径:',
    'default': path ?? process.cwd(),
  });
  return projectPath;
};

const askForListTemplate = async () => {
  const { template } = await generateSelect({
    'name': 'template',
    'message': '请选择项目模板：',
    'choices': templateList,
  });
  return template;
};

const ask = async (name?: string,path?: string): Promise<IOptions> => {
  const projectName = await askForInputProjectName({
    'default':name,
  });
  const projectPath = await askForInputProjectPath(path);
  const template = await askForListTemplate();
  const dirPath = `${projectPath}/${projectName}`;
  return {
    template,
    projectName,
    projectPath,
    dirPath,
  };
};

const updatePackageName = async (path: string,name: string) => {
  const packageJsonPath = `${path}/package.json`;
  const file = await readFile(packageJsonPath,{
    'encoding':'utf-8',
  });
  const content = file.replace('no_idea',name);
  await writeFile(packageJsonPath,content);
};


const runningFn = ({ dirPath,template,projectName }: IOptions) => {
  const sourceUrl = `${TEMPLATE_URL}/${template}`;
  return async () => {
    await cp(
      '-R',
      sourceUrl,
      dirPath,
    );
    await updatePackageName(dirPath,projectName);
  };
};


const initGit = async (path: string) => {
  const git = simpleGit(path);
  await git.init();
};

export const createAction = async (
  name: string,
  { path }: ICreateActionOptions,
) => {
  const answer = await ask(name,path);
  const spinner = await createActionLoading(runningFn(answer));
  await initGit(answer.dirPath);
  spinner.stop();
  log();
  process.exit(0);
};