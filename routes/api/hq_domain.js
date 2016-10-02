var express = require('express');
var router = express.Router();
require('date-utils');

var mg_domain = require('../../hq_mongo').domain;
var mg_account = require('../../hq_mongo').account;
var mg_ban_domain = require('../../hq_mongo').ban_domain;
var mg_ban_account = require('../../hq_mongo').ban_account;

function get_ban_domain (name) {
  var ban_domain = new mg_ban_domain();
  mg_ban_domain.findOne({"name": name}, function(err, ban_domain){
    if (err) {
      console.error(err.stack);
      return null;
    }

    return ban_domain;
  });
};

function get_domain_by_id (id) {
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
    mg_domain.findOne({"_id": req.params.id}, function(err, domain){
      if (err) {
        console.error(err.stack);
        return res.status(404).json({message: req.params.id + err.stack});
      }

      console.log("get_domain_by_id " + req.params.id + " " + domain);
      return res.status(200).json(domain);
    });
  });

router.route('/name/:name')
  .get(function(req, res) {
    mg_domain.findOne({"name": req.params.name}, function(err, domain){
      if (err) {
        console.error(err.stack);
        return res.status(404).json({message: req.params.name + err.stack});
      }

      console.log("get_domain_by_name " + req.params.name + " " + domain);
      return res.status(200).json(domain);
    });
  });

router.route('/')
  .get(function(req, res) {
    mg_domain.find(function(err, domains) {
      if (err) {
        console.error(err.stack);
        return res.status(400).json(err);
      } else if (domains) {
        console.log('get domain: all');
        return res.status(200).json(domains);
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

    var domain = new mg_domain();
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

module.exports = router;
