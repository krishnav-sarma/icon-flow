import chalk from "chalk";

export const log = {
  success: (msg: string) =>
    console.log(
      chalk.green(`✔ ${msg}`)
    ),

  error: (msg: string) =>
    console.log(
      chalk.red(`✖ ${msg}`)
    ),

  info: (msg: string) =>
    console.log(
      chalk.cyan(msg)
    ),
};