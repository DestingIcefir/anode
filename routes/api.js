var express = require('express');
var router = express.Router();

var model = require('./model')

/* GET home page. */
router.post('/login', function(req, res, next) {
  model.validateAccesstoken(req.body.accesstoken).then(function (data) {
    if (data.success) {
      model.getUserInfo(data.loginname).then(function (data) {
        req.session.user = data.data
        req.session.accesstoken = req.body.accesstoken
        res.json(data)
      }).catch(function (err) {
        res.json({
          success: false,
          msg: err.msg
        })
      })
    }
  }).catch(function (err) {
    res.json({
      success: false,
      msg: err.msg
    })
  })
});

/* add reply */
router.post('/reply', function(req, res, next) {
  var accesstoken = req.session.accesstoken
  var content = req.body.content
  var reply_id = req.body.reply_id
  var topic_id = req.body.topic_id

  model.addReply(accesstoken, topic_id, content, reply_id).then(function(data) {
    if (data.success) {
      res.json(data)
    }
  }).catch(function (err) {
    res.json({
      success: false,
      msg: err.message
    })
  })
})

router.post('/collect', function(req, res, next) {
  model.collectTopic(req.body.topic_id, req.session.accesstoken)
    .then(function (data) {
      if (data.success) {
        res.json(data)
      }
    }).catch(function (err) {
      res.json({
        success: false,
        msg: err.message
      })
    })
})

router.post('/decollect', function(req, res, next) {
  model.decollectTopic(req.body.topic_id, req.session.accesstoken)
    .then(function (data) {
      if (data.success) {
        res.json(data)
      }
    }).catch(function (err) {
      res.json({
        success: false,
        msg: err.message
      })
    })
})


router.post('/new-topic', function(req, res, next) {
  var accesstoken = req.session.accesstoken
  var content = req.body.content
  var tab = req.body.tab
  var title = req.body.title

  model.addReply(accesstoken, title, tab, content).then(function(data) {
    if (data.success) {
      res.json(data)
    }
  }).catch(function (err) {
    res.json({
      success: false,
      msg: err.message
    })
  })
})

router.post('/ups', function(req, res, next) {
  var accesstoken = req.session.accesstoken
  var reply_id = req.body.reply_id

  model.ups(accesstoken, reply_id).then(function(data) {
    if (data.success) {
      res.json(data)
    }
  }).catch(function (err) {
    res.json({
      success: false,
      msg: err.message,
    })
  })
})

module.exports = router;
