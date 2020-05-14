const app = {
  options: {
    traceByTip: false
  },
  currSet: null,
};

const options = {
    traceByTip: false
}

function byId (id) {
  return $(`#${id}`);
}

function byName(name, $el) {
    if ($el)
      return $el.find(`[data-name="${name}"]`);

    return $(`[data-name="${name}"]`);
}

function getButtonWithPopover(val, title, text, nio) {
  return `<button
    type="button"
    data-name="word"
    data-nio="${nio}"
    class="btn btn-lg btn-outline-primary"
    style="margin-bottom: .5rem;"
    data-toggle="popover"
    title="${title}"
    data-content="${text}"
  >${val}</button>
  `;
}

function getWordDialogBody(item) {
  let arr = item.split('---').map(item => item.trim()).filter(item => !!item);
  const word = arr[0];
  const trn = arr[1];
  const tip  = arr[3].split(' ').shift();
  const translate = arr[2];
  const phrase = arr[3];
  return `
    <h3>${word}</h3>
    <h3 style="text-align: right;">${trn}</h3>
    <div style="font-size: 1.5rem;">${translate}</div>
    <div style="font-size: 1.5rem; padding: .125rem;" class="bg-warning">${phrase}</div>
  `;
}

function showSet(arrSet) {
  let html = '';

  arrSet.forEach((item, i) => {
    let arr = item.split('---').map(item => item.trim()).filter(item => !!item);
    const word = arr[0];
    const tip  = arr[3].split(' ').shift();
    const text = arr[3] + ' --- ' + arr[2];
    let value = word;
    let title = arr[1] + ' --- ' + tip;
    if (options.traceByTip) {
      value = tip;
      title = word + ' --- ' + arr[1];
    }
    html += getButtonWithPopover(value, title, text, i);
  });

  byId('current_words').html(html);

  //byName('word', byId('current_words')).popover({
  //  container: 'body',
  //  trigger: 'focus'
  //});

  byName('word', byId('current_words')).on('click', (e) => {
    const nio = parseInt($(e.target).data().nio, 10);
    const item = app.currSet[nio];

    byName('deleteWord').unbind('click');
    byName('deleteWord').on('click', (e) => {
      app.currSet.splice(nio, 1);
      showSet(app.currSet);
      byId('wordDialog').modal('hide');
    });

    byName('wordToTheEnd').unbind('click');
    byName('wordToTheEnd').on('click', (e) => {
      const item = app.currSet.splice(nio, 1);
      app.currSet.push(item[0]);
      showSet(app.currSet);
      byId('wordDialog').modal('hide');
    });

    const html = getWordDialogBody(item);
    byName('wordDialogBody').html(html);
    byId('wordDialog').modal('show');
  });
}

function loadWords (id) {
  let arr = wordsAll[id].trim().split('\n');
  app.currSet = _.shuffle(arr);
  showSet(app.currSet);
}

function initView () {
  byId('traceByTip').on('click', (e) => {
    options.traceByTip = e.target.checked;
  });

  byName('goToWords', byId('toolbar')).on('click', (e) => {
    loadWords(e.target.innerText);
  });

  byId('showModal').on('click', () => {
    byName('wordDialogBody').html('hello');
    byId('wordDialog').modal('show');
  });

  //byId('wordDialog').on('show.bs.modal', (e) => {
  //  console.log('show', e);
  //});
}

$(document).ready(() => {
    initView();
});
