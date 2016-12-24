Router.route('/',{
  name: 'start',
  template: 'start'
});
Router.configure({
  layoutTemplate: 'main',
  loadingTemplate: 'loading'
});

Router.route('/register');
Router.route('/login');
Router.route('/home');
Router.route('/about');
Router.route('/proactivity');
Router.route('/mission');
Router.route('/timetable');
