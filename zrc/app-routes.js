var routes = [
  {
    path: '/',
    // url: './index.html',
    component: homePage,
  },
  {
    path: '/home/',
    // url: './index.html',
    component: homePage,
  },
  {
    path: '/calc/',
    component: calcPage,
  },
  {
    path: '/game/',
    component: gamePage,
  },
  {
    path: '/game/:id/',
    component: gamePage,
  },
  {
    path: '/about/',
    // url: './pages/about.html',
    template: aboutPageTpl,
  },
  {
    path: '/form/',
    //url: './pages/form.html',
    template: formPageTpl,
  },

  {
    path: '/left-page-1/',
    template: leftPage1Tpl,
    // url: './pages/left-page-1.html',
  },
  {
    path: '/left-page-2/',
    template: leftPage2Tpl,
    // url: './pages/left-page-2.html',
  },
  {
    path: '/dynamic-route/blog/:blogId/post/:postId/',
    // componentUrl: './pages/dynamic-route.html',
    component: dynamicRoutePage,
  },
  {
    path: '/request-and-load/user/:userId/',
    async: function (routeTo, routeFrom, resolve, reject) {
      // Router instance
      var router = this;

      // App instance
      var app = router.app;

      // Show Preloader
      app.preloader.show();

      // User ID from request
      var userId = routeTo.params.userId;

      // Simulate Ajax Request
      setTimeout(function () {
        // We got user data from request
        var user = {
          firstName: 'Vladimir',
          lastName: 'Kharlampidi',
          about: 'Hello, i am creator of Framework7! Hope you like it!',
          links: [
            {
              title: 'Framework7 Website',
              url: 'http://framework7.io',
            },
            {
              title: 'Framework7 Forum',
              url: 'http://forum.framework7.io',
            },
          ]
        };
        // Hide Preloader
        app.preloader.hide();

        // Resolve route to load page
        resolve(
          {
            // componentUrl: './pages/request-and-load.html',
            component: requestAndLoadPage,
          },
          {
            context: {
              user: user,
            }
          }
        );
      }, 1000);
    },
  },
  // Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    // url: './pages/404.html',
    template: page404Tpl,
  },
];
