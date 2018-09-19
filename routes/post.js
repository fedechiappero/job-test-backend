var express = require('express');
var router = express.Router();

var Post = require('./../models/post');

router.all('*', function(req,res,next){
  res.set('Access-Control-Allow-Origin','*');
  res.set('Access-Control-Allow-Methods','GET,POST');
  res.set('Access-Control-Allow-Headers','X-Requested-With,Content-Type');
  next();
});

/* GET post listing */
router.get('/', function(req, res) {
  
  Post.find({},function(err, allPost){
    if(err) throw res.status(500).send(err); 
    res.status(200).send({posts: allPost}); //to angular view
    //res.render('post/index', {posts: allPost}); //to twig view
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
    //res.redirect('/'); to twig view
    res.status(201).send({message: 'New post saved'});
  })
  .catch(err => {
    res.status(500).send({message: "Unable to save to database"});
  })
});

module.exports = router;
