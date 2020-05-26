class GameBoard {

  constructor($vc) {
    this.$el = null;
    this.$vc = $vc;
  }

  init($el) {
    this.initContentsList($el);
  }

  getIconContent(light) {
    const bgColor = light ? '#ddd' : '#222';
    const color = light ? '#222' : '#ddd';

    return `
      <div
        data-name="settings"
        style="
          display: inline-flex;
          background-color: ${bgColor};
          height: 48px;
          width: 48px;
          justify-content: center;
          margin: 0 .25rem .5rem 0;
        ">
        <p
          style="
            display: inline-flex;
            align-items: center;
            font-size: 2rem;
            line-height: 1.25;
            padding: 0 .5rem 0 .5rem;
            margin: 0;
            color: ${color};
          "
        ><i class="icon material-icons">settings</i></p>
      </div>
  `;
  }

  initContentsList($el) {
    const self = this;
    this.$el = $el;
    const $app = this.$vc.$app;
    const $route = this.$vc.$route;
    const groupData = ALL_BY_GROUPS[$route.params.id];
    let html = this.getIconContent();

    // QUICK_LINKS
    _.each(groupData.$keys, (key) => {
      html += `
        <p
          data-name="item"
          style="
            display: inline-block;
            margin: 0 .25rem .5rem 0;
            padding: .25rem;
            font-size: 2rem;
            line-height: 1.25;
            background-color: #222;
            color: white;
            min-width: 2.5rem;
          "
        >${key}</p>
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
      dyName('item', panelContent).removeClass('text-color-orange');
      $(e.target).addClass('text-color-orange');
      panelVc.close();
    });


  }

  loadWords (id) {
    let x = ALL_KEYS[id];
    let arr = ALL_DATA[x.i][x.j].trim().split('\n');
    let meta = arr[0].trim();

    arr = arr.slice(1);
    APP_DATA.currSet = APP_DATA.options.showByOrder ? arr : _.shuffle(arr);
    APP_DATA.currMeta = meta;

    // console.log(/ consonant_sounds/.test(meta), meta);

    this.showSet(APP_DATA.currSet);
  }

  getItemTpl(val, nio) {
    return `<p
      data-name="item"
      style="
        display: inline-block;
        margin: 0 .25rem .5rem 0;
        padding: .25rem;
        font-size: 2rem;
        line-height: 1.25;
        background-color: #ddd;
        min-width: 2.5rem;
        text-align: center;
      "
      data-nio="${nio}"
    >${val}</p>
    `;
  }

  getItemCardContent(item) {
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
      <p style="${style}">${trn}</p>
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
    let html = this.getIconContent(true);

    arrSet.forEach((item, i) => {
      let arr = item.split('---').map(item => item.trim()); // .filter(item => !!item);
      const last = arr.length - 1;

      let val = arr[0];
      let tip  = arr[last];
      if (APP_DATA.options.showByTip) {
        val = tip;
      }
      html += this.getItemTpl(val, i);
    });

    this.$el.html(html);

  /* item click action */
    dyName('item', this.$el).on('click', (e) => {
      const nio = parseInt($(e.target).data('nio'), 10);
      const item = APP_DATA.currSet[nio];
      let html = this.getItemCardContent(item);

      dyName('itemCard', this.$el).remove();
      let itemCard = $(document.createElement('div')).html(html);
      itemCard.attr('data-name', 'itemCard');
      $(itemCard).insertAfter(e.target);

    /* create/open dialog */
      // var dialogVc = this.$vc.$app.dialog.create({
      //   // text: 'Hello World',
      //   cssClass: 'super',
      //   content: html,
      //   closeByBackdropClick: true,
      //   on: {
      //     opened: function () {
      //       // console.log('Dialog opened');
      //     }
      //   }
      // });
      // dialogVc.open();

    /* remove item action */
      dyName('remove', itemCard /*dialogVc.$el*/).on('click', (e) => {
        APP_DATA.currSet.splice(nio, 1);
        this.showSet(APP_DATA.currSet);
        // dialogVc.close();
      });

    /* toTheEnd action */
      dyName('toTheEnd', itemCard /*dialogVc.$el*/).on('click', (e) => {
        const item = APP_DATA.currSet.splice(nio, 1);
        APP_DATA.currSet.push(item[0]);
        this.showSet(APP_DATA.currSet);
        // dialogVc.close();
      });
    });

    /* settings action */
    dyName('settings', this.$el).on('click', (e) => {
      const dataName = 'settingsPopup'
      const html = `
        <div class="popup" data-name="${dataName}">
          <div class="view">
            <div class="page">
              <div class="navbar">
                <div class="navbar-bg"></div>
                <div class="navbar-inner">
                  <div class="title">Настройки</div>
                  <div class="right">
                    <a href="#" class="link popup-close">Закрыть</a>
                  </div>
                </div>
              </div>
              <div class="page-content">
                <div class="block-title">Form Example</div>
                <div class="list no-hairlines-md" data-name="${dataName}Content">
                  <ul>
                    <li>
                      <div class="item-content">
                        <div class="item-inner">
                          <div class="item-title">По порядку</div>
                          <div class="item-after">
                            <label class="toggle toggle-init" data-name="showByOrder">
                              <input type="checkbox">
                              <span class="toggle-icon"></span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div class="item-content">
                        <div class="item-inner">
                          <div class="item-title">По подсказке</div>
                          <div class="item-after">
                            <label class="toggle toggle-init" data-name="showByTip">
                              <input type="checkbox">
                              <span class="toggle-icon"></span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div class="block">
                  <button
                    data-name="saveSettings"
                    class="button button-large button-raised button-fill color-green"
                  >Применить</button>
                </div>
              </div> <!-- /page-content -->
            </div>
          </div>
        </div>
      `;

      let popup = this.$vc.$app.popup.create({
        content: html,
        on: {
          opened: function () {
            console.log('Popup opened')
          }
        }
      });

      popup.open();

      let toggleByOrder = app.toggle.create({
        el: dyName('showByOrder', popup.$el),
        on: {
          change: function (vc) {
            const name = vc.$el.dataset().name;
            APP_DATA.options[name] = vc.checked;
            saveAppData();
          }
        }
      });
      toggleByOrder.checked = !!APP_DATA.options.showByOrder;


      let toggleByTip = app.toggle.create({
        el: dyName('showByTip', popup.$el),
        on: {
          change: function (vc) {
            const name = vc.$el.dataset().name;
            APP_DATA.options[name] = vc.checked;
            saveAppData();
          }
        }
      });
      toggleByTip.checked = !!APP_DATA.options.showByTip;

      dyName('saveSettings', popup.$el).on('click', (e) => {
        this.showSet(APP_DATA.currSet);
        popup.close();
      });

    });

  }

}
