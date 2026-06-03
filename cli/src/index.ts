#!/usr/bin/env node

import { Command } from "commander";
import { addIcon } from "./commands/add";

const program = new Command();

program
  .name("krishnav-icons")
  .description("Animated icon registry");

program
  .command("add")
  .argument("<icon>")
  .action(addIcon);

program.parse();