# 如何运行项目
请确保您的操作系统内有nodejs环境
```
git clone https://github.com/Jokcy/cnode.git
```

启动项目，进入项目目录，并使用你习惯的命令行工具依次执行以下命令

```
npm install
npm start
```

项目启动成功后会打印出如下类似的信息：
```
[nodemon] 1.11.0
[nodemon] reading config E:\projects\cnode\nodemon.json
[nodemon] to restart at any time, enter `rs`
[nodemon] ignoring: .git .nyc_output .sass-cache bower_components coverage E:\projects\cnode\node_modules/**/* .git node_modules/**/node_modules .eslintrc.js
[nodemon] watching: *.*
[nodemon] watching extensions: js,json,njk
[nodemon] starting `node ./bin/www`
[nodemon] child pid: 6520
[nodemon] watching 12 files
```

然后打开浏览器，访问`http://localhost:3000`就可以访问到我们的网站了

# 页面路由

## 公共页面渲染数据
这些数据在每个页面渲染的时候都会出现
``` json
{
    title: '页面标题',
    user: { // 如果没有登陆则为null
        "loginname": "alsotang",
        "avatar_url": "https://avatars2.githubusercontent.com/u/1147375?v=3&s=120",
        "githubUsername": "alsotang",
        "create_at": "2012-09-09T05:26:58.319Z",
        "score": 14335,
        "recent_topics": [  // 他发的话题
            {
                "id": "5843092c3ebad99b336b1d48",
                "author": {
                    "loginname": "alsotang",
                    "avatar_url": "https://avatars2.githubusercontent.com/u/1147375?v=3&s=120"
                },
                "title": "使用 generator 按行读取文件的库，co-readline",
                "last_reply_at": "2016-12-04T13:57:30.730Z"
            }
        ],
        "recent_replies": [  // 他的回复
             {
                "id": "58ed729dc749f63d48fe93b3",
                "author": {
                    "loginname": "hezedu",
                    "avatar_url": "https://avatars1.githubusercontent.com/u/8508437?v=3&s=120"
                },
                "title": "sas就是回调地狱终结者！",
                "last_reply_at": "2017-04-12T03:47:04.758Z"
            },
        ]
    }
}
```

### 首页
路由：`/`

渲染数据：
```javascript
[
    {
        "id": "58e607b0ddee72813eb22323",   // 话题id
        "author_id": "4efc278525fa69ac6900000f",  // 话题创建者id
        "tab": "share",   // 分类
        "content": "页面内容",  // 话题内容
        "title": "cnpm@5 beta 测试招募",  // 话题标题
        "last_reply_at": "2017-04-12T03:32:54.188Z",  // 最新回复时间
        "good": false,  // 是否是精品
        "top": true,  // 是否置顶
        "reply_count": 18,  // 共有多少回复数
        "visit_count": 9557,  // 共有多少人访问
        "create_at": "2017-04-06T09:17:36.511Z",  // 创建时间
        "author": {  // 创建者信息
            "loginname": "fengmk2",  // 登陆名
            "avatar_url": "https://avatars3.githubusercontent.com/ u/156269?v=3&s=120" // 头像地址
        }
    }
    // ....数组
]
```

### 话题页
路由：`/topic/:id`，:id代表某个话题的id，比如`/5433d5e4e737cbe96dcef312`

渲染数据：
``` json
{
    "id": "5433d5e4e737cbe96dcef312",
    "author_id": "504c28a2e2b845157708cb61",
    "tab": "share",
    "content": "话题内容,
    "title": "一个面向 Node.js 初学者的系列课程：node-lessons",
    "last_reply_at": "2016-06-16T08:12:21.234Z",
    "good": true,
    "top": false,
    "reply_count": 85,
    "visit_count": 27576,
    "create_at": "2014-10-07T12:00:36.270Z",
    "author": {
        "loginname": "alsotang",
        "avatar_url": "https://avatars2.githubusercontent.com/u/1147375?v=3&s=120"
    },
    "replies": [ // 评论信息
        {
            "id": "5433d866e737cbe96dcef313", // 评论id
            "author": { // 评论者信息
                "loginname": "leapon",
                "avatar_url": "https://avatars.githubusercontent.com/u/4295945?v=3&s=120"
            },
            "content": "<div class=\"markdown-text\"><p>我喜欢你的写作风格</p>\n</div>", // 内容
            "ups": [  // 点赞用户
                "5404a4120256839f712590f3",
                "50f3b267df9e9fcc58452224",
                "56ce9a441739f76e1a05d3e1",
                "5697a7c169d67aff5a8353db",
                "57bfb35b100afbbc0dcc53c4",
                "5822a40fb71596cc386783e8"
            ],
            "create_at": "2014-10-07T12:11:18.981Z",  // 何时创建
            "reply_id": null,
            "is_uped": false
        },
    ]
    "is_collect": false  // 是否被用户收藏
}
```

# API接口
### 登陆
url: '/api/login'

成功返回：
```
{
    success: true,
    data: { 
        "loginname": "alsotang",
        "avatar_url": "https://avatars2.githubusercontent.com/u/1147375?v=3&s=120",
        "githubUsername": "alsotang",
        "create_at": "2012-09-09T05:26:58.319Z",
        "score": 14335,
        "recent_topics": [  // 他发的话题
            {
                "id": "5843092c3ebad99b336b1d48",
                "author": {
                    "loginname": "alsotang",
                    "avatar_url": "https://avatars2.githubusercontent.com/u/1147375?v=3&s=120"
                },
                "title": "使用 generator 按行读取文件的库，co-readline",
                "last_reply_at": "2016-12-04T13:57:30.730Z"
            }
        ],
        "recent_replies": [  // 他的回复
             {
                "id": "58ed729dc749f63d48fe93b3",
                "author": {
                    "loginname": "hezedu",
                    "avatar_url": "https://avatars1.githubusercontent.com/u/8508437?v=3&s=120"
                },
                "title": "sas就是回调地狱终结者！",
                "last_reply_at": "2017-04-12T03:47:04.758Z"
            },
        ]
    }
}
```

失败返回：
```
{
    success: false,
    msg: '错误信息'
}
```

### 添加回复
接口地址：/api/reply

返回信息参考cnode官网API

### 收藏话题
接口地址：/api/collect

返回信息参考cnode官网API

### 取消收藏
接口地址：/api/decollect

返回信息参考cnode官网API

### 创建话题
接口地址： /api/new-topic

返回信息参考cnode官网API

### 给评论点赞
接口地址： /api/ups

返回信息参考cnode官网API
