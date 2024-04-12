import UserModel from '../models/UserModel.js';
import bcrypt from 'bcrypt';
import fs from 'fs';


class RegisterController {
    // [POST] /store
    async store(req, res){ 
        const {name, email, password} = req.body;
        const exist_user = await UserModel.findOne({ email: email }); 

        if (exist_user) { 
            res.redirect("/register");
            console.log("User already exist");
        } else {
            const saltRound = 10;
            const hashPwd = await bcrypt.hash(password, saltRound);
    
            const user = new UserModel({
                name,
                email,
                password: hashPwd,
            });
    
            await user.save()
                    .then( () => res.redirect("/register"))
                    .catch(err => console.log(err));
        }
    }
    
    //[GET] /register
    register(req, res){ 
        const registerEJS = fs.readFileSync("src/resources/views/SignUp/register.ejs");
        res.render("main.ejs", { body: "SignUp/register.ejs" });
    }

}

export default RegisterController;