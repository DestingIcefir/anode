var axios = require('axios')

var baseUrl = 'https://cnodejs.org/api/v1'
var commonErrorMsg = '未知错误'

function handleRes(resolve, reject, res) {
  var data = res.data
  if (data && data.success) {
    resolve(data)
  } else {
    reject(new Error(data.error_msg || commonErrorMsg))
  }
}

function doApi(method, resolve, reject) {
  method.then(function(res) {
    handleRes(resolve, reject, res)
  }).catch(function(err) {
    reject(new Error(err.message || commonErrorMsg))
  })
}

module.exports = {
  getTopicList: function(options) {
    return new Promise(function(resolve, reject) {
      options = Object.assign({}, {
        page: 1,
        tab: '',
        mdrender: true
      }, options)
      doApi(axios.get(baseUrl + '/topics', {
        params: options
      }), resolve, reject)
    })
  },
  getTopic: function(id, options) {
    return new Promise(function(resolve, reject) {
      doApi(axios.get(baseUrl + '/topic/' + id, {
        params: options || {}
      }), resolve, reject)
    })
  },
  collectTopic: function(id, accesstoken) {
    return new Promise(function(resolve, reject) {
      doApi(axios({
        url: baseUrl + '/topic_collect/collect',
        method: 'POST',
        data: 'accesstoken=' + accesstoken + '&topic_id=' + id,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }), resolve, reject)
      // doApi(axios.post(baseUrl + '/topic_collect/collect', {
      //   data: {
      //     accesstoken: accesstoken,
      //     topic_id: id
      //   }
      // }), resolve, reject)
    })
  },
  decollectTopic: function(id, accesstoken) {
    return new Promise(function(resolve, reject) {
      doApi(axios({
        url: baseUrl + '/topic_collect/de_collect',
        method: 'POST',
        data: 'accesstoken=' + accesstoken + '&topic_id=' + id,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }), resolve, reject)
      // doApi(axios.post(baseUrl + '/topic_collect/de_collect', {
      //   data: {
      //     accesstoken: accesstoken,
      //     topic_id: id
      //   }
      // }), resolve, reject)
    })
  },
  getAllCollectTopics: function(loginname) {
    return new Promise(function(resolve, reject) {
      doApi(axios.get(baseUrl + '/topic_collect/' + loginname))
    }, resolve, reject)
  },
  createTopic: function(accesstoken, title, tab, content) {
    return new Promise(function(resolve, reject) {
      doApi(axios.post(baseUrl + '/topics', {
        data: {
          accesstoken: accesstoken,
          title: title,
          tab: tab,
          content: content
        }
      }), resolve, reject)
    })
  },
  validateAccesstoken: function(accesstoken) {
    console.log('validateAccesstoken', accesstoken)
    return new Promise(function(resolve, reject) {
      doApi(axios({
        url: baseUrl + '/accesstoken',
        method: 'POST',
        data: 'accesstoken=' + accesstoken,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }), resolve, reject)
      // doApi(axios.post(baseUrl + '/accesstoken', {
      //   data:{
      //     accesstoken: accesstoken
      //   }
      // }), resolve, reject)
    })
  },
  getUserInfo: function(username) {
    return new Promise(function(resolve, reject) {
      doApi(axios.get(baseUrl + '/user/' + username), resolve, reject)
    })
  },
  addReply: function (accesstoken, topic_id, content, reply_id) {
    return new Promise(function(resolve, reject) {
      doApi(axios.post(baseUrl + '/topic/' + topic_id + '/replies', {
        data:{
          accesstoken: accesstoken,
          content: content,
          reply_id: reply_id
        }
      }), resolve, reject)
    })
  },
  ups: function (accesstoken, reply_id) {
    return new Promise(function(resolve, reject) {
      doApi(axios.post(baseUrl + '/reply/' + reply_id + '/ups', {
        data:{
          accesstoken: accesstoken
        }
      }), resolve, reject)
    })
  }
}
