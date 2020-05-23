console.log('GameBoard');

class GameBoard {

  constructor($vc) {
    // console.log('GameBoard.init', $vc);
    this.$root = null;
    this.$vc = $vc;
  }

  init($root) {
    const self = this;
    this.$root = $root;
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
          console.log('Panel opened')
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

    this.$root.html(html);

    dyName('item', this.$root).on('click', (e) => {
      // // console.log($('.panel.panel-right .page-content .block'));
      // // console.log($app.panel.get('.panel-right'));

      var dialog = this.$vc.$app.dialog.create({
        // text: 'Hello World',
        cssClass: 'super',
        content: '<h1>Content content</h1>',
        closeByBackdropClick: true,
        on: {
          opened: function () {
            console.log('Dialog opened');
          }
        }
      });
      dialog.open();

      // // console.log(dialog);
      // // $app.dialog.open(dialog.$el);
    });

    // dyName('word', dyName('currentBoard')).on('click', (e) => { // current_words
    //   const nio = parseInt($(e.target).data().nio, 10);
    //   const item = app.currSet[nio];
    //
    //   dyName('deleteWord').unbind('click');
    //   dyName('deleteWord').on('click', (e) => {
    //     app.currSet.splice(nio, 1);
    //     showSet(app.currSet);
    //     byId('wordCardDialog').modal('hide');
    //   });
    //
    //   dyName('wordToTheEnd').unbind('click');
    //   dyName('wordToTheEnd').on('click', (e) => {
    //     const item = app.currSet.splice(nio, 1);
    //     app.currSet.push(item[0]);
    //     showSet(app.currSet);
    //     byId('wordCardDialog').modal('hide');
    //   });
    //
    //   const html = getWordCardDialogBody(item);
    //   dyName('wordCardDialogBody').html(html);
    //   byId('wordCardDialog').modal('show');
    // });
  }

}
