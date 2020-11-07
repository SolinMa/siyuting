---
title: 利用CDN加速Github-Pages依赖资源加载速度
date: 2020-11-07 15:11:52
tags:
---
### CDN是什么
内容分发网络（英语：Content Delivery Network或Content Distribution Network，缩写：CDN）是指一种透过互联网互相连接的电脑网络系统，利用最靠近每位用户的服务器，更快、更可靠地将音乐、图片、影片、应用程序及其他文件发送给用户，来提供高性能、可扩展性及低成本的网络内容传递给用户。

### 为什么用CDN
由于Github服务器放在美国，加载依赖的资源，比如css、js、图片等需要等待较长时间，为了提升博客访问速度和体验，因此决定使用CDN加速资源加载速度。

### 使用JSDelivr提供加速服务
JSDelivr是一款免费的CDN加速产品，可以加速Github、NPM和WordPress的资源，博客挂载在Github Pages服务上面，因此可以直接使用加速服务。
比如我们依赖的一个css文件在github上的地址为

`https://github.com/SolinMa/siyuting/blob/gh-pages/css/style.css`

而使用JSDelivr加速访问的话只需要修改连接为对应的形式

`https://cdn.jsdelivr.net/gh/SolinMa/siyuting@gh-pages/css/style.css`

即

`https://cdn.jsdelivr.net/gh/{Github用户名}/{Github仓库名}@{分支名|版本名}/{仓库下资源路径}`

此时访问资源的速度就直线上升了。