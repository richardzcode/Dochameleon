/** Dochameleon File System */

const fs = require('fs-extra');
const glob = require('glob');
const path = require('path');

function files(pattern, ext) {
  return glob.sync(pattern, { dot: true })
    .filter(file => {
      if (fs.lstatSync(file).isDirectory()) { return false; }
      if (!ext) { return true; }
      const file_ext = path.extname(file);
      if (typeof ext === 'string') { return ext === file_ext; }
      return ext.includes(file_ext);
    });
}

function exists(file) {
  return fs.existsSync(file);
}

function read(file) {
  if (!fs.existsSync(file)) { return ''; }

  return fs.readFileSync(file, { encoding: 'utf8' });
}

function remove(file) {
  fs.removeSync(file);
}

function write(file, content) {
  fs.mkdirsSync(file.replace(new RegExp('/[^/]*$'), ''));
  fs.writeFileSync(file, content);
}

function copy(src, dest) {
  fs.mkdirsSync(dest.replace(new RegExp('/[^/]*$'), ''));
  fs.copySync(src, dest);
}

module.exports = {
  files,
  exists,
  read,
  remove,
  write,
  copy
}
