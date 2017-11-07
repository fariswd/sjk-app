// FUNGSI HELPER
function cekLogin(req, res, next){
  if (req.session.loggedIn) {
    next()
  }else{
    res.redirect('/login')
  }
}

module.exports = cekLogin;