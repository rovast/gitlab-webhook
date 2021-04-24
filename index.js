const { exec } = require('child_process')
const http = require('http')
const configs = require('./configs')

// 启动 http server
http.createServer(function (request, res) {
    const chunks = [];
    request.on('data', chunk => chunks.push(chunk));
    request.on('end', () => {
        const data = Buffer.concat(chunks).toString();
        try {
            handleWebhook(JSON.parse(data))
        } catch (e) {
            console.error(e)
        }
        // console.log('Data: ', data);
        res.end();
    })
}).listen(21009, '0.0.0.0');

// 查找对应的分支，执行对应的指令
// TODO: 根据 event 和 repo 地址进行更多拓展
function handleWebhook(hookObj) {
    // const event = hookObj.event_name
    // const git_http_url = hookObj.repository.git_http_url
    const branch = hookObj.ref
    const config = configs.find(i => `refs/heads/${i.branch}` === branch)
    if (!config) {
        console.warn('没查分支对应的配置. branch=', branch)
        return
    }
    execCommand(config.command, config.workdir)
}

// 执行对应的指令
function execCommand(command, workdir) {
    console.log('exec command', command, workdir)
    exec(command, {
        cwd: workdir
    }, function (error, stdout, stderr) {
        // log
        console.log('stdout:', stdout, ' stderr:', stderr)
    })
}
