const jwt = require('jsonwebtoken');

const verifyJWTMiddleware = async(req, res, next) => {
    const authorization = req.headers.authorization;

    // console.log('Token is: ');

    if(!authorization) {
        return res.status(401).send({error: true, message: 'Unauthorized Access!'});
    }

    const token = authorization.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if(err) {
            return res.status(401).send({error: true, message: 'Unauthorized Access!'});
        }

        req.user = decoded;
        next();
    })
};

module.exports = verifyJWTMiddleware;