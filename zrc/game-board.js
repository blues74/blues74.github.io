class GameBoard {

  constructor($vc) {
    this.$el = null;
    this.$vc = $vc;
  }

  init($el) {
    const self = this;
    this.$el = $el;
    const $vc  = this.$vc;
    const $app = this.$vc.$app;
    const $route = this.$vc.$route;

    let html = `
      <div
        style="
          display: inline-flex;
          background-color: lightblue;
          height: 48px;
        ">
        <p
          style="
            display: inline-flex;
            align-items: center;
            font-size: 2rem;
            line-height: 1.25;
            padding: 0 .5rem 0 .5rem;
            margin: 0;
          "
        ><i class="icon material-icons">settings</i></p>
      </div>
    `;

    const groupData = ALL_BY_GROUPS[$route.params.id];

    // QUICK_LINKS
    _.each(groupData.$keys, (key) => {
      html += `
        <h1 data-name="item" type="button"
          style="
            display: inline-block;
            margin: 0 .25rem .5rem 0;
            padding: .25rem;
            font-size: 2rem;
            line-height: 1.25;
            background-color: lightblue;
          "
        >${key}</h1>
      `;
    });

  /* PANEL */
    var panelVc = $app.panel.create({
      el: '.panel-right',
      on: {
        opened: function () {
          // console.log('Panel opened')
        }
      }
    });

    $app.utils.nextTick(() => {
      panelVc.open();
    }, 250);

    const panelContent = dyName('panel-right-content');
    panelContent.html(html);
    dyName('item', panelContent).on('click', (e) => {
      const id = e.target.innerText;
      this.loadWords(id);
      panelVc.close();
    });

  }

  loadWords (id) {
    let x = ALL_KEYS[id];
    let arr = ALL_DATA[x.i][x.j].trim().split('\n');
    arr = arr.slice(1);
    APP_DATA.currSet = APP_DATA.options.byOrder ? arr : _.shuffle(arr);
    this.showSet(APP_DATA.currSet);
  }

  getItemTpl(val, title, text, nio) {
    return `<h1
      data-name="item"
      style="
        display: inline-block;
        margin: 0 .25rem .5rem 0;
        padding: .25rem;
        font-size: 2rem;
        line-height: 1.25;
        background-color: lightblue;
      "
      data-nio="${nio}"
    >${val}</h1>
    `;
  }

  getDialogContent(item) {
    let arr = item.split('---').map(item => item.trim()); // .filter(item => !!item);
    const word = arr[0];
    const trn = arr[1];
    const tip  = arr[3].split(' ').shift();
    const translate = _.toLower(arr[2]);
    const phrase = arr[3];
    const style = formatStyle(`
      font-size: 2rem;
      color: #333;
      line-height: 1.2;
      padding: .125rem;
      word-break: break-all;
      margin-bottom: .5rem;
      margin-top: 0;
    `);

    return `
      <p style="${style}">${word}</p>
      <p style="${style} text-align: right;">${trn}</p>
      <p style="${style}">${translate}</p>
      <p style="${style}">${phrase}</p>
      <p class="row">
        <button
          data-name="toTheEnd"
          class="col button button-large button-raised button-fill color-red"
        >В конец</button>
        <button
          data-name="remove"
          class="col button button-large button-raised button-fill color-green"
        >Удалить</button>
      </p>
    `;
  }  

  showSet(arrSet) {
    let html = '';

    arrSet.forEach((item, i) => {
      let arr = item.split('---').map(item => item.trim()); // .filter(item => !!item);
      const word = arr[0];
      const tip  = arr[3].split(' ').shift();
      const text = arr[3] + ' --- ' + arr[2];
      let value = word;
      let title = arr[1] + ' --- ' + tip;
      if (APP_DATA.options.traceByTip) {
        value = tip;
        title = word + ' --- ' + arr[1];
      }
      html += this.getItemTpl(value, title, text, i);
    });

    html = `
      <div
        style="display: inline-flex; background-color: lightblue; height: 48px;"
        data-name="settings"
      >
        <p
          style="
            display: inline-flex;
            align-items: center;
            font-size: 2rem;
            line-height: 1.25;
            padding: 0 .5rem 0 .5rem;
            margin: 0;
          "
        ><i class="icon material-icons">settings</i></p>
      </div>
    ` + html;

    this.$el.html(html);

  /* item click action */
    dyName('item', this.$el).on('click', (e) => {
      const nio = parseInt($(e.target).data('nio'), 10);
      const item = APP_DATA.currSet[nio];
      let html = this.getDialogContent(item);

    /* create/open dialog */
      var dialogVc = this.$vc.$app.dialog.create({
        // text: 'Hello World',
        cssClass: 'super',
        content: html,
        closeByBackdropClick: true,
        on: {
          opened: function () {
            // console.log('Dialog opened');
          }
        }
      });
      dialogVc.open();

    /* remove item action */
      dyName('remove', dialogVc.$el).on('click', (e) => {
        APP_DATA.currSet.splice(nio, 1);
        this.showSet(APP_DATA.currSet);
        dialogVc.close();
      });

    /* toTheEnd action */
      dyName('toTheEnd', dialogVc.$el).on('click', (e) => {
        const item = APP_DATA.currSet.splice(nio, 1);
        APP_DATA.currSet.push(item[0]);
        this.showSet(APP_DATA.currSet);
        dialogVc.close();
      });
    });
  }
}
