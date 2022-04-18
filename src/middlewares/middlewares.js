async function isLoggedIn(req, res, next) {
  let sess= req.session;
  if (sess.userName != null){
      return next();
  }else{
      return res.status(401).json({ TRAVE: false});;
  }
};

async function isSignedIn(req, res, next) {
  let sess= req.session;
  if (sess.userName != null){
      return next();
  }else{
      return res.redirect('/login');
  }
};

async function checkLogin(req, res, next){
  let sess= req.session;
  if(sess.role != null){
    if (sess.role == 'Admin'){
      res.redirect('/admin/user-list');
    }
    res.redirect('/user/');
  }else{
    return next();
  }
};

module.exports = {
  isLoggedIn,
  checkLogin,
  isSignedIn,
};
