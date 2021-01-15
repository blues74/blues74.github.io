// constuctor
// init
// initContentsList
// getIconContent
// loadWords
// showSet
// showPopupSetting
// showExamplePopup
// getItemCardContent - карточка слова

function textIncludeWords(text, words) {
  text = text || '';
  text = text.replace(/'/g, '');
  text = text.replace(/_/g, ' ');
  text = text.trim();

  if (!text) return false;

  words = Array.isArray(words) ? words : [words];
  words = words
  .map(word => {
    word = word || '';
    word = word.replace(/'/g, '');
    word = word.replace(/\*/g, '');
    word = word.replace(/_/g, ' ');

    return word.trim();
  })
  .filter(word => !!word);

  words = words.map(word => word.split(' '));
  words = _.flatten(words);
  words = words.map(word => (word || '').trim()).filter(word => !!word);

  if (!words.length) return false;

  const excludeArr = [
    'a', 'the',
    'i', 'he', 'she', 'it', 'me', 'mine', 'this', 'those', 'that',
    'has', 'had', 'have',
    'do', 'did', 'done',
    'be', 'is', 'was', 'were', 'been', 'will',
    'all', 'to', 'as',
    'no', 'not', 'yes',
    'duː', 'ɪn', 'ðɪs', 'aɪ',  'juː',  'ə', 'ɒv', 'ænd',
  ];




  for (word of words) {
    if (
      word.length > 2 &&
      !excludeArr.includes(word.toLowerCase()) &&
      new RegExp(word, 'i').test(text)
    ) {
      return true;
    }
  }

  return false;
}

class GameBoard {

  constructor($vc) {
    this.$el = null;
    this.$vc = $vc;
    this.groupName = '';
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
            font-size: 2.5rem;
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
    const groupName = $route.params.id || 'words';
    this.groupName = groupName;
    const groupData = ALL_BY_GROUPS[groupName];
    let html = this.getIconContent();

    // QUICK_LINKS
    _.each(groupData.$keys, (key) => {
      let count = _.get(STAT, `${groupName}.${key}.count`);
      html += `
        <p
          style="
            display: inline-block;
            margin: 0 .25rem .5rem 0;
            padding: .25rem;
            font-size: 2.5rem;
            line-height: 1.25;
            background-color: #222;
            color: white;
            min-width: 2.5rem;
          "
        >
          <span data-name="item">${key}</span>
          ${count ? `<span class="badge">${count}</span>` : ''}
        </p>
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
      this.loadWords(groupName, id);
      dyName('item', panelContent).removeClass('text-color-orange');
      $(e.target).addClass('text-color-orange');
      panelVc.close();
    });


  }

  loadWords (page, group) {
    let x = ALL_KEYS[`${page}.${group}`];
    if(!x) return;

    let arr = ALL_DATA[x.i][x.j].trim()
    .split('\n')
    .map(item => (item || '').trim())
    .filter(item => !!item);

    let meta = arr[0].trim();

    arr = arr.slice(1);
    APP_DATA.currSet = APP_DATA.options.showWordsByOrder ? arr : _.shuffle(arr);
    APP_DATA.currMeta = meta;

    this.showSet(APP_DATA.currSet);
  }

  getItemTpl(val, nio) {
    const textAlign = val.length < 3 ? 'center' : 'left';
    return `<p
      data-name="item"
      style="
        display: inline-block;
        margin: 0 .25rem .5rem 0;
        padding: .25rem;
        font-size: 2.5rem;
        line-height: 1.25;
        background-color: #ddd;
        min-width: 2.5rem;
        text-align: ${textAlign};
      "
      data-nio="${nio}"
    >${val}</p>
    `;
  }

  getItemCardContent(item) {
    let arr = item.split('---').map(item => item.trim()); // .filter(item => !!item);

    const style = formatStyle(`
      font-size: 2.5rem;
      color: #333;
      line-height: 1.2;
      padding: .125rem;
      word-break: break-all;
      margin-bottom: .5rem;
      margin-top: 0;
    `);

    let btnHtml = `
      <p class="row">
        <button
          data-name="toTheEnd"
          class="col button button-large button-raised button-fill color-red"
        >В конец</button>
        <button
          data-name="showExample"
          class="col button button-large button-raised button-fill color-gray"
        >Пример</button>
        <button
          data-name="remove"
          class="col button button-large button-raised button-fill color-green"
        >Удалить</button>
      </p>
    `;

    let html = btnHtml;

    html += `
      <p style="${style}">${arr[0]}</p>
      <p style="${style}">${arr[1]}</p>
    `;

    if (arr[2]) {
      html += `<p style="${style}">${arr[2]}</p>`;
    }

    if (arr[3]) {
      html += `<p style="${style}">${arr[3]}</p>`;
    }

    html += btnHtml;

    return html;
  }

  showPopupSetting() {
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
                          <label class="toggle toggle-init" data-name="showWordsByOrder">
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

    let toggleWordsByOrder = app.toggle.create({
      el: dyName('showWordsByOrder', popup.$el),
      on: {
        change: function (vc) {
          const name = vc.$el.dataset().name;
          APP_DATA.options[name] = vc.checked; // showWordsByOrder
          saveAppData();
        }
      }
    });
    toggleWordsByOrder.checked = !!APP_DATA.options.showWordsByOrder;

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
  }

  showItemCard(targetEl) {
    const nio = parseInt($(targetEl).data('nio'), 10);
    const item = APP_DATA.currSet[nio];
    let html = this.getItemCardContent(item);

    dyName('itemCard', this.$el).remove();
    let itemCard = $(document.createElement('div')).html(html);
    itemCard.attr('data-name', 'itemCard');
    $(itemCard).insertAfter(targetEl);

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
      const meta = APP_DATA.currMeta.split(' ').map(item => item.trim()).filter(item => !!item);
      const key = meta[0];
      const group = meta[1];

      if (group === 'words') {
        if (!STAT[group]) {
          STAT[group] = {};
        }
        if (!STAT[group][key] || isNaN(STAT[group][key].count)) {
          STAT[group][key] = {count: 0};
        }
        if (!APP_DATA.currSet.length) {
          // console.log(STAT);
          STAT[group][key].count = 1 + STAT[group][key].count;
          saveStat();
        }
      }
      // dialogVc.close();
    });

  /* toTheEnd action */
    dyName('toTheEnd', itemCard /*dialogVc.$el*/).on('click', (e) => {
      const item = APP_DATA.currSet.splice(nio, 1);
      APP_DATA.currSet.push(item[0]);
      this.showSet(APP_DATA.currSet);
      // dialogVc.close();
    });

  /* showExample action */
    dyName('showExample', itemCard /*dialogVc.$el*/).on('click', (e) => {
      this.showExamplePopup(item);
    });
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
      this.showItemCard(e.target);
    });

  /* settings action */
    dyName('settings', this.$el).on('click', (e) => {
      this.showPopupSetting();
    });
  } // showSet

  showExamplePopup(item) { // item: string вида "string --- string --- string --- string"
    const meta = getMetadata(APP_DATA.currMeta); // {group: string, page: string}
    const itemArr = item.split('---').map(item => item.trim());
    let firstWord = _.first(itemArr) || '';
    let lastWord = _.last(itemArr) || firstWord;

    if (!firstWord) return;

    let sentences = (TEXTS[meta.page][meta.group] || '')
      .split(/\n/)
      .map(item => item.trim())
      .filter(item => !!item);

    function getTemplate(eng, rus) {
      return `
        <div data-name="container">
          <div class="row">
            <button
              data-name="btnEng"
              class="col button button-large button-raised button-fill color-gray"
            >eng</button>
            <button
              data-name="btnRus"
              class="col button button-large button-raised button-fill color-gray"
            >rus</button>
          </div>
          <div data-name="outEng">${eng}</div>
          <div data-name="outRus" style="display: none;">${rus}</div>
        </div>
      `;
    }

    let outArr = [];
    let sentence;
    let out = '';

    _.each(sentences, (sentenceSrc, i) => {
      sentence = sentenceSrc.replace(/'/g, '');
      sentence = sentenceSrc.replace(/_/g, ' ');

      if (
        !/[а-яёЁА-Я]/.test(sentence) &&
        textIncludeWords(sentence, [firstWord, lastWord])
      ) {
        let rus = sentence;
        if (/[а-яёЁА-Я]/.test(sentences[i+1] || '')) {
          rus = sentences[i+1];
        }
        outArr.push(getTemplate(sentenceSrc, rus));
      }
    });

    if (!outArr.length) return;

    // if (!APP_DATA.options.showExamplesByOrder) {
       outArr = _.shuffle(outArr);
    // }

    out += outArr.join('');

    const dataName = 'examplePopup';
    const html = `
      <div class="popup" data-name="${dataName}">
        <div class="view">
          <div class="page">
            <div class="page-content">
              <div data-name="${dataName}Content" style="font-size: 2.5rem; padding: .5rem; word-break: break-word;">
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    let popup = this.$vc.$app.popup.create({
      content: html,
      swipeToClose: true,
      on: {
        opened: function () {
          console.log('Example popup opened')
        }
      }
    });

    popup.open();

    dyName(`${dataName}Content`, popup.$el).html(out);

    dyName('btnEng', popup.$el).on('click', e => {
      let $container = $(e.target).parents('[data-name="container"]');
      dyName('outRus', $container).css('display', 'none');
      dyName('outEng', $container).css('display', 'block');
    });

    dyName('btnRus', popup.$el).on('click', e => {
      let $container = $(e.target).parents('[data-name="container"]');
      dyName('outEng', $container).css('display', 'none');
      dyName('outRus', $container).css('display', 'block');
    });
  }

}
