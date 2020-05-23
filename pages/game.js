class GameBoard {

  constructor($vc) {
    this.$vc = $vc;
    //console.log('this.$app', this.$app);
  }

  init($root) {
    this.$root = $root;
    const $app = this.$vc.$app;
    const $vc  = this.$vc;

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

    // console.log('this.$vc', this.$vc.$route.params.id);
    const groupData = ALL_BY_GROUPS[this.$vc.$route.params.id];
    // console.log(groupData);

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
    $root.html(html);

    var panel = $app.panel.create({
      el: '.panel-right',
      on: {
        opened: function () {
          console.log('Panel opened')
        }
      }
    });

    $app.utils.nextTick(() => {
      panel.open();
    }, 500);
    dyName('panel-right-content').html(html);
    // Promise.resolve(null).then(() => {
    //   console.log('Hello');
    //   panel.open();
    // });

    dyName('item', $root).on('click', function (e) {
      // console.log($('.panel.panel-right .page-content .block'));
      // console.log($app.panel.get('.panel-right'));
      var dialog = $app.dialog.create({
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
      console.log(dialog);
      dialog.open();
      // self.$app.dialog.open(dialog.$el);
    });

  }

}

const gamePageTpl = `
<div class="page" data-name="game">

  <div class="navbar">
    <div class="navbar-bg"></div>
    <div class="navbar-inner">
      <div class="left">
        <a href="#" class="link icon-only panel-open" data-panel="left">
          <i class="icon f7-icons if-not-md">menu</i>
          <i class="icon material-icons if-md">menu</i>
        </a>
        <a href="#" class="link back">
          <i class="icon icon-back"></i>
          <span class="if-not-md">Back</span>
        </a>
      </div>
      <div class="title sliding">{{title}}</div>
      <div class="right">
        <a href="#" class="link icon-only panel-open" data-panel="right">
          <i class="icon f7-icons if-not-md">menu</i>
          <i class="icon material-icons if-md">menu</i>
        </a>
      </div>
    </div>
  </div>

  <div class="page-content">
    <!--div class="block">
      block
    </div>  
    <div class="block block-strong">
      block block-strong
    </div>
    <div class="block block-strong no-hairlines">
      block block-strong no-hairlines
    </div-->

    <!--div style="margin: 1rem;" data-name="gameBoard">
      margin: 1rem;
    </div-->

    <!--div class="block">
      <p class="row">
        <button class="col button button-large">Button</button>
        <button class="col button button-large button-fill">Fill</button>
      </p>
      <p class="row">
        <button class="col button button-large button-raised">Raised</button>
        <button class="col button button-large button-raised button-fill">Raised Fill</button>
      </p>
    </div-->
        
    <div style="margin: 1rem; padding: 0;">
      <div data-name="gameBoard"></div>
    </div>

  </div><!-- /page-content -->
</div><!-- /page -->
`

const gamePage = {
  template: gamePageTpl,
  style: '',
  // Lifecycle Hooks
  beforeCreate() {
    //console.log('componentBeforeCreate', this)
  },
  created() {
    //console.log('componentCreated', this)
  },
  beforeMount() {
    //console.log('componentBeforeMount', dyName('item'))
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    //console.log('componentBeforeDestroy', this);
  },
  destroyed() {
    //console.log('componentDestroyed', this);
  },
  // Component Data
  data: function () {
    // Must return an object
    return {
      title: 'Игра'
    };
  },
  // Component Methods
  methods: {
    init: function() {
      // this: $app, $route
      let gameBoard = new GameBoard(this);
      gameBoard.init(dyName('gameBoard'));
      //console.log('INIT', this);
      // console.log('INIT', this.$route);
      // bus.on('some-event', function (e) {
      //   console.log('some-event', e);
      // });
      // bus.emit('some-event', 'hello');

    },
    openAlert: function () {
      var self = this;
      self.$app.dialog.alert('Hello World');
    },
  },
  // Page Events
  on: {
    pageMounted: function(e, page) {
      //console.log('pageMounted', page);
    },
    pageInit: function(e, page) {
      //console.log('pageInit', page);
    },
    pageBeforeIn: function(e, page) {
      //console.log('pageBeforeIn', page);
    },
    pageAfterIn: function(e, page) {
      //console.log('pageAfterIn', page);
    },
    pageBeforeOut: function(e, page) {
      //console.log('pageBeforeOut', page);
    },
    pageAfterOut: function(e, page) {
      //console.log('pageAfterOut', page);
    },
    pageBeforeRemove: function(e, page) {
      //console.log('pageBeforeRemove', page);
    },
  }  
};