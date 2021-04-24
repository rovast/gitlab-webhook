# gitlab-webhook

在服务器上部署此程序，监听 gitlab 的 webhook 事件，执行对应 command。

原始需求是在测试服务器监听 Push 事件，自动部署最新代码。

### 配置样例

1. master 分支 push 事件时，更新最新代码，并打包
2. dev 分支 push 事件时，更新最新代码并打包

```javascript
const configs = [
    {
        branch: 'master',
        workdir: '/home/luohao/Github/gitlab-webhook',
        command: 'git pull && npm run build:prod'
    }, {
        branch: 'dev',
        workdir: '/home/luohao/Github/gitlab-webhook',
        command: 'git pull && npm run build:prod'
    }
]

module.exports = configs
```

### 关于选型

聚焦问题域，不引入其他额外依赖。Write less, do core thing.
