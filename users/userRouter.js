const router = require('express').Router();

const users = require('./userDb')
const posts = require('../posts/postDb')
const validateUser = require('../utils/validateUser')
const validateUserId = require('../utils/validateUserId')
const validatePost = require('../utils/validatePost')

router.post('/',validateUser, (req, res) => {
  // do your magic!
  users.insert(req.body)
  .then(user => {
    res.status(201).json(user)
  })
  .catch( (err) => {
    console.log({err})
    res.status(500).json({ 
      error: "There was an error while saving the user to the database" })
  })
});

router.post('/:id/posts', validatePost,(req, res) => {
  // do your magic!
  req.body.user_id = req.params.id
  posts.insert(req.body)
  .then(post => {
    if(post){
      res.status(500).json(post)
    } else {
      res.status(404).json({ message: "The user with the specified ID does not exist." })
    }
  })
  .catch((err) => {
    console.log({err})
    res.status(500).json({ message: "There was an error while finding the adding the post"})
  })
});

router.get('/', (req, res) => {
  // do your magic!
  users.get()
  .then( dbUsers => {
    res.status(200).json(dbUsers)
  })
  .catch((err) => {
    console.log({err})
    res.status(500).json({
      error: 'The user information could not be retrieved.'
    })
  })
});

router.get('/:id',validateUserId, (req, res) => {
  // do your magic!
  users.getById(req.params.id)
  .then( user => {
    if (user) {
    res.status(200).json(user)
    } else {
      res.status(404).json({ message: "The user with the specified ID does not exist." })
    }
  })
  .catch((err) => {
    console.log({err})
    res.status(500).json({ error: "The user information could not be retrieved." })
  })
});

router.get('/:id/posts',validateUserId, (req, res) => {
  // do your magic!
  users.getUserPosts(req.params.id)
  .then(posts => {
    if(posts){
      res.status(201).json(posts)
    } else {
      res.status(404).json({ message: "The user with the specified ID does not exist"})
    }
  })
  .catch((err) => {
    console.log({err})
    res.status(500).json({ error: "There was an error while retrieving the posts"})
  })
});

router.delete('/:id',validateUserId, (req, res) => {
  // do your magic!
  users.remove(req.params.id)
  .then(user => {
    if(user === 1) {
      res.status(200).json({ message: "Removed user from the database." })
    } else {
      res.status(404).json({ message: "The user with the specified ID does not exist."})
    }
  })
  .catch((err) => {
    console.log({err})
    res.status(500).json({ error: "The user information could not be deleted." })
  })
});

router.put('/:id',validateUserId, (req, res) => {
  // do your magic!
  users.update(req.params.id,req.body)
  .then(user => {
    if(user === 1) {
      res.status(200).json({ message: "Updated user in the database."})
    } else {
      res.status(404).json({ message: "The user with the specified ID does not exist." })
    }
  })
  .catch((err) => {
    console.log({err})
    .res.status(500).json({ error: "The user information could not be modified." })
  })
});

//custom middleware

// function validateUserId(req, res, next) {
//   // do your magic!
// }

// function validateUser(req, res, next) {
//   // do your magic!
// }

// function validatePost(req, res, next) {
//   // do your magic!
// }

module.exports = router;
