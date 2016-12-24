Router.route('/',{
  name: 'home',
  template: 'home'
});
Router.configure({
  layoutTemplate: 'main',
  loadingTemplate: 'loading'
});

Router.route('/register');
Router.route('/login');
