## H5 新闻项目(原生)

## 补充说明(2022-03-24)

呜呜呜，这两天看了下这个老项目，发现应该是 node 版本过高的问题，导致项目依赖库已经不兼容了，有两种解决方案：

1. 通过降低 node 版本来跑这个项目，可以使用 nvm 来切换
2. 提升或者使用其它依赖库替换，兼容适配 node 更高的版本

总结：第一种方式显然有点不太友好，所以我这边看了下项目，将 node-sass 用 sass 替换了，提升了一些不受支持的依赖库版本

### Git

- 清除用户名与邮箱命令(全局)

```shell
git config --global --unset user.name
git config --global --unset user.email
```

- 设置用户名与邮箱命令(全局)

```shell
git config --global user.name "用户名"
git config --global user.email "邮箱"
```

- 查看用户名邮箱(全局)

```shell
git config --global --list
```

- Windows 保存 gitee 账号密码路径

```
控制面板\用户帐户\凭据管理器 => 找到 https://gitee.com
```
