var express = require('express');
var router = express.Router();

var mg_domain = require('../../hq_mongo').domain;
var mg_account = require('../../hq_mongo').account;
var mg_ban_domain = require('../../hq_mongo').ban_domain;
var mg_ban_account = require('../../hq_mongo').ban_account;

/*
router.route('/')
  .post(function(req, res) {
    var domain = new mg_domain();
    domain.name = req.body.name;

    var ban_domain = new mg_ban_domain();
    ban_domain.findOne({"name", domain.name}, function(err, get_ban_domain){
      if (err) {
        res.send(err);
      } else if (get_ban_domain) {
        res.json({mesage: 'domain name ' + domain.name + ' is banned!'});
      }
    });

    domain.findOne({"name", domain.name}, function(err, get_domain){
      if (err) {
        res.send(err);
      } else if (get_domain) {
        res.json({mesage: 'domain name ' + domain.name + ' exists!'});
      }
    });

    user.save(function(err) {
      if (err)
        res.send(err);
      else
        res.json({ message: 'User created!' });
    });
  })
  
  .get(function(req, res) {
    cache_user.find(function(err, mg_result) {
      if (err)
        res.send(err);
      else
        res.json(mg_result);
    });

  });

router.route('/:user_id')
  .get(function(req, res) {
    cache_user.findById(req.params.user_id, function(err, user) {
      if (err)
        res.send(err);
      else
        res.json(user);
    });
  })

  .put(function(req, res) {
    cache_user.findById(req.params.user_id, function(err, user) {
      if (err)
        res.send(err);
      user.id = req.body.id;
      user.name = req.body.name;
      user.age = req.body.age;

      user.save(function(err) {
        if (err)
          res.send(err);
        else
          res.json({ message: 'User updated!' });
      });
    });
  })
  
  .delete(function(req, res) {
    cache_user.remove({_id: req.params.user_id}, function(err, user) {
      if (err)
        res.send(err);
      else
        res.json({ message: 'User deleted!' });
    });
  });

*/
module.exports = router;
