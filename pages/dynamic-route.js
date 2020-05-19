const dynamicRoutePageTpl = `
<div class="page">
  <div class="navbar">
    <div class="navbar-bg"></div>
    <div class="navbar-inner sliding">
      <div class="left">
        <a href="#" class="link back">
          <i class="icon icon-back"></i>
          <span class="if-not-md">Back</span>
        </a>
      </div>
      <div class="title">Component Page</div>
    </div>
  </div>
  <div class="page-content">
    <div class="block block-strong">
      <p>Component page is alos compiled with Template7, but it has much more functionality. In addition to Template7 page it has lifecycle hooks, events handling and data managment.</p>
      <p>It is useful to use Component page when you need page-specific logic.</p>
    </div>
    <div class="block-title">Events Handling</div>
    <div class="block block-strong">
      <a href="#" class="button button-raised" @click="openAlert">Open Alert</a>
    </div>
    <div class="block-title">Page Component Data</div>
    <div class="block block-strong">
      <p>Hello! My name is {{name}}. I am {{age}} years old.</p>
      <p>I like to play:</p>
      <ul>
        {{#each like}}
        <li>{{this}}</li>
        {{/each}}
      </ul>
    </div>
    <div class="block-title">Extended Context</div>
    <div class="block block-strong">
      <p>Component page context as Template7 page context is also extended with some additional variables.</p>
      <h4>$route</h4>
      <p>Contains properties of the current route:</p>
      <ul style="padding-left:25px">
        <li><b>$route.url</b>: {{$route.url}}</li>
        <li><b>$route.path</b>: {{$route.path}}</li>
        <li><b>$route.params</b>: {{js 'return JSON.stringify(this.$route.params)'}}</li>
        <li><b>$route.hash</b>: {{$route.hash}}</li>
        <li><b>$route.query</b>: {{js 'return JSON.stringify(this.$route.query)'}}</li>
      </ul>

      <h4>$root</h4>
      <p>Root data & methods:</p>
      <ul style="padding-left:25px">
        <li><b>$root.user.firstName</b>: {{$root.user.firstName}}</li>
        <li><b>$root.user.lastName</b>: {{$root.user.lastName}}</li>
        <li><a @click="$root.helloWorld()">$root.helloWorld()</a></li>
      </ul>

      <h4>$theme</h4>
      <p>Currently active theme:</p>
      <ul style="padding-left:25px">
        <li><b>$theme.ios</b>: {{$theme.ios}}</li>
        <li><b>$theme.md</b>: {{$theme.md}}</li>
        <li><b>$theme.aurora</b>: {{$theme.aurora}}</li>
      </ul>
    </div>
  </div>
</div>
`;

const dynamicRoutePageStl = `
  p {
    margin: 10px 0;
  }
`;

const dynamicRoutePage = {
  template: dynamicRoutePageTpl,
  style: dynamicRoutePageStl,
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
    return {
      name: 'Jimmy',
      age: 25,
      like: ['Tennis', 'Chess', 'Football'],
    }
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
