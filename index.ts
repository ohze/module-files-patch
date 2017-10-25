#!/usr/bin/env node

// patching types

// usage: ts-node index.ts <pkg>,[pull_request_number,]<file1>,<file2>
// ex: ts-node index.ts cropperjs,20560,index
// see npm script `prepare` in package.json
import * as http from 'https';
import * as fs from 'fs';

const GithubOrg = "ohze";

function save(url, path) {
    const ws = fs.createWriteStream(path);
    console.log(`fetching ${url}`);
    ws.on("finish", () => console.log(`saved ${path}`));
    http.get(url, res => res.pipe(ws));
}

function fetchType(pkg: string, file: string) {
    const path = `types/${pkg}/${file}.d.ts`;
    // when change types in package `pkg`, we should push to branch `pkg`
    save(`https://raw.githubusercontent.com/${GithubOrg}/DefinitelyTyped/${pkg}/${path}`,
        `./node_modules/@${path}`);
}

/**
 * @param {string} pkg package name, ex "paho-mqtt"
 * @param {string[]} files array of files that are changed/ added, ex ["index", "module"]
 */
function fetchTypes(pkg: string, files: string[]) {
    files.forEach(f => fetchType(pkg, f));
}

for (let i = 2; i < process.argv.length; i++) {
    const arg = process.argv[i];
    let [pkg, ...files] = arg.split(","); // tslint:disable-line prefer-const
    let prNum: string | number;
    if (files.length > 0 && /\d+/.test(files[0])) {
        [prNum, ...files] = files;
        prNum = parseInt(prNum, 10);
        console.log(`TODO check https://github.com/DefinitelyTyped/DefinitelyTyped/pull/${prNum}`);
    }
    fetchTypes(pkg, files);
}
