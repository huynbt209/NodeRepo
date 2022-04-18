const IndexService = require('../services/index')

const loginForm = async(req, res) => {
  res.render('loginForm');
}

const login = async(req, res) => {
  try{
    const indexService = new IndexService();
    const account =req.body;
    const user = await indexService.checkLogin(account);
    if (!user) {
      return res.status(400).json({ TRAVE: false, message: "username or password is incorrect"});
    }
    if (user.is_locked) {
      return res.status(400).json({ TRAVE: false, message: "user is locked"});
    }
    await indexService.addSessions(req, res, user);
    res.status(200).json({ TRAVE: true, user: user});
  } catch(error){
    res.status(500).json({ TRAVE: true, error: error});
  }
}

const logout = async(req, res) => {
  try {
    const indexService = new IndexService();
    await indexService.destroySessions(req, res);
    res.redirect('/login');
  } catch(error){

  }
}

module.exports = {
  loginForm,
  login,
  logout,
}
