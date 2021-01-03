#!/usr/bin/env node
import * as yargs from 'yargs';

(yargs)(process.argv.slice(2))
  .commandDir('./generators', {
    extensions: ['ts']
  })
  .commandDir('./commands', {
    extensions: ['ts']
  })
  .commandDir('./commands/db', {
    extensions: ['ts']
  })
  .commandDir('../server/database/seeds', {
    extensions: ['ts']
  })
  .version(false)
  .argv