const validator = require("validator");

const validateSignUpdata = (req) => {
    const { firstName, lastName, emailId, password} = req.body;
    if(!firstName || !lastName || !emailId || !password) {
        return { error: "All fields are required" };
    }
    else if (firstName.length < 2 || firstName.length > 20) {
        return { error: "First name must be between 2 and 20 characters" };
    }
    else if (!validator.isEmail(emailId)) {
        return { error: "Invalid email address" };
    }
    else if (!validator.isStrongPassword(password)) {
        return { error: "Password must be strong" };
    }
}

module.exports = {validateSignUpdata};