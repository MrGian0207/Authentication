
class LogoutController { 
    // [POST] /logout 
    logout (req, res, next) { 
        // req.session.destroy((err) => {
        //     if (err) throw err;   
        //     res.redirect("/login");         
        // }); 
        req.session.isAuth = false;
        res.redirect("/login");
        console.log("Logout");
    }
}

export default LogoutController;