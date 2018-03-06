#!/usr/bin/env node

const fs = require('fs');
const moment = require('moment');
const program = require('commander');

program
    .parse(process.argv);

if (process.argv.length < 3) {
    console.log('Please enter the title of the article.');
    process.exit(1);
}

fs.exists('src/pages/articles/', (exists) => {
    if (!exists) {
        console.log('Please run the command under the blog root directory');
        process.exit(1);
    }
});

const dirName = process.argv[2];
const currentDate = moment().format();

const dir = `src/pages/articles/${currentDate.slice(0,10)}---${dirName}`;
fs.mkdir(dir, (err) => {
    if (err) {
        console.log(`The article ${dirName} already exits.`);
        process.exit(1);
    }
});

const title = dirName.split('-');

fs.writeFile(`${dir}/index.md`,
    `---\ntitle: "${title.join(' ')}"\ndate: "${currentDate.slice(0,10)}"\nlayout: post\ndraft: false\npath: "/posts/"\ncategory: ""\ntags:\n  - \ndescription: ""\n---`, (err) => {
        if (err) throw err;
    })