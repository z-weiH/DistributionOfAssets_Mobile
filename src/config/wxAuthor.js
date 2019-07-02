export const _openId = window.$GetQueryString("openId"); //后台返回的openid
export const _caseId = window.$GetQueryString("param"); //二维码案件id号 caseId
/* 项目后台接口访问配置 */
export const wdapi = {
  // (测试)
  test:'http://assettest.arbexpress.cn',
  // (正式)
  pdu:'http://asset.arbexpress.cn'
}
/* 公众号授权配置 */
export const wxweb = {
  // 网页授权
  oauth:'https://open.weixin.qq.com/connect/oauth2/authorize?'
}
/* 公众号后台配置 */
export const wxgzh = {
    appid: 'wx9f95c4206c9c49fc',//正式
    // appid: "wx746461e45ce02735",//测试
    // redirect_uri: `${wdapi.test}/mobile/openid/query.htm`,//测试
    redirect_uri: `${wdapi.pdu}/mobile/openid/query.htm`,//正式
    response_type: "code",
    scope: "snsapi_base"
}
