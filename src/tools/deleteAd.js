var del_times = 0,
  deTimer = null;

function adGo() {
  // console.log("adGo");
  var iframe = document.getElementsByTagName('iframe')[0];
  if (iframe) {
    console.log(iframe)
    var bodyNode = {
        tagName: ''
      },
      iframeParent, targetNode = iframe.parentNode;
    while (bodyNode.tagName != 'BODY') {
      bodyNode = targetNode;
      if (bodyNode.tagName != 'BODY') {
        iframeParent = targetNode;
        targetNode = targetNode.parentNode;
      }
    }
    if (iframeParent) //如果iframe有父类
      bodyNode.removeChild(iframeParent);
    else
      bodyNode.removeChild(iframe);
  }
  del_times++;
  //这里是执行50次, 每次200ms, 意思在10秒以内删除垃圾广告。
  if (del_times > 50) window.clearInterval(deTimer)
}

function runAdGo() {
  //抢先 删除 嵌入广告
  (function () {
    adGo();
  }())
  deTimer = self.setInterval(adGo, 200);
}

export {
  runAdGo
}
