const jwt = require('jsonwebtoken'); 
const bcrypt = require('bcrypt');

const secretKey = 'mysecretkey12345678998aasdflkjlkajsdfasdfasdfasdf';

//generating a JWT token when user logs in
const generateJwtToken = (payload) => {
    return jwt.sign(payload, secretKey, { expiresIn: '12h' });
}


//middleware to validate JWT Token and process the request
const verifyJwtToken = (req, res, next) => {
    let token = req.headers['authorization'];

    if (!token) {
        return res.status(401).send('Unauthorized');
    }

    token = token.replace('Bearer ', '');

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(401).send('Unauthorized');
        }

        req.user = user; //if you need more user details, fetch user from db and assign it to req.user
        next(); //filter and send to the actual endpoint if verified
    });
}

const hashPassword = (password) => { //hash the password to save in db
    return bcrypt.hashSync(password, 10);
}

const comparePassword = (password, hash) => { //validate the user entered password against the hash in db
    return bcrypt.compare(password, hash);
}

module.exports = {
    generateJwtToken,
    verifyJwtToken,
    hashPassword,
    comparePassword
}

