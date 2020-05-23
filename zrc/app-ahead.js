const ALL_DATA = [];
const ALL_KEYS = {};
const QUICK_LINKS = [];
const ALL_BY_GROUPS = {};

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



// https://blog.logrocket.com/const-assertions-are-the-killer-new-typescript-feature-b73451f35802/
