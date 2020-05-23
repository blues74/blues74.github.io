// var $ = Dom7;

var app = new Framework7({
  root: '#app',
  name: 'giv.zubrilo', // app name
  theme: 'auto', // automatic theme detection
  // App root data
  data: function () {
    return {
      user: {
        firstName: 'John',
        lastName: 'Doe',
      },
      currSet: {
        itemsSrc: null,
        items: null,
        info: '',
        showByOrder: false,
        showByTip: false,
      },
    };
  },
  // App root methods
  methods: {
    helloWorld: function () {
      app.dialog.alert('Hello World!');
    },
  },
  // App routes
  routes: routes,
  on: {
    init: function () {
      console.log('App initialized', arguments.length, this);
      // $(document).on('page:init', function (e) {
      //   console.log('page:init', arguments.length);
      //   // Do something here when page loaded and initialized
      // });      
      // Option 2. Using live 'page:init' event handlers for each page
      $(document).on('page:init', '.page[data-name="home"]', function (e) {
        console.log('page:init.home', arguments.length, e, e.detail);
        console.log($('.page[data-name="home"]')[0].f7Page);
        // Do something here when page with data-name="about" attribute loaded and initialized
      });
    },
    // pageInit: function () {
    //   console.log('Page initialized', arguments.length, arguments[0]);
    // },
    // pageMounted: function () {
    //   console.log('Page mounted', arguments.length);      
    // }
  }
});

// Login Screen Demo
$('#my-login-screen .login-button').on('click', function () {
  var username = $('#my-login-screen [name="username"]').val();
  var password = $('#my-login-screen [name="password"]').val();

  // Close login screen
  app.loginScreen.close('#my-login-screen');

  // Alert username and password
  app.dialog.alert('Username: ' + username + '<br>Password: ' + password);
});


// https://cdnjs.com/libraries/framework7