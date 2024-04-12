import UserModel from '../models/UserModel.js';
import bcrypt from 'bcrypt';

class LoginController {
    // [POST] /login 
    async authentication(req, res, next) {
        const {email, password} = req.body;
        
        const user = await UserModel.findOne({ email: email }); 

        if (!user) { 
            res.redirect("/login");
            console.log("User not found");
        }
        else { 
            const isPwdCorrect = await bcrypt.compare(password, user.password); 
            if (isPwdCorrect) {
                req.session.isAuth = true;
                req.session.email = email;
                res.redirect("/dashboard");
            }
            else { 
                res.redirect("/login");
            }
        }

    }

    // [GET] /login 
    login(req, res){ 
        res.render("main.ejs", { body: "SignIn/login.ejs" });
    }
}

export default LoginController;