import config from "../config";

const tips = {
  1: '发生错误',
  1005: 'appkey无效',
  3000: '期刊不存在',
}

class Http {
  request(params) {
    params.method = params.method || 'GET'

    return new Promise((resolve, reject) => {
      return wx.request({
        ...params,
        url: `${config.apiBaseUrl}${params.url}`,
        header: {
          'content-type': 'application/json',
          'appkey': config.appkey,
        },
        success:(res)=> {
          const code = res.statusCode
          if (String(code).startsWith('2')) {
            resolve(res.data)
          }else {
            this._showError(res.data.error_code)
          }
        },
        fail: (err) => {
          this._showError(1)
        },
      })
    })
  }
  _showError(errorCode){
    errorCode = errorCode || 1
    wx.showToast({
      icon: 'none',
      duration: 1500,
      title: tips[errorCode],
    })
  }
}

export default Http