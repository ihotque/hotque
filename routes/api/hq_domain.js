var express = require('express');
var router = express.Router();

var mg_domain = require('../../hq_mongo').domain;
var mg_account = require('../../hq_mongo').account;
var mg_ban_domain = require('../../hq_mongo').ban_domain;
var mg_ban_account = require('../../hq_mongo').ban_account;

var domain = new mg_domain();
var ban_domain = new mg_ban_domain();

function get_ban_domain (name) {
  ban_domain.findOne({"name", name}, function(err, ban_domain){
    if (err) {
      console.error(err.statck);
      next(err);
    }

    return ban_domain;
  });
};

function get_domain_by_id (id) {
  domain.findById(id, function(err, domain){
    if (err) {
      console.error(err.statck);
      next(err);
    }

    return domain;
  });
};

function get_domain_by_name (name) {
  domain.findOne({"name", name}, function(err, domain){
    if (err) {
      console.error(err.statck);
      next(err);
    }

    return domain;
  });
};

router.route('/')
  .get(function(req, res) {
    if (req.params.id) {
      d = get_domain_by_id(req.params.id);
      if (d) {
        console.log('get domain: id ' + req.params.id + ' name ' + d.name);
        res.json(200, d);
      } else {
        console.log('get domain: id ' + req.params.id + ' no exist.');
        res.json(204, {message: 'get domain: no id ' + req.params.id});
      }
    } else if (req.params.name) {
      d = get_domain_by_name(req.params.name);
      if (d) {
        console.log('get domain: name ' + d.name);
        res.json(200, d);
      } else {
        console.log('get domain: name ' + req.params.name + ' no exist.');
        res.json(204, {message: 'get domain: no name ' + req.params.name});
      }
    }

    domain.find(function(err, domain) {
      if (err) {
        console.error(err.statck);
        res.send(404, err);
      } else if (domain) {
        console.log('get domain: all');
        res.json(200, {domains: domain});
      } else {
        console.log('get domain: none');
        res.json(204, {message: 'get domain: none'});
      }
    });
  })

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
    domain.save(function(err) {
      if (err) {
        console.error('add domain: error ' + err.statck);
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
      if (err)
        console.error('update domain: error ' + err.statck);
        res.send(err);
      else
        res.json(200, {message: 'update domain: name ' + update_domain.name + ' id ' + update_domain.id + ' updated.'});
    });
  })
  
  .delete(function(req, res) {
    if (!req.body.id) {
      console.error('delete domain: need id.');
      res.json(202, {message: 'delete domain: need id'});
    }
    domain.remove({_id: req.params.id}, function(err, user) {
      if (err)
        console.error('delete domain: error ' + err.statck);
        res.send(err);
      else
        res.json({200, {message: 'delete domain: id ' + req.params.id + ' deleted.'});
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
