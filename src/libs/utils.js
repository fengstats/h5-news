// 模板替换: 替换 {{ }} mustache语法中的变量为指定字符串
function tplReplace(template, templateObj) {
  // template导入是一个函数, 所以先执行
  return template().replace(/\{\{(.*?)\}\}/g, (node, key) => {
    // 将传入的变量对应字符串替换进入模板中, 注意可能有前后空格需要清除, 所以使用trim()方法去除
    return templateObj[key.trim()];
  })
}

// html display block 与 none
// true: block
// false: none
function tplHtmlBoolean(boolean) {
  return boolean ? 'block' : 'none';
}


// 导出方法
export {
  tplReplace,
  tplHtmlBoolean
}
