const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// 配置静态文件目录
app.use(express.static(__dirname));

// 处理路由
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 上海城市展厅服务器已启动`);
    console.log(`📍 本地访问地址: http://localhost:${PORT}`);
    console.log(`📂 服务根目录: ${__dirname}`);
    console.log(`\n💡 提示: 请在浏览器中打开 http://localhost:${PORT}`);
    console.log(`🛑 按 Ctrl+C 可停止服务器`);
});
