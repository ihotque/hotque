var express = require('express');
var router = express.Router();

var mg_domain = require('../../hq_mongo').domain;
var db = require('../../hq_mysql_con');

router.route('/')
  .post(function(req, res) {
    // add to db
    var is_new_domain = req.body.is_new_domain;
    var domain_name = req.body.domain_name;
    var account_name = req.body.account_name;
    var domain = [];
    cache_user.find({'name': domain_name})
        cache_user.find(function(err, cache_result) {
    if (is_new_domain) {
      db.query('select * from `domain` where `name` = ?', [req.body.domain_name], function (err, result) {
        if (err) {
          console.err("err: search domain " + req.body.domain_name + err.stack);
          res.status(500).send('err: domain ' + req.body.domain_name + ' not exist!');
        } else {
          while (1) {
            var current_date = (new Date()).valueOf().toString();
            var domain_id = farmhash.hash64(new Buffer(current_date + domain_name));
          }
          db.query('insert into domain ?', {}, function (err, result) {
          });
        }
      });
    }

    // add to cache
    var user = new cache_user();
    user.id = req.body.id;
    user.name = req.body.name;
    user.age = req.body.age;

    user.save(function(err) {
      if (err)
        res.send(err);
      else
        res.json({ message: 'User created!' });
    });
  })
  
  .get(function(req, res) {
    //get from db
    var get_result = [];
    db.query('select * from account', {}, function(err, db_result) {
      if (err) {
        res.send(err);
      } else {
        get_result.push({from: "db", entry: db_result});

        //get from catch
        cache_user.find(function(err, cache_result) {
          if (err)
            res.send(err);
          else
            get_result.push({from: "cache", entry: cache_result});
            res.json(get_result);
        });
      }
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

module.exports = router;
