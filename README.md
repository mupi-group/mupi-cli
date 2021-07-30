<p align="center">
<img width="20%" src="https://raw.githubusercontent.com/mupi-group/mupi-cli/main/homepage/logo-with-text.svg" alt="mupi logo"/>
</p>

<p align="center">
A serverless solution that init, develop, deploy your code as micro service/frontend from a single dto model.
</p>

<p align="center">
<a href="https://www.npmjs.com/~mupijs"><img src="https://img.shields.io/npm/v/@mupi/cli.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~mupijs"><img src="https://img.shields.io/npm/l/@mupi/cli.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~mupijs"><img src="https://img.shields.io/npm/dm/@mupi/cli.svg" alt="NPM Downloads" /></a>
<a href="https://github.com/mupi-group/mupi-cli/actions"><img src="https://github.com/mupi-group/mupi-cli/actions/workflows/npm-publish.yml/badge.svg" alt="NPM Downloads" /></a>
</p>

## Installation
```shell
$ yarn install -g @mupi/cli
```

## Description

The `mupi` is a solution to simplify some code initializing steps, 
and make you easy to deploy your code in a serverless way. 
You can create an application, create the dto model, 
generate the model to the code as a graphql server, 
deploy your code to the cloud in few steps by CLI commands. (for now only support AWS).

The detailed docs will be added in the future, and if you want to collaborate with me together, please contact me: `liwuzhao.kuku@gmail.com`

## Prerequisite

- Setup `aws cli` with an valid account (or get your AWS secret key and provide it to mupi)
- Install the latest version `Terraform` [Download Link 🐶](https://www.terraform.io/)
- Make sure you're using node.js 14.x version

## Usage

Check all usages of mupi by the command: `mupi -h`.

I'll show you how to create and deploy a todolist app to the cloud.

1. create the mupi application
```shell
cd ~/Desktop && mkdir mupi-projects
mupi new todolist
```
2. go into the todolist workspace, then create the todo model
```shell
cd todolist
mupi create:model todo
```

3. edit your todo model, add your customized property
```typescript
/* model/todo.model */
import { Title, Description, ID } from '@mupi/core';

@Title({
  title: 'todo management',
  subtitle: 'manage your todolist here',
})
export default class TodoModel {
  @ID()
  @Description('ID')
  id: string;

  @Description('todo name')
  name: string;

  @Description('define the description of todo')
  description: string;

  @Description('the status for todo')
  status: number;
}
```

4. generate apollo server backend code
```shell
mupi generate:backend todo
```

5. edit your serverless code or build it directly
```shell
cd src/backend/todo && npm run build
cd -
```

6. init your infrastructures by terraform
```shell
mupi init
```

7. deploy your infrastructures
```shell
mupi deploy
```

8. destroy your infrastructures
```shell
mupi destroy
```

## Would like to do in the future

- more decorators like: `@Upload`, `@List`, `@Relating`
- more service supporting: `aliyun` / `Azure` / `Tencent Cloud`
- generating the CMS frontend code in micro-frontend way

## Contribution

Contact: `liwuzhao.kuku@gmail.com`

Wechat ID: `ohkuku`
