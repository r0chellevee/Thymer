var passport = require('passport');
var config = require('./oauth.js');
var fbStrategy = require('passport-facebook').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new fbStrategy({
  clientID: config.facebook.clientID,
  clientSecret: config.facebook.clientSecret,
  callbackUrl: config.facebook.clientUrl
}))

//SERVER
// app.configure(function() {
//   app.set('views', __dirname + '/views');
//   app.set('view engine', 'jade');
//   app.use(express.logger());
//   app.use(express.cookieParser());
//   app.use(express.methodOverride());
//   app.use(express.session({ secret: 'my_precious' }));
//   app.use(passport.initialize());
//   app.use(passport.session());
//   app.use(app.router);
// });

// routes
app.get('/signup', ensureAuthenticated, function(req, res){
  res.render('signup', { user: req.user });
}); //discuss creating signup page

app.get('/newRecipe', function(req, res){ //filler
  res.render('newRecipe');
});

app.get('/auth/facebook',
  passport.authenticate('facebook'),
  function(req, res){});
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/newRecipe');
  });

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

// port
app.listen(1337);

// test authentication
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/');
}
