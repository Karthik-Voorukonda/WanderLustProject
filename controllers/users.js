const User = require("../models/user")

module.exports.renderSignUpForm=(req, res) => {
    res.render("users/signup.ejs");
  }


module.exports.renderLoginForm=(req, res) => {
    res.render("users/login.ejs");
  }

module.exports.login=async (req, res) => {
    req.flash("success", "Welcome back to WanderLust");
    res.redirect(res.locals.redirectUrl);
  }

module.exports.signup=async (req, res,next) => {
    try {
      let { username, email, password } = req.body;
      const newUser = {
        username,
        email,
      };
      const registeredUser = await User.register(newUser, password);
      console.log(registeredUser);
      req.login(registeredUser,(err)=>{
        if(err){
         next(err);
        }
        req.flash("success","You're Logged in SuccessFully")
        return res.redirect("/listings");
      })
      
    } catch (err) {
      req.flash("error", err.message);
      res.redirect("/signup");
    }
  }

  module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            next(err);
        }
    })
    req.flash("success","You're logged out successfully ");
    res.redirect("/listings")
}