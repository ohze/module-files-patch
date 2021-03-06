# module-files-patch

fetch some files from your fork of some packages then overwrite the original files in node_modules

### install
```bash
npm i -D module-files-patch
```

### usage
Example:
Your need change some typescript definition types for package angular,
then you fork [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) & change file `jqlite.d.ts`

You should create a PR to DefinitelyTyped.
But before the PR is merged, you can use this package to download your changed files & overwrite the original files by
adding npm `postinstall` script to your `package.json`, ex:
```json
{
  "scripts": {
    "postinstall": "module-files-patch rangy,34066,lib/rangy-classapplier,%rangy-classapplier angular,index,jqlite"
  }
}
```

Here:
+ `rangy`, `angular` is the packages.
+ `20560` (optional) is the [PR number](https://github.com/DefinitelyTyped/DefinitelyTyped/pull/20560)
+ `lib/rangy-classapplier`, `index`, `jqlite` is files in the package that will be fetched.
    The following files will be fetch (from your fork) & overwrite:
    + `node_modules/@types/rangy/lib/rangy-classapplier.d.ts`
    + `node_modules/@types/angular/{index, jqlite}`
+ `%rangy-classapplier` (start with `%`) indicate the file will be deleted:
    + `node_modules/@types/rangy/rangy-classapplier.d.ts`
