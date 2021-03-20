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

  <div data-name="calcBoard" style="margin-left: 8px;">
    <div style="display: inline-block; margin-right: 16px;">
      <button style="height: 48px; width: 40px; margin-bottom: 8px; user-select: none;">Бу</button><br/>
      <button style="height: 48px; width: 40px; margin-bottom: 8px; user-select: none;">ЛУ</button>
      <button style="height: 48px; width: 40px; margin-bottom: 8px; user-select: none;">ку</button><br/>
      <button style="height: 48px; width: 40px; margin-bottom: 8px; user-select: none;">СУ</button>
      <button style="height: 48px; width: 40px; margin-bottom: 8px; user-select: none;">ну</button><br/>
      <button style="height: 48px; width: 40px; margin-bottom: 8px; user-select: none;">Фу</button>
      <button style="height: 48px; width: 40px; margin-bottom: 8px; user-select: none;">ту</button><br/>    
      <button style="height: 48px; width: 40px; margin-bottom: 8px; user-select: none;">МУ</button><br/>    
      <button style="height: 48px; width: 40px; margin-bottom: 8px; user-select: none;">РУ</button>
      <button style="height: 48px; width: 40px; margin-bottom: 8px; user-select: none;">пу</button><br/>
      <button style="height: 48px; width: 40px; margin-bottom: 8px; user-select: none;">ДУ</button>
      <button style="height: 48px; width: 40px; margin-bottom: 8px; user-select: none;">жу</button><br/>
    </div>
    <div style="display: inline-block; margin-right: 16px;">
      <button style="height: 48px; width: 40px; margin-bottom: 8px; user-select: none;">Бо</button><br/>
      <button style="height: 48px; width: 40px; margin-bottom: 8px; user-select: none;">Ло</button>
      <button style="height: 48px; width: 40px; margin-bottom: 8px; user-select: none;">ко</button><br/>
      <button style="height: 48px; width: 40px; margin-bottom: 8px; user-select: none;">Со</button>
      <button style="height: 48px; width: 40px; margin-bottom: 8px; user-select: none;">но</button><br/>
      <button style="height: 48px; width: 40px; margin-bottom: 8px; user-select: none;">Фо</button>
      <button style="height: 48px; width: 40px; margin-bottom: 8px; user-select: none;">то</button><br/>    
      <button style="height: 48px; width: 40px; margin-bottom: 8px; user-select: none;">Мо</button><br/>    
      <button style="height: 48px; width: 40px; margin-bottom: 8px; user-select: none;">Ро</button>
      <button style="height: 48px; width: 40px; margin-bottom: 8px; user-select: none;">по</button><br/>
      <button style="height: 48px; width: 40px; margin-bottom: 8px; user-select: none;">До</button>
      <button style="height: 48px; width: 40px; margin-bottom: 8px; user-select: none;">жо</button><br/>
    </div>
    <div style="display: inline-block;">
      <button style="height: 48px; width: 40px; margin-bottom: 8px; user-select: none;">Ба</button><br/>
      <button style="height: 48px; width: 40px; margin-bottom: 8px; user-select: none;">Ла</button>
      <button style="height: 48px; width: 40px; margin-bottom: 8px; user-select: none;">ка</button><br/>
      <button style="height: 48px; width: 40px; margin-bottom: 8px; user-select: none;">Са</button>
      <button style="height: 48px; width: 40px; margin-bottom: 8px; user-select: none;">на</button><br/>
      <button style="height: 48px; width: 40px; margin-bottom: 8px; user-select: none;">Фа</button>
      <button style="height: 48px; width: 40px; margin-bottom: 8px; user-select: none;">та</button><br/>    
      <button style="height: 48px; width: 40px; margin-bottom: 8px; user-select: none;">Ма</button><br/>    
      <button style="height: 48px; width: 40px; margin-bottom: 8px; user-select: none;">Ра</button>
      <button style="height: 48px; width: 40px; margin-bottom: 8px; user-select: none;">па</button><br/>
      <button style="height: 48px; width: 40px; margin-bottom: 8px; user-select: none;">Да</button>
      <button style="height: 48px; width: 40px; margin-bottom: 8px; user-select: none;">жа</button><br/>
    </div>

    <!--div style="width: 30%; display: inline-block;">
      <button style="height: 32px; margin-bottom: 8px; user-select: none;">Бо</button><br/>
      <button style="height: 32px; margin-bottom: 8px; user-select: none;">ко</button><br/>    
      <button style="height: 32px; margin-bottom: 8px; user-select: none;">ЛО</button><br/>
      <button style="height: 32px; margin-bottom: 8px; user-select: none;">но</button><br/>
      <button style="height: 32px; margin-bottom: 8px; user-select: none;">СО</button><br/>    
      <button style="height: 32px; margin-bottom: 8px; user-select: none;">то</button><br/>    
      <button style="height: 32px; margin-bottom: 8px; user-select: none;">Фо</button><br/>
      <button style="height: 32px; margin-bottom: 8px; user-select: none;">МО</button><br/>    
      <button style="height: 32px; margin-bottom: 8px; user-select: none;">по</button><br/>
      <button style="height: 32px; margin-bottom: 8px; user-select: none;">РО</button><br/>
      <button style="height: 32px; margin-bottom: 8px; user-select: none;">жо</button><br/>
      <button style="height: 32px; margin-bottom: 8px; user-select: none;">ДО</button><br>
    </div>    
    <div style="width: 30%; display: inline-block;">
      <button style="height: 32px; margin-bottom: 8px; user-select: none;">Ба</button><br/>
      <button style="height: 32px; margin-bottom: 8px; user-select: none;">ка</button><br/>    
      <button style="height: 32px; margin-bottom: 8px; user-select: none;">ЛА</button><br/>
      <button style="height: 32px; margin-bottom: 8px; user-select: none;">на</button><br/>
      <button style="height: 32px; margin-bottom: 8px; user-select: none;">СА</button><br/>    
      <button style="height: 32px; margin-bottom: 8px; user-select: none;">та</button><br/>    
      <button style="height: 32px; margin-bottom: 8px; user-select: none;">Фа</button><br/>
      <button style="height: 32px; margin-bottom: 8px; user-select: none;">МА</button><br/>    
      <button style="height: 32px; margin-bottom: 8px; user-select: none;">па</button><br/>
      <button style="height: 32px; margin-bottom: 8px; user-select: none;">РА</button><br/>
      <button style="height: 32px; margin-bottom: 8px; user-select: none;">жа</button><br/>
      <button style="height: 32px; margin-bottom: 8px; user-select: none;">ДА</button><br>
    </div-->
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
      console.log('pageAfterIn.e', e);
      console.log('pageAfterIn.page', page);
      console.log('pageAfterIn.this', this);

      let calcBoard = new CalcBoard(this);
      calcBoard.init(dyName('calcBoard'));

      // pageAfterIn: function(e, page) {
      //   //console.log('GamePage.pageAfterIn', page);
      //   let gameBoard = new GameBoard(this);
      //   gameBoard.init(dyName('gameBoard'));
      // },      
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
