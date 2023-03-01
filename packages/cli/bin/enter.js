#! /usr/bin/env node
// 为了方便测试
import { program } from 'commander'
import init from "../lib/init.js";
program.command("create <path> <name>").description("init project").action(init);

program.parse(process.argv);