const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const salt =  bcrypt.genSaltSync(10);  
const secret = 'aswu352tgwefwfw'


exports.register = async (req, res) => {
    const {username, password, about_me, socials} = req.body;
    // console.log({socials});
    try {
        const user = await User.create({
            username,
            password: bcrypt.hashSync(password, salt),
            about_me,
            socials
        });
        res.json(user);
        // console.log(user);
    } catch (error) {
        console.error(error);
        res.status(400).json({error});
    }
};


exports.login = async (req, res) => {
    const {username, password} = req.body;
    const user = await User.findOne({username});
    if (!user) return res.status(404).json({error: 'User not found'});

    const passOk = bcrypt.compareSync(password,user.password);
    if (!passOk) return res.status(400).json({error: "Incorrect password"});

    jwt.sign({username, id: user._id}, secret, {}, (err, token) => {
        if(err) return res.status(500).json({ error: 'Failed to create token' });
        res.cookie('token', token, { httpOnly: true, sameSite: 'none', secure: true }).json({
            id: user._id,
            username,
            token
        });
    });
};


exports.profile = (req, res) => {
    const {token} = req.cookies;
    if (!token) return res.status(401).json({error: "Not Authenticated"});

    jwt.verify(token, secret,{}, (err, info) => {
        if (err) return res.status(401).json({error: "Invalid Token"});
        res.json(info);
    });
};


exports.logout = (req, res) => {
    res.clearCookie('token', {
     httpOnly: true,
     sameSite: 'none',
     secure: true
   }).status(200).json({message: 'Logged out successfully'});
}

exports.getAuthorProfile = async (req, res) => {
    const {username} = req.params;
    const userDetails = await User.findOne({username}).populate('posts');
    res.json(userDetails);
}
