"use strict";
// patching types
Object.defineProperty(exports, "__esModule", { value: true });
// usage: ts-node index.ts <pkg>,[pull_request_number,]<file1>,<file2>
// ex: ts-node index.ts cropperjs,20560,index
// see npm script `prepare` in package.json
var http = require("https");
var fs = require("fs");
var GithubOrg = "ohze";
function save(url, path) {
    var ws = fs.createWriteStream(path);
    console.log("fetching " + url);
    ws.on("finish", function () { return console.log("saved " + path); });
    http.get(url, function (res) { return res.pipe(ws); });
}
function fetchType(pkg, file) {
    var path = "types/" + pkg + "/" + file + ".d.ts";
    // when change types in package `pkg`, we should push to branch `pkg`
    save("https://raw.githubusercontent.com/" + GithubOrg + "/DefinitelyTyped/" + pkg + "/" + path, "./node_modules/@" + path);
}
/**
 * @param {string} pkg package name, ex "paho-mqtt"
 * @param {string[]} files array of files that are changed/ added, ex ["index", "module"]
 */
function fetchTypes(pkg, files) {
    files.forEach(function (f) { return fetchType(pkg, f); });
}
for (var i = 2; i < process.argv.length; i++) {
    var arg = process.argv[i];
    var _a = arg.split(","), pkg = _a[0], files = _a.slice(1); // tslint:disable-line prefer-const
    var prNum = void 0;
    if (files.length > 0 && /\d+/.test(files[0])) {
        prNum = files[0], files = files.slice(1);
        prNum = parseInt(prNum, 10);
        console.log("TODO check https://github.com/DefinitelyTyped/DefinitelyTyped/pull/" + prNum);
    }
    fetchTypes(pkg, files);
}
