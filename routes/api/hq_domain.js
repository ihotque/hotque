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
  })

  .put(function(req, res) {
    mg_domain.findOne({_id: req.params.id}, function(err, update_domain){
      if (err) {
       console.error('update domain: error ' + err.stack);
        return res.status(404).json({message: req.params.id + " " + err.stack});
      }

      update_domain.name = req.body.name;

      update_domain.save(function(err) {
        if (err) {
          console.error('update domain: error ' + err.stack);
          res.send(err);
        } else {
          console.log('update domain: id ' + req.params.id + ' updated.');
          res.status(200).json({message: 'update domain: id ' + req.params.id+ ' ' + update_domain});
        }
      });
    });
  })

  .delete(function(req, res) {
    mg_domain.remove({_id: req.params.id}, function(err, domain) {
      if (err) {
        console.error('delete domain: error ' + err.stack);
        return res.status(404).json({message: req.params.id + err.stack});
      } else {
        console.log('delete domain: id ' + req.params.id + ' deleted.');
        return res.status(200).json({message: 'delete domain: id ' + req.params.id + ' deleted.'});
      }
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
  })

  .put(function(req, res) {
    mg_domain.findOne({"name": req.params.name}, function(err, update_domain){
      if (err) {
        console.error('update domain: error ' + err.stack);
        return res.status(404).json({message: req.params.name + " " + err.stack});
      }

      update_domain.name = req.body.name;

      update_domain.save(function(err) {
        if (err) {
          console.error('update domain: error ' + err.stack);
          res.send(err);
        } else {
          console.log('update domain: name ' + req.params.name + ' updated.');
          res.status(200).json({message: 'update domain: name ' + req.params.name+ ' ' + update_domain});
        }
      });
    });
  })

  .delete(function(req, res) {
    mg_domain.remove({"name": req.params.name}, function(err, user) {
      if (err) {
        console.error('delete domain: error ' + err.stack);
        return res.status(404).json({message: req.params.name + err.stack});
      } else {
        console.log('delete domain: name ' + req.params.name + ' deleted.');
        return res.status(404).json({message: 'delete domain: name ' + req.params.name + ' deleted.'});
      }
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
  });

module.exports = router;
