const express = require('express');
const app = express();
const port = 3007;
const path= require('path');
const sessions = require('express-session');
var methodOverride = require('method-override')

app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');

app.use(sessions({
  secret: 'key',
  resave: false,
  saveUninitialized: true,
}));

app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded ({ extended: false }));
app.use(methodOverride('_method'))

const indexRouter = require('./routers/index');
const adminRouter = require('./routers/admin');
const userRouter = require('./routers/user');

app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/user', userRouter);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});