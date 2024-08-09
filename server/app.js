  var createError = require('http-errors');
  var express = require('express');
  const path = require('path');
  const configViewEngine = require('./src/config/viewEngine');

  var indexRouter = require('./src/routes/index');
  var postsRouter = require('./src/routes/posts');
  var usersRouter = require('./src/routes/users');
  var likeRouter = require('./src/routes/like');
  var commentRouter = require('./src/routes/comment');
  var friendshipRouter = require('./src/routes/friendship');

  var app = express();


  // view engine setup
  configViewEngine(app)

  // Static folder to serve uploaded images  
  app.use('/api/', indexRouter);
  app.use('/api/posts', postsRouter);
  app.use('/api/users', usersRouter);
  app.use('/api/likes', likeRouter);
  app.use('/api/comments', commentRouter);
  app.use('/api/friendships', friendshipRouter);
  
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    next(createError(404));
  });

  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

  module.exports = app;
