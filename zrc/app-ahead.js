let tmp;
const ALL_DATA = [];
const ALL_KEYS = {};
const QUICK_LINKS = [];
const ALL_BY_GROUPS = {};

let APP_DATA = getEmptyAppData();
let STAT = {};

const TEXTS = {
  akita: [],
  basicMath: [],
  digits: [],
  rus: [],
  words: [],
  wraith: [],
  multiplication_table: [],
}

try {
  if (Dom7) {
      window.$ = Dom7;
  }
} catch(e){}

// Create custom events bus
// const bus = new Framework7.Events();
// bus.on('some-event', function (e) {
//   console.log('some-event', arguments);
// });

function byId (id, $el) {
  if ($el)
    return $el.find(`[id="${id}"]`);

  return $(`#${id}`);
}

function byName(name, $el) {
    if ($el)
      return $el.find(`[name="${name}"]`);

    return $(`[name="${name}"]`);
}

function dyName(name, $el) {
    if ($el)
      return $el.find(`[data-name="${name}"]`);

    return $(`[data-name="${name}"]`);
}

function formatStyle(str) {
  str = str || '';
  return str.split('\n').map(line => line.trim()).filter(line => !!line).join(' ');
}

function localStorageSaveItem(key, val) {
  try{
    localStorage.setItem(key, JSON.stringify(val));
  } catch(e) {}
}

function localStorageGetItem(key) {
  try {
    let data = localStorage.getItem(key);
    return JSON.parse(data);
  } catch(e) {
    return null;
  }
}

function getEmptyAppData() {
  return {
    currSet: null,
    currMeta: null,
    options: {
      showWordsByOrder: false,
      showExamplesByOrder: true,
      showByTip: false,
    }
  };
}

function saveAppData() {
  localStorageSaveItem('APP_DATA', APP_DATA);
}

function getAppData() {
  APP_DATA = localStorageGetItem('APP_DATA') || getEmptyAppData();
}

function saveStat() {
  // if (typeof STAT === 'object') {
  //   _.each(STAT, (i, key) => {
  //     console.log(key);
  //     if (key !== 'words') {
  //       delete STAT[key];
  //     }
  //   })
  // }

  localStorageSaveItem('STAT', STAT);
}

function getStat() {
  STAT = localStorageGetItem('STAT') || {};
}

getAppData();
getStat();

console.log('APP_DATA', APP_DATA);
console.log('STAT', STAT);

function getMetadata(meta) {
  meta = meta.trim()
    .split(']')
    .map(item => item.trim())
    .map(item => item.replace(/^\[/, ''));

    return {
      page: meta[1],
      group: meta[0]
    }
}

// https://blog.logrocket.com/const-assertions-are-the-killer-new-typescript-feature-b73451f35802/
