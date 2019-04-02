var express = require('express');
var router = express.Router();

var model = require('./model')

function goToError (res, msg) {
  console.log('error')
  res.render('error.njk', {
    message: msg
  })
}

function getData(req, data) {
  return Object.assign({}, {
    user: req.session.user || null
  }, data)
}

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('coming home')
  model.getTopicList().then(function(data) {
    if (data.success) {
      res.render('pages/index.njk', getData(req, {
        title: '主页',
        data: data.data
      }))
    }
  }).catch(function(err) {
    goToError(res, err.message)
  })
});

/* Get topic page */
router.get('/topic/:id', function(req, res, next) {
  console.log('coming topic')
  model.getTopic(req.params.id, {
    accesstoken: req.session.accesstoken
  }).then(function(data) {
    if (data.success) {
      res.render('pages/topic.njk', getData(req, {
        title: '话题',
        data: data.data
      }))
    }
  }).catch(function(err) {
    goToError(res, err.message)
  })
})

router.get('/new-topic', function(req, res, next) {
  console.log('coming new topic')
  res.render('pages/new-topic', {
    title: '新建话题'
  })
})

router.get('/test', function (req, res, next) {
  console.log('coming test')
  res.render('pages/test.njk', {
    title: '测试页面',
    data: {
      str: 'this is a string',
      array: ['a', 'b', 'c'],
      obj: {
        a: 123,
        b: 456,
        c: 789
      },
      bool: false
    }
  })
})

module.exports = router;
