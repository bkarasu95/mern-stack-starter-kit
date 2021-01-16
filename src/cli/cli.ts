#!/usr/bin/env node
import * as yargs from 'yargs';

(yargs)(process.argv.slice(2))
  .commandDir('./generators', {
    extensions: ['ts'] // adding ts file read support
  })
  .commandDir('./commands', {
    extensions: ['ts'] // adding ts file read support
  })
  .commandDir('./commands/db', {
    extensions: ['ts'] // adding ts file read support
  })
  .commandDir('../server/database/seeds', {
    extensions: ['ts'] // adding ts file read support
  })
  .version(false)
  .argv