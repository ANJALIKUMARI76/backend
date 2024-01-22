const user = require("../models/users")
const jwt = require("jsonwebtoken")
exports.register = async (req, res,next) => {
    const { name, email,PhoneNo, password } = req.body;
    const _user = new user({ name:name, email, PhoneNo, password });
    const eUser = await user.findOne({ email });

    

    if (!eUser) {
        _user.save().then((newUser) => {
            req.subject = "User Registration"
            req.text = "You have successfully signed up"
            next()
            }).
              catch((error) => {
                return res.status(400).json({
                    message: "Error occurred",
                    error
                });
            });
    } else {
        return res.status(409).json({
            message: "User already exists"
        });
    }
}
exports.login = async (req, res) => {
    const { email, password } = req.body
    const eUser = await user.findOne({ email });
    if (eUser) {
        if (eUser.authenticate(password)) {
            const token = jwt.sign({
                id: eUser._id
            }, "MYSECRETKEY@", {
                expiresIn: "1y"
            })
            res.status(200).json({ token, message: "Login Succesfull" })

        } else {
            return res.status(401).json({ message: "Email or password is incorrect" })
        }
    } else {
        return res.status(404).json({
            message: "User not found"
        })
    }
}

exports.findUser = async (req, res) => {
    const user_ = await user.findById(req.id)
    return res.status(200).json({ user_ })
}