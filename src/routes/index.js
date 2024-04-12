import RegisterRouter from "./RegisterRoute.js";
import LoginRouter from "./LoginRouter.js";
import LogoutRouter from "./LogoutRouter.js";
import { isAuth } from "../app/middleware/Auth.js";
import UserModel from "../app/models/UserModel.js";


function Route(app) {

    app.use("/", LogoutRouter);

    app.use("/", RegisterRouter);

    app.use("/", LoginRouter);


    
    app.get("/dashboard", isAuth, async (req, res, next) => {
        const user = await UserModel.findOne({ email: req.session.email });
        const { name, email, password, ...rest } = user;

        const renderedUser = { name, email, password };

        res.render("main.ejs", { body: "layouts/dashboard.ejs", renderedUser });
    })
    
}

export default Route; 