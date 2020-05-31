tmp = `
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
`;

let digitStyle = `
  display: inline-block;
  height: 2.5rem;
  min-height: 2.5rem;  
  width: 2.25rem;
  min-width: 2.25rem;  
  margin: 0;
  padding: .25rem 0;
  border-top: 1px solid linen;
  border-left: 1px solid linen;
  font-size: 2rem;
  box-sizing: border-box;
  line-height: .9;
  text-align: center;
  color: #444;
`;

let tempStyle = `
  display: inline-block;
  height: 2.5rem;
  min-height: 2.5rem;  
  width: 2.25rem;
  min-width: 2.25rem;  
  margin: 0;
  padding: .25rem 0;
  border-top: 1px solid linen;
  border-left: 1px solid linen;
  font-size: 2rem;
  box-sizing: border-box;
  line-height: .9;
  text-align: center;
  color: #888;
  font-style: italic;
`;

let resultStyle = `
  display: inline-block;
  height: 2.5rem;
  min-height: 2.5rem;  
  width: 2.25rem;
  min-width: 2.25rem;  
  margin: 0;
  padding: .25rem 0;
  border-top: 1px solid linen;
  border-left: 1px solid linen;
  font-size: 2rem;
  box-sizing: border-box;
  line-height: .9;
  text-align: center;
  color: #333;
  font-weight: 600;
`;

const calcPageTpl = `<div class="page" data-name="calc">${tmp}<div class="page-content">

  <div class="block-title">CALC</div>
  <div class="block">

  <div style="display: flex;" data-type="temp">
    <p style="${tempStyle}"></p>
    <p style="${tempStyle}"></p>
    <p style="${tempStyle}"></p>
    <p style="${tempStyle}"></p>
    <p style="${tempStyle}"></p>
    <p style="${tempStyle}"></p>
    <p style="${tempStyle}">1</p>
    <p style="${tempStyle}"></p>
  </div>

  <div style="display: flex;" data-type="num_1">
    <p style="${digitStyle}"></p>
    <p style="${digitStyle}"></p>
    <p style="${digitStyle}"></p>
    <p style="${digitStyle}"></p>
    <p style="${digitStyle}"></p>
    <p style="${digitStyle}">9</p>
    <p style="${digitStyle}">8</p>
    <p style="${digitStyle}">8</p>
  </div>

  <div style="display: flex;" data-type="num_2">
    <p style="${digitStyle}"></p>
    <p style="${digitStyle}"></p>
    <p style="${digitStyle}"></p>
    <p style="${digitStyle}"></p>
    <p style="${digitStyle}"></p>
    <p style="${digitStyle}"></p>
    <p style="${digitStyle}">2</p>
    <p style="${digitStyle}">6</p>
  </div>  

  <div style="display: flex;" data-type="result">
    <p style="${resultStyle}"></p>
    <p style="${resultStyle}"></p>
    <p style="${resultStyle}"></p>
    <p style="${resultStyle}"></p>
    <p style="${resultStyle}"></p>
    <p style="${resultStyle}"></p>
    <p style="${resultStyle}"></p>
    <p style="${resultStyle}">4</p>
  </div>  

  </div>


</div></div>`;




const calcPage = {
  template: calcPageTpl,
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