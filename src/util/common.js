export default {

  // 把时间戳转换成标准格式的时间
  timestampToTime: (timestamp) => {
    let date = new Date(timestamp * 1000)
    let Y = date.getFullYear() + '-'
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    let D = date.getDate() + ' ';
    let h = date.getHours() + ':';
    let m = date.getMinutes() + ':';
    let s = date.getSeconds();
    return Y + M + D + h + m + s
  },

  //把普通list转换成树形结构
  transformTozTreeFormat: function (sNodes) {
    var i, l;
    var r = [];
    var tmpMap = {};
    for (i = 0, l = sNodes.length; i < l; i++) {
      tmpMap[sNodes[i].id] = sNodes[i];
    }
    for (i = 0, l = sNodes.length; i < l; i++) {
      var p = tmpMap[sNodes[i].pid];
      if (p && sNodes[i].id != sNodes[i].pid) {
        var children = this.nodeChildren(p);
        if (!children) {
          children = this.nodeChildren(p, []);
        }
        children.push(sNodes[i]);
      } else {
        r.push(sNodes[i]);
      }
    }
    return r;
  },
  nodeChildren: function (node, newChildren) {
    if (typeof newChildren !== 'undefined') {
      node.children = newChildren;
    }
    return node.children;
  },


}

/**
 * 把tree数据转换成符合iview 规范的 Cascader 数据
 */
export function convertTreeToCascader(tree) {
  const result = [];
  // 遍历 tree
  tree.forEach((item) => {
    // 解构赋值
    let {
      deptId: value,
      deptName: label,
      children: children
    } = item;

    // 如果有子节点，递归
    if (children) {
      children = convertTreeToCascader(children)
    }
    result.push({
      value,
      label,
      children
    })
  });
  return result
}


/**
 * 把tree数据转换成符合 iview 规范的 Tree 数据
 */
export function convertTreeToTree(tree) {
  const result = [];
  // 遍历 tree
  tree.forEach((item) => {
    // 解构赋值
    let {
      deptId: value,
      deptName: title,
      children: children
    } = item;

    // 如果有子节点，递归
    if (children) {
      children = convertTreeToTree(children)
    }
    result.push({
      value,
      title,
      children
    })
  });
  return result
}





export function getParent(data, id) {
  for (let i in data) {
    if (data[i].value === id) {
      return [data[i].value];
    }
    if (data[i].children) {
      let ro = getParent(data[i].children, id);
      if (ro !== undefined) {
        return ro.concat(data[i].value);
      }
    }
  }
}


Date.prototype.Format = function (fmt) { //author: meizz

  let o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };

  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;

};

