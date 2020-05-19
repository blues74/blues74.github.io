const requestAndLoadPageTpl = `
<div class="page">
  <div class="navbar">
    <div class="navbar-bg"></div>
    <div class="navbar-inner sliding">
      <div class="left">
        <a href="#" class="back link">
          <i class="icon icon-back"></i>
          <span class="if-not-md">Back</span>
        </a>
      </div>
      <div class="title">{{user.firstName}} {{user.lastName}}</div>
    </div>
  </div>
  <div class="page-content">
    <div class="block block-strong">
      {{user.about}}
    </div>
    <div class="list links-list">
      <ul>
        {{#each user.links}}
          <li><a class="external" target="_blank" href="{{url}}">{{title}}</a></li>
        {{/each}}
      </ul>
    </div>
  </div>
</div>
`

const requestAndLoadPage = {
  template: requestAndLoadPageTpl,
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
