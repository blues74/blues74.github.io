const homePageTpl = `
<div class="page" data-name="home">
<!-- Top Navbar  navbar-large -->
<div class="navbar">
  <div class="navbar-bg"></div>
  <div class="navbar-inner">
    <div class="left">
      <a href="#" class="link icon-only panel-open" data-panel="left">
        <i class="icon f7-icons if-not-md">menu</i>
        <i class="icon material-icons if-md">menu</i>
      </a>
    </div>
    <div class="title sliding">Zubr</div>
    <div class="right">
      <a href="#" class="link icon-only panel-open" data-panel="right">
        <i class="icon f7-icons if-not-md">menu</i>
        <i class="icon material-icons if-md">menu</i>
      </a>
    </div>
    <!--div class="title-large">
      <div class="title-large-text">Zubr</div>
    </div-->
  </div>
</div>
<!-- Toolbar-->
<!--div class="toolbar toolbar-bottom">
  <div class="toolbar-inner">
    <a href="#" class="link">Left Link</a>
    <a href="#" class="link">Right Link</a>
  </div>
</div-->
<!-- Scrollable page content-->
<div class="page-content">

  <!--div class="accordion-item">
      <div class="accordion-item-toggle">Collapse</div>
      <div class="accordion-item-content">,,,,,,,</div>
  </div-->

  <div class="block block-strong">
    <p>This is an example of split view application layout, commonly used on tablets. The main approach of such kind of layout is that you can see different views at the same time.</p>

    <p>Each view may have different layout, different navbar type (dynamic, fixed or static) or without navbar.</p>

    <p>The fun thing is that you can easily control one view from another without any line of JavaScript just using "data-view" attribute on links.</p>
  </div>
  <div class="block-title">Navigation</div>
  <div class="list">
    <ul>
      <li>
        <a href="/about/" class="item-content item-link">
          <div class="item-inner">
            <div class="item-title">About</div>
          </div>
        </a>
      </li>
      <li>
        <a href="/form/" class="item-content item-link">
          <div class="item-inner">
            <div class="item-title">Form</div>
          </div>
        </a>
      </li>
    </ul>
  </div>

  <div class="block-title">Modals</div>
  <div class="block block-strong">
    <div class="row">
      <div class="col-50">
        <a href="#" class="button button-raised button-fill popup-open" data-popup="#my-popup">Popup</a>
      </div>
      <div class="col-50">
        <a href="#" class="button button-raised button-fill login-screen-open" data-login-screen="#my-login-screen">Login Screen</a>
      </div>
    </div>
  </div>

  <div class="block-title">Panels</div>
  <div class="block block-strong">
    <div class="row">
      <div class="col-50">
        <a href="#" class="button button-raised button-fill panel-open" data-panel="left">Left Panel</a>
      </div>
      <div class="col-50">
        <a href="#" class="button button-raised button-fill panel-open" data-panel="right">Right Panel</a>
      </div>
    </div>
  </div>

  <div class="list links-list">
    <ul>
      <li>
        <a href="/dynamic-route/blog/45/post/125/?foo=bar#about">Dynamic (Component) Route</a>
      </li>
      <li>
        <a href="/load-something-that-doesnt-exist/">Default Route (404)</a>
      </li>
      <li>
        <a href="/request-and-load/user/123456/">Request Data & Load</a>
      </li>
    </ul>
  </div>
</div>
</div>
`;

const homePage = {
  template: homePageTpl,
  style: '',
  // Lifecycle Hooks
  beforeCreate() {
    console.log('componentBeforeCreate', this)
  },
  created() {
    console.log('componentCreated', this)
  },
  beforeMount() {
    console.log('componentBeforeMount', this)
  },
  mounted() {
    console.log('componentMounted', this);
  },
  beforeDestroy() {
    console.log('componentBeforeDestroy', this);
  },
  destroyed() {
    console.log('componentDestroyed', this);
  },
  // Component Data
  data: function () {
    // Must return an object
    return {};
  },
  // Component Methods
  methods: {
    openAlert: function () {
      var self = this;
      self.$app.dialog.alert('Hello World');
    },
  },
  // Page Events
  on: {
    pageMounted: function(e, page) {
      console.log('pageMounted', page);
    },
    pageInit: function(e, page) {
      console.log('pageInit', page);
    },
    pageBeforeIn: function(e, page) {
      console.log('pageBeforeIn', page);
    },
    pageAfterIn: function(e, page) {
      console.log('pageAfterIn', page);
    },
    pageBeforeOut: function(e, page) {
      console.log('pageBeforeOut', page);
    },
    pageAfterOut: function(e, page) {
      console.log('pageAfterOut', page);
    },
    pageBeforeRemove: function(e, page) {
      console.log('pageBeforeRemove', page);
    },
  }  
};
