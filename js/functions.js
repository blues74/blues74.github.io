var $$ = Dom7;

// Create custom events bus
const bus = new Framework7.Events();
// bus.on('some-event', function (e) {
//   console.log('some-event', arguments);
// });

function byId (id, $el) {
  if ($el)
    return $el.find(`[id="${id}"]`);

  return $$(`#${id}`);
}

function byName(name, $el) {
    if ($el)
      return $el.find(`[name="${name}"]`);

    return $$(`[name="${name}"]`);
}

function dyName(name, $el) {
    if ($el)
      return $el.find(`[data-name="${name}"]`);

    return $$(`[data-name="${name}"]`);
}