var express = require('express');
var router = express.Router();

var Post = require('./../models/post');

/* GET post listing */
router.get('/', function(req, res) {
  Post.find({},function(err, allPost){ //find all
    if(err) throw err;   
    res.render('post/index', {posts: allPost});
  });
});

/* GET form new post */
router.get('/admin/posts/create', function(req, res) {
  res.render('post/new');
});

/* POST new post */
router.post('/admin/posts/create', function(req, res) {
  const data = new Post({
    description: req.body.description,
    title: req.body.title
  });
  data.save()
  .then(item => {
    res.redirect('/');
  })
  .catch(err => {
    res.status(400).send("unable to save to database");
  })
});

module.exports = router;
