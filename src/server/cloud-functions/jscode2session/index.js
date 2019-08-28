/*
 * @Description: jscode2session
 * @Author: 执念
 * @Date: 2019-08-27 18:53:09
 * @LastEditTime: 2019-08-28 18:14:14
 * @LastEditors: Please set LastEditors
 */

const WX_API = 'https://api.weixin.qq.com/sns/jscode2session'
const request = require('request')
const querystring = require('querystring')
/*<jdists import="../../inline/utils.js" />*/

/*<remove>*/
const $ = require('../../inline/utils')
/*</remove>*/


exports.main = async (event) => {
  // 获取微信登录接口调用
  const { code } = event;
  let {id, sk} = $.getWechatAppConfig();

  const data = {
    appid: id,
    secret: sk,
    js_code: code,
    grant_type: 'authorization_code'
  };

  let url = `${WX_API}?${querystring.stringify(data)}`;
  //console.log(url)

  return new Promise((resolve, reject) => {
    request.get(url, (err, response, body) => {
      if (err || response.statusCode !== 200) {
        reject(err)
      } else {
        try {
          let res = JSON.parse(body)
          //console.log(res)
          console.log(res)
          //resolve(res)
        } catch (e) {
          reject(e)
        }
      }
    })
  })
}
