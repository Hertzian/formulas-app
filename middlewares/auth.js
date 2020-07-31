const { authenticate } = require("passport")

exports.checkAuth = (req, res, next) => {
  if(req.isAuthenticated()) return next()

  res.redirect('/')
}

// if authenticate, no show login register
exports.checkYesAuth = (req, res, next) => {
  if(req.isAuthenticated()) return res.redirect('/formulas')

  next()
}
