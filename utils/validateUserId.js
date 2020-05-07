const users = require('../users/userDb')

module.exports = (req, res, next) => {
    users.getById(req.params.id)
    .then( user => {
        req.user = user
        next()
    })
    .catch( (err) => {
        console.log({err})
        res.status(400).json({ message: "invalid user id" });
    })
 }