---
title: JS红宝书第四版学习记录（一）
date: 2020-11-10 18:03:49
tags:
- js
---
### 前言
[《JavaScript高级程序设计》](https://book.douban.com/subject/10546125/)作为我入门前端阅读得书籍，当时还是第三版，JS标准发展到2020年已经又新增了很多内容，红宝书也在2020-09-11发布了最新的第4版，实际用了几年JS之后再来看一遍，相信会有不同的感受，在此记录下来，方便自己翻看或者后来人稍作参考。

### 第一章 什么是JavaScript
#### 诞生
因为网速原因，表单验证需要放在前台来做。1995 年，网景公司一位名叫 Brendan Eich 的工程师，开发了一个叫 Mocha（后来改名为 LiveScript）的脚本语言。后面为了蹭Java的热度改名为了JavaScript。
#### ECMAScript
微软搞了一个JScript，跟JavaScript做的有不同之处，没有标准化，就像ie作为万恶之源，于是1997年，欧洲计算机制造商协会（Ecma）花了数月时间打造出 ECMA-262，也就是 ECMAScript（发音为“ek-ma-script”）这个新的脚本语言标准。
我们常说的ES5~ES6也就是ECMA-262的第几次版本更新。除了核心代码ECMAScript，JavaScript还包括DOM（文档对象模型）、BOM（浏览器对象模型）。
### 第二章 HTML中的JavaScript
- 所有`<script>`元素会依照它们在网页中出现的次序被解释。
如果你自己的代码doSth.js中依赖了JQuery对象，那就需要将引入doSth.js的标签放在JQuery下面。

```html
    <script src="/jquery.min.js"></script>
    <script src="/doSth.js"></script>
```
- `defer`属性，意于告诉浏览器立即下载，但延迟执行。(~~不推荐~~)
在实际当中，推迟执行的脚本不一定总会按顺序执行或者在 `DOMContentLoaded`事件之前执行，因此最好只包含一个这样的脚本。

- `async`属性，类似`defer`属性，但是不约束执行顺序。(~~不推荐~~)
异步脚本之间不应存在依赖关系，且不应该在加载期间操作DOM。

- 通过添加脚本标签的方式动态添加脚本的方式，脚本标签自带`async`属性。
鉴于兼容性问题，可以设置async为false。

```javascript
let script = document.createElement('script'); 
script.src = 'doSth.js'; 
script.async = false; 
document.head.appendChild(script);
```

可以通过在文档头部显式声明它们，通知预加载器，提升性能。
```javascript
<link rel="preload" href="doSth.js">
```
- 通过使用`<noscript>`元素，可以指定在浏览器不支持脚本时显示的内容。