const express = require('express');

const router = express.Router();
const posts = require('./postDb')
const validatePost = require('../utils/validatePost')


router.get('/', (req, res) => {
  // do your magic!
  posts.get()
  .then( dbPosts => {
    res.status(200).json(dbPosts)
  })
  .catch((err) => {
    console.log({err})
    res.status(500).json({
      error: 'The post information could not be retrieved.'
    })
  })
});

router.get('/:id', (req, res) => {
  // do your magic!
  posts.getById(req.params.id)
  .then( post => {
    if (post) {
    res.status(200).json(post)
    } else {
      res.status(404).json({ message: "The post with the specified ID does not exist." })
    }
  })
  .catch((err) => {
    console.log({err})
    res.status(500).json({ error: "The post information could not be retrieved." })
  })
});

router.delete('/:id', (req, res) => {
  // do your magic!
  posts.remove(req.params.id)
  .then(post => {
    if(post === 1) {
      res.status(200).json({ message: "Removed post from the database." })
    } else {
      res.status(404).json({ message: "The post with the specified ID does not exist."})
    }
  })
  .catch((err) => {
    console.log({err})
    res.status(500).json({ error: "The post information could not be deleted." })
  })
});

router.put('/:id',validatePost, (req, res) => {
  // do your magic!
  posts.update(req.params.id,req.body)
  .then(post => {
    if(post === 1) {
      res.status(200).json({ message: "Updated post in the database."})
    } else {
      res.status(404).json({ message: "The post with the specified ID does not exist." })
    }
  })
  .catch((err) => {
    console.log({err})
    .res.status(500).json({ error: "The post information could not be modified." })
  })
});

// custom middleware

// function validatePostId(req, res, next) {
//   // do your magic!
// }

module.exports = router;
