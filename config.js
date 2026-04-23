// 魔珐星云SDK配置文件
// 请根据您的实际配置修改以下参数，或在页面配置按钮中设置

// 从localStorage读取配置的辅助函数
function getConfigFromStorage(key, defaultValue) {
    try {
        const stored = localStorage.getItem(key);
        return stored !== null && stored !== '' ? stored : defaultValue;
    } catch (e) {
        return defaultValue;
    }
}

// 默认配置
const defaultXingyunConfig = {
    appId: "",
    appSecret: "",
    gatewayServer: "https://nebula-agent.xingyun3d.com/user/v1/ttsa/session"
};

const defaultDoubaoConfig = {
    apiKey: "",
    apiUrl: "https://ark.cn-beijing.volces.com/api/v3/chat/completions",
    model: ""
};

// 从localStorage加载配置（优先使用localStorage中的配置）
const xingyunConfig = {
    appId: getConfigFromStorage('xingyun_appId', defaultXingyunConfig.appId),
    appSecret: getConfigFromStorage('xingyun_appSecret', defaultXingyunConfig.appSecret),
    gatewayServer: getConfigFromStorage('xingyun_gatewayServer', defaultXingyunConfig.gatewayServer)
};

const doubaoConfig = {
    apiKey: getConfigFromStorage('doubao_apiKey', defaultDoubaoConfig.apiKey),
    apiUrl: getConfigFromStorage('doubao_apiUrl', defaultDoubaoConfig.apiUrl),
    model: getConfigFromStorage('doubao_model', defaultDoubaoConfig.model)
};

// 保存配置到localStorage
function saveConfigToStorage(config) {
    try {
        if (config.xingyun) {
            localStorage.setItem('xingyun_appId', config.xingyun.appId || '');
            localStorage.setItem('xingyun_appSecret', config.xingyun.appSecret || '');
            localStorage.setItem('xingyun_gatewayServer', config.xingyun.gatewayServer || defaultXingyunConfig.gatewayServer);
            // 更新当前配置
            xingyunConfig.appId = config.xingyun.appId || '';
            xingyunConfig.appSecret = config.xingyun.appSecret || '';
            xingyunConfig.gatewayServer = config.xingyun.gatewayServer || defaultXingyunConfig.gatewayServer;
        }
        if (config.doubao) {
            localStorage.setItem('doubao_apiKey', config.doubao.apiKey || '');
            localStorage.setItem('doubao_apiUrl', config.doubao.apiUrl || defaultDoubaoConfig.apiUrl);
            localStorage.setItem('doubao_model', config.doubao.model || '');
            // 更新当前配置
            doubaoConfig.apiKey = config.doubao.apiKey || '';
            doubaoConfig.apiUrl = config.doubao.apiUrl || defaultDoubaoConfig.apiUrl;
            doubaoConfig.model = config.doubao.model || '';
        }
        return true;
    } catch (e) {
        console.error('保存配置失败:', e);
        return false;
    }
}

// 检查配置是否完整
function isConfigComplete() {
    return xingyunConfig.appId && xingyunConfig.appSecret && doubaoConfig.apiKey && doubaoConfig.model;
}