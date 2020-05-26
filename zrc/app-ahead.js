const ALL_DATA = [];
const ALL_KEYS = {};
const QUICK_LINKS = [];
const ALL_BY_GROUPS = {};
let APP_DATA = {
  currSet: null,
  currMeta: null,
  options: {
    showByOrder: false,
    showByTip: false,
  },
};

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

function saveAppData() {
  try{
    localStorage.setItem('APP_DATA', JSON.stringify(APP_DATA));
  } catch(e) {}
}

function getAppData() {
  try {
    let appData = localStorage.getItem('APP_DATA');
    appData = JSON.parse(appData);
    if (appData && typeof appData === 'object' ) {
        APP_DATA = appData;
    }

    // console.log('APP_DATa', APP_DATA);

  } catch(e) {}
}

getAppData();

// https://blog.logrocket.com/const-assertions-are-the-killer-new-typescript-feature-b73451f35802/
