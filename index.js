
const UserModel = require("./Models/User.model");
const UserRouter = require("./Routes/User.route");
const PostRouter = require("./Routes/Post.route");

const connection = require("./Config/db");
const jwt = require("jsonwebtoken")
const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors")
require("dotenv").config();

const app = express();
app.use(cors())
app.use(express.json());

app.use("/users", UserRouter)
app.use("/posts", PostRouter)

//! Main Route> -------------------------------------------------->
app.get("/", (req, res) => {
    try {
        res.status(200).json({ Message: "Welcome to Social Media App" });
    } catch (err) {
        console.log(err);
        res.status(400).json({ Error: err })
    }
});
//! Register Route> ----------------------------------------------->
app.post("/register", async (req, res) => {
    let { email, password } = req.body
    let user = req.body
    try {
        const exitings = await UserModel.find({ email });
        if (exitings.length > 0) {
            res.status(200).json({ Message: "You Have Already Registered", success: false, exist: true });
        } else {
            bcrypt.hash(password, 10, async (err, hash) => {
                if (hash) {
                    user.password = hash
                    let instance = new UserModel(user)
                    await instance.save()
                    res.status(201).json({ Message: "Registration Successful", success: true, exist: false, instance });
                } else {
                    res.status(400).json({ Message: "Error from Bcrypt", success: false, exist: false });
                }
            })
        }
    } catch (err) {
        console.log(err);
        res.status(400).json({ Error: err })
    }
});
//! Login Route> ------------------------------------------------->
app.post("/login", async (req, res) => {
    let { email, password } = req.body
    try {
        let Users = await UserModel.find({ email })
        if (Users.length == 0) {
            res.status(200).json({ Message: "You have not registered" });
        } else {
            let user = Users[0]
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    jwt.sign({ userID: user._id }, process.env.key, (err, token) => {
                        if (token) {
                            res.status(200).json({ Message: "Login Successful", token, user });
                        } else {
                            res.status(400).json({ Message: "JWT error" });
                        }
                    });
                } else {
                    res.status(200).json({ Message: "Wrong credentials" });
                }

            })
        }
    } catch (err) {
        console.log(err);
        res.status(400).json({ Error: err })
    }
});


// ? Listening to server
app.listen(process.env.PORT, async () => {
    try {
        await connection;
        console.log("Connected to DB");
    } catch (err) {
        console.log("Error connecting to DB");
    }
    console.log(`Server is Rocking on port ${process.env.PORT}`);
});
