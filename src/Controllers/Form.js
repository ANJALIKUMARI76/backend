const Forms = require("../models/Forms")

exports.addForm = async (req, res, next) => {
    try {
        const { name, email, message, pNo, interest } = req.body
        const _form = new Forms(req.body)
        await _form.save()
        req.subject = "User form "
        req.text = "user Form submitted"
        next()
        res.status(201).json({ message: "Form has been submitted" })

    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Error" })
    }
}
