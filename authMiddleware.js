const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {
    const { email } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (user) {
        req.user = user; // Attach user to the request object
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized');
    }
});

module.exports = { protect };
