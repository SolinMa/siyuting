---
title: toLocaleString格式化金额
date: 2018-04-13 18:00:00
category:
- Code
tags:
- js
---
>toLocaleString() 方法返回这个数字在特定语言环境下的表示字符串。  

>新的 locales 和 options 参数让应用程序可以指定要进行格式转换的语言，并且定制函数的行为。在旧的实现中，会忽略 locales 和 options 参数，使用的语言环境和返回的字符串的形式完全取决于实现方式。

## 格式化：

>通过 toLocaleString 返回的结果可以通过 options 参数进行定制：  

```js
var number = 123456.789;

// 中国数字格式
console.log(number.toLocaleString('zn-CN'));
// → 123,456.789

// 中国货币格式(四舍五入最后一位)
console.log(number.toLocaleString('zn-CN',{style:'currency',currency:'CNY'}));
// → ￥123,456.79
```  

*注：不兼容ie10及以下。