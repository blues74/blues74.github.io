const app = {
  options: {
    traceByTip: false,
    byOrder: false,
  },
  currSet: null,
  currSetInfo: null,
};

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

class MainView {
  constructor() {
    this.$toolbar = byId('toolbar');
  }

  loadWords (id) {
    let x = ALL_KEYS[id];
    // console.log(x);
    // console.log(ALL_DATA[x.i][x.j]);
    let arr = ALL_DATA[x.i][x.j].trim().split('\n');
    arr = arr.slice(1);

    app.currSet = app.options.byOrder ? arr : _.shuffle(arr);
    showSet(app.currSet);
  }

  initToolbarTop() {
    const $toolbar = this.$toolbar;
    let html = `
      <button
        id="openConfigDialog"
        type="button"
        class="btn btn-primary btn-lg mb-1"
        style="font-size: 2rem; line-height: 1; padding: .25rem;"
      >&#9881;</button>
    `;

    _.each(QUICK_LINKS, (key) => {
      html += `
        <button data-name="goToWords" type="button"
          class="btn btn-primary btn-lg mb-1"
          style="font-size: 2rem; line-height: 1; padding: .25rem;"
        >${key}</button>
      `;
    });

    $toolbar.html(html);

    dyName('goToWords', $toolbar).on('click', (e) => {
        dyName('goToWords', $toolbar)
        .removeClass('btn-success')
        .addClass('btn-primary');

        $(e.target)
        .removeClass('btn-primary')
        .addClass('btn-success');

        dyName('currentBoard').remove();
        $(e.target).after('<div data-name="currentBoard"></div>');
        this.loadWords(e.target.innerText);
    });
  }

  initConfigDialog() {
    const $configDialog = byId('configDialog');

    byId('openConfigDialog').on('click', () => {
      $configDialog.modal('show');
    })

    byId('traceByTip').on('click', (e) => {
      app.options.traceByTip = e.target.checked;
    });

    byId('byOrder').on('click', (e) => {
      app.options.byOrder = e.target.checked;
    });

    dyName('ok', $configDialog).on('click', (e) => {
      if (app.currSet) {
        showSet(app.currSet);
      }
      $configDialog.modal('hide');
    });
  }

  init() {
    this.initToolbarTop();
    this.initConfigDialog();
  }

}

let vMain;

function getButtonWithPopover(val, title, text, nio) {
  return `<h2
    data-name="word"
    data-nio="${nio}"
    class="d-inline-block bg-light"
    style="margin-bottom: .5rem; margin-right: .5rem; padding: .25rem; word-break: break-all;"
  >${val}</button>
  `;

  // return `<button
  //   type="button"
  //   data-name="word"
  //   data-nio="${nio}"
  //   class="btn btn-lg btn-outline-primary"
  //   style="margin-bottom: .5rem;"
  //   data-toggle="popover"
  //   title="${title}"
  //   data-content="${text}"
  // >${val}</button>
  // `;
}

function getWordCardDialogBody(item) {
  let arr = item.split('---').map(item => item.trim()); // .filter(item => !!item);
  const word = arr[0];
  const trn = arr[1];
  const tip  = arr[3].split(' ').shift();
  const translate = _.toLower(arr[2]);
  const phrase = arr[3];
  return `
    <h2>${word}</h2>
    <h2 style="text-align: right;">${trn}</h2>
    <div
      style="font-size: 2rem; line-height: 1.2; margin-bottom: .5rem;"
    >${translate}</div>
    <div
      style="font-size: 2rem; line-height: 1.2; padding: .125rem; word-break: break-all;"
      class="bg-warning"
    >${phrase}</div>
  `;
}

function showSet(arrSet) {
  let html = '';

  arrSet.forEach((item, i) => {
    let arr = item.split('---').map(item => item.trim()); // .filter(item => !!item);
    const word = arr[0];
    const tip  = arr[3].split(' ').shift();
    const text = arr[3] + ' --- ' + arr[2];
    let value = word;
    let title = arr[1] + ' --- ' + tip;
    if (app.options.traceByTip) {
      value = tip;
      title = word + ' --- ' + arr[1];
    }
    html += getButtonWithPopover(value, title, text, i);
  });

  dyName('currentBoard').html(html); // current_words

  dyName('word', dyName('currentBoard')).on('click', (e) => { // current_words
    const nio = parseInt($(e.target).data().nio, 10);
    const item = app.currSet[nio];

    dyName('deleteWord').unbind('click');
    dyName('deleteWord').on('click', (e) => {
      app.currSet.splice(nio, 1);
      showSet(app.currSet);
      byId('wordCardDialog').modal('hide');
    });

    dyName('wordToTheEnd').unbind('click');
    dyName('wordToTheEnd').on('click', (e) => {
      const item = app.currSet.splice(nio, 1);
      app.currSet.push(item[0]);
      showSet(app.currSet);
      byId('wordCardDialog').modal('hide');
    });

    const html = getWordCardDialogBody(item);
    dyName('wordCardDialogBody').html(html);
    byId('wordCardDialog').modal('show');
  });
}

$(document).ready(() => {
  vMain = new MainView();
  vMain.init();
});
