var express = require('express');
var router = express.Router();
require('date-utils');

var mg_domain = require('../../hq_mongo').domain;
var mg_account = require('../../hq_mongo').account;
var mg_ban_domain = require('../../hq_mongo').ban_domain;
var mg_ban_account = require('../../hq_mongo').ban_account;

var domain = new mg_domain();
var ban_domain = new mg_ban_domain();

function get_ban_domain (name) {
  mg_ban_domain.findOne({"name": name}, function(err, ban_domain){
    if (err) {
      console.error(err.stack);
      return null;
    }

    return ban_domain;
  });
};

function get_domain_by_id (id) {
  var domain = null;
  mg_domain.findOne({"_id": id}, function(err, domain){
    if (err) {
      console.error(err.stack);
      return null;
    }

    console.log("get_domain_by_id " + id + " " + domain);
    return domain;
  });
};

function get_domain_by_name (name) {
  var domain = null;
  mg_domain.findOne({"name": name}, function(err, domain){
    if (err) {
      console.error(err.stack);
      return null;
    }

    console.log("get_domain_by_name " + name + " " + domain);
    return domain;
  });
};

router.route('/id/:id')
  .get(function(req, res) {
    mg_domain.findOne({"_id": req.params.id}, function(err, result){
      if (err) {
        console.error(err.stack);
        return res.status(204).json({message: req.params.id + err.stack});
      }

      console.log('get domain: id=' + result.id + ', name=' + result.name);
      return res.status(200).json(result);
    });
  });

router.route('/name/:name')
/*
      var d = get_domain_by_id(req.query.id);
      if (d) {
        console.log('get domain: id ' + req.query.id + ' name ' + d.name);
        return res.status(200).json(d);
      } else {
        console.log('get domain: id ' + req.query.id + ' not exist.' + d);
        return res.status(204).json({message: 'get domain no id ' + req.query.id});
      }
    } else if (req.query.name) {
      var d = get_domain_by_name(req.query.name);
      if (d) {
        console.log('get domain: name ' + d.name);
        return res.status(200).json(d);
      } else {
        console.log('get domain: name ' + req.query.name + ' not exist.');
        return res.status(204).json({message: 'get domain: no name ' + req.query.name});
      }
    }

    mg_domain.find(function(err, domains) {
      if (err) {
        console.error(err.stack);
        return res.status(400).json( err);
      } else if (domains) {
        console.log('get domain: all');
        return res.status(200).json(domains);
      }
    });
*/

router.route('/')
  .post(function(req, res) {
    if (!req.body.name) {
      console.error('add domain: need name.');
      res.json(202, {message: 'add domain: need name'});
    }
    if (get_ban_domain(req.body.name)) {
      console.error('add domain: name ' + req.body.name + ' is banned.');
      res.json(202, {message: 'add domain: name ' + req.body.name + ' is banned.'});
    }

    if (get_domain_by_name(req.body.name)) {
      console.error('add domain: name ' + req.body.name + ' exist.');
      res.json(202, {message: 'add domain: name ' + req.body.name + ' exists.'});
    }

    domain.name = req.body.name;
    var date = new Date();
    domain.create_datetime = date.toFormat('YYYY/MM/DD/ HH24:MI:SS');
    domain.save(function(err) {
      if (err) {
        console.error('add domain: error ' + err.stack);
        res.send(err);
      } else {
        console.log('add domain: name ' + domain.name + ' created.');
        res.json(200, {message: 'add domain: name ' + domain.name + ' created.'});
      }
    });
  })

  .put(function(req, res) {
    if (!req.body.id) {
      console.error('update domain: need id.');
      res.json(202, {message: 'update domain: need id'});
    }
    var update_domain = get_domain_by_id(req.body.id);
    if (!update_domain) {
      console.error('update domain: id ' + req.body.id + ' not exist.');
      res.json(202, {message: 'update domain: id ' + req.body.id + ' not exist.'});
    }

    if (req.body.name && get_ban_domain(req.body.name)) {
      console.error('update domain: name ' + req.body.name + ' is banned.');
      res.json(202, {message: 'update domain: name ' + req.body.name + ' is banned.'});
    }
    update_domain.name = req.body.name;

    update_domain.save(function(err) {
      if (err) {
        console.error('update domain: error ' + err.stack);
        res.send(err);
      } else {
        console.log('update domain: id ' + update_domain.id + ' updated.');
        res.json(200, {message: 'update domain: name ' + update_domain.name + ' id ' + update_domain.id + ' updated.'});
      }
    });
  })
  
  .delete(function(req, res) {
    if (!req.body.id) {
      console.error('delete domain: need id.');
      res.json(202, {message: 'delete domain: need id'});
    }
    mg_domain.remove({_id: req.params.id}, function(err, user) {
      if (err) {
        console.error('delete domain: error ' + err.stack);
        res.send(err);
      } else {
        console.log('delete domain: id ' + update_domain.id + ' deleted.');
        res.json(200, {message: 'delete domain: id ' + req.params.id + ' deleted.'});
      }
    });
  });

/*
router.route('/:name')
  .get(function(req, res) {
    d = get_domain(name);
    if (d) {
      console.log('get domain ' + d.name);
      res.json(200, d);
    } else {
      console.log('get no domain ' + name);
      res.json(204, {message: 'get no domain ' + name});
    }
  });

router.route('/:id')
  .put(function(req, res) {
    cache_user.findById(id, function(err, user) {
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
