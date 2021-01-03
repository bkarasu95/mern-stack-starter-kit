#!/usr/bin/env node

const dotenv = require("dotenv");
const MongoClient = require("mongodb").MongoClient;
dotenv.config();

const {
  exec
} = require('child_process');
const arguments = process.argv.slice(2); // remove the first 2 argument, these are our prefix "node cli"
let argumentAsString = '';
for (index in arguments) {
  argumentAsString += " " + arguments[index] // transform the arguments as string for passing cli
}

exec('npx ts-node ./src/cli/cli.ts' + argumentAsString, (error, stdout, stderr) => { // execute the our main command handler file
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(stdout);
  try {
    log = {
      endpoint: argumentAsString,
      type: 'cli',
      message: "Command executed",
      log: {
        output: stdout
      },
      status: "success"
    }
    dbLog(log);
  } catch (e) {
    console.log(e);
  }
  if (stderr != '') {
    console.error(`stderr: ${stderr}`);
  }
});

function dbLog(log) {
  var url = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/`;
  MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, function (err, db) {
    if (err) {
      throw err;
    }
    dbo = db.db(process.env.DB_DATABASE);
    dbo.collection("logs").insertOne(log, function (err) {
      if (err) throw err;
      db.close();
    });
  });
}