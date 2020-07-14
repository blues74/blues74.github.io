const Fs   = require('fs');
const Path = require('path');

// console.log(Path.resolve('../acct/apps'));

const path = Path.resolve('../acct/apps/accounting/src/modules/requisites');

const report = {
  fileHtml: 0,
  fileTs: 0,
  fileLess: 0,

  fileHtmlRows: 0,
  fileTsRows: 0,
  fileLessRows: 0,

  fileHtmlChars: 0,
  fileTsChars: 0,
  fileLessChars: 0,

  totalRows: 0,
  totalChars: 0,
  totalFiles: 0,
}

function readFileSync(fname) {
    const fhnd   = Fs.openSync(fname, 'r');
    const result = Fs.readFileSync(fhnd, 'utf8');
    Fs.closeSync(fhnd);
    return result;
}


function addStat(file) {
  console.log(file);

  const extName = Path.extname(file);
  const text = readFileSync(file);
  rows = text.split(/\r/);

  if (extName === '.ts') {
    if (Path.basename(file) === 'index.ts') return;

    report.fileTsChars = report.fileTsChars + text.length;
    report.fileTsRows = report.fileTsRows + rows.length;
    report.fileTs++;

  }

  if (extName === '.html') {
    report.fileHtmlChars = report.fileHtmlChars + text.length;
    report.fileHtmlRows  = report.fileHtmlRows  + rows.length;
    report.fileHtml++;
  }

  if (extName === '.less') {
    report.fileLessChars = report.fileLessChars + text.length;
    report.fileLessRows  = report.fileLessRows  + rows.length;
    report.fileLess++;
  }

  report.totalFiles++;
  report.totalChars = report.totalChars + text.length;
  report.totalRows = report.totalRows   + rows.length;
  //console.log(Path.extname(file));
  // filename:  Path.basename(file, Path.extname(file)),
  // dirname:   Path.dirname(file),
  // extname:   Path.extname(file),
  // lastdir:   Path.dirname(file).split('/').pop(),
  // middledir: Path.dirname(file).split(rootDir).pop(),

}

function getDirStat(path) {
  Fs.readdirSync(path).forEach(function(file, index){
    let subPath = Path.resolve(path, file);
    if (!Fs.lstatSync(subPath).isDirectory()) {
      addStat(subPath);
    } else {
      getDirStat(subPath);
    }
  });
}


Fs.readdirSync(path).forEach(function(file, index){
  let subPath = Path.resolve(path, file);
  if (!Fs.lstatSync(subPath).isDirectory()) {
    addStat(subPath);
  } else {
    getDirStat(subPath);
  }
  //if (!Fs.lstatSync(file).isDirectory()) { // if (Fs.lstatSync(path).isSymbolicLink()) Fs.unlinkSync(path)

    //console.log(path, file, subPath);
    //  Fs.unlinkSync(path);
    //  return true;
  //}
    // let curPath = path + '/' + file;
    // delDirOrFile(curPath);
});

console.log(report);
console.log(report.totalRows/report.totalFiles);
console.log(report.fileTsRows/report.fileTs);











const SKIP = 0;
const NULL = 1;
const UNDEFINED = 2;
const BOOLEAN = 3;
const NUMBER = 4;
const STRING = 5;
const DATE = 6;
const OBJECT = 7;
const ARRAY = 8;

function getJSType(val) {
  // типы данных JS
  // null undefined - boolean number string - date object array
  let type = Object.prototype.toString.call(val);
  switch (type) {
    case '[object Null]':
      return NULL;
    case '[object Undefined]':
      return UNDEFINED;
    case '[object Boolean]':
      return BOOLEAN;
    case '[object Number]':
      return NUMBER;
    case '[object String]':
      return STRING;
    case '[object Date]':
      return DATE;
    case '[object Object]':
      return OBJECT;
    case '[object Array]':
      return ARRAY;
    default:
      return SKIP;
    // case '[object Error]':
    //    return 'error';
    // case '[object Function]':
    //    return 'function';
    // default:
    //   return typeof val;
  }
}

function eq(a, b) {
  return a === b || (a !== a && b !== b)
}


function isEqual(a, b) {
  const MAX_COUNT = 100000;
  let count = 0;

  if (eq(a, b)) {
    return true;
  }

  refA = [];
  refB = [];

  const isEqualInner = (a, b) => {
    count++;

    if (eq(a, b)) {
      return true;
    }

    const typeA = getJSType(a);
    const typeB = getJSType(b);

    if (typeA !== typeB) {
      return false;
    }

    // значения которые не хотим сравнивать считаем равными
    if (!typeA) {
      return true;
    }

    if (typeA === ARRAY) {
      return isEqualArray(a, b);
    }

    if (typeA === OBJECT) {
      return isEqualObject(a, b);
    }

    return isEqualPlain(a, b);
  }

  const isEqualPlain = (a, b) => {
    if (eq(a, b)) {
      return true;
    }

    return false;
  }

  const isEqualArray = (a, b) => {
    if (a.length !== b.length) {
      return false;
    }

    if (refA.includes(a) || refB.includes(b)) {
      console.warn('Object can content circular reference');

      return null;
    }

    refA.push(a);
    refB.push(b);

    for (let i = 0; i < a.length; i++) {
      if (!isEqualInner(a[i], b[i])) {
        return false;
      }
    }

    refA.pop();
    refB.pop();

    return true;
  }

  const isEqualObject = (a, b) => {
    if (refA.includes(a) || refB.includes(b)) {
      console.warn('Object can content circular reference');

      return null;
    }

    refA.push(a);
    refB.push(b);

    keysA = Object.keys(a);
    keysB = Object.keys(b);
    keysB.forEach(key => {
      if (!keysA.includes(key)) {
        keysA.push(key);
      }
    });

    for (let key of keysA) {
      if (!isEqualInner(a[key], b[key])) {
        return false;
      }
    }

    refA.pop();
    refB.pop();

    return true;
  }

  const result = isEqualInner(a, b);

  console.log(count, refA);

  return result;
}

a = {
  a: 'a',
  b: 'b',
  c: 'c',
  d: 'd',
  e: 'e',
};

b = {
  a: 'a',
  b: 'b',
  c: 'c',
  d: 'd',
  e: 'e',
  f: undefined,
};

a.a = a;
b.a = b;

const arr_aa = [a, a, a, a];
const arr_bb = [b, b, b, b];

const arrA = [{a: 1, arr: arr_bb}, {b: 2, arr: arr_aa}, 'hello', arr_aa];
const arrB = [{a: 1, arr: arr_bb}, {b: 2, arr: arr_bb}, 'hello', arr_bb];

console.log(isEqual(arrA, arrB));

//console.log(isEqual(a, b));
// console.log(getJSType(new Error('hello')));
