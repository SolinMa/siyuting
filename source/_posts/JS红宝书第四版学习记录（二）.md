---
title: JS红宝书第四版学习记录（二）
date: 2020-11-10 18:04:51
tags:
- js
---
### 第三章 语言基础

#### 语法

语句结束应该跟上`;`，便于解析器解析，某些情况下能提升性能。

#### 变量

var 声明的变量存在变量提升，可以重复声明，作用域为 _函数_ 作用域，在全局作用域直接声明 _会_ 赋值到windows对象（~~不推荐~~）。
let 声明的变量不存在变量提升，不能重复声明，作用域为 _块级_ 作用域，在全局作用域直接声明 _不会_ 赋值到windows对象。
const 生命的变量为常量，不能修改，且必须初始化赋值（_能用 const 就不用 let_）。

```javascript
var name = '张三'; 
console.log(window.name); // '张三' 
let age = 18; 
console.log(window.age); // undefined

for (var i = 0; i < 5; ++i) { 
 setTimeout(() => console.log(i), 0) 
} 
// 你可能以为会输出 0、1、2、3、4 
// 实际上会输出 5、5、5、5、5

for (let i = 0; i < 5; ++i) { 
 setTimeout(() => console.log(i), 0) 
} 
// 会输出 0、1、2、3、4
```

#### 数据类型

##### typeof
typeof操作符，它不是函数，所以不需要参数（但可以使用参数）。
 "undefined"表示值未定义；
 "boolean"表示值为布尔值；
 "string"表示值为字符串；
 "number"表示值为数值；
 "object"表示值为对象（而不是函数）或 null；
 "function"表示值为函数；
 "symbol"表示值为符号。

##### Null类型
Null类型，它表示一个空的对象指针。声明一个明确作为对象使用的变量或属性的时候建议使用。
```javascript
let foo = null;
foo = {}

let bar = {
	baz:  null,
	qux: 'balabala'
}
bar.baz = {}
```
##### Number 类型
- Number 类型使用 [IEEE 754](https://baike.baidu.com/item/IEEE%20754/3869922 "百度百科") 格式表示整数和浮点值（在某些语言中也叫双精度值）。
- ES6 中的八进制值通过前缀 0o 来表示；严格模式下，前缀 0 会被视为语法错误，如果要表示八进制值，应该使用前缀 0o。
- 浮点值的精确度最高可达 17 位小数，但在算术计算中远不如整数精确。由于这种微小的舍入错误，导致很难测试特定的浮点值。

```javascript
let a = 0.1;
let b = 0.2;
if (a + b == 0.3) { // 别这么干！实际为 0.300 000 000 000 000 04
	console.log("你得到 0.3"); 
} 
```
###### NaN
NaN（Not a Number）表示非数值，通常用0作除数会出现。
判断是否为NaN，可以用函数 `isNaN()` ，不可直接判断。

```javascript
NaN == NaN // false
NaN === NaN // false
isNaN(NaN) // true
```
##### 数值转换
`parseInt()` 函数，从第一个非空格字符开始转换，如果第一个字符不是数值字符、加号或减号，parseInt()立即返回 NaN。这意味着空字符串也会返回 NaN（这一点跟 `Number()` 不一样，它返回 0）。parseInt()也接收第二个参数，用于指定进制数（_推荐始终传入_）。

`parseFloat()` 函数的工作方式跟 `parseInt()` 函数类似，都是从位置 0 开始检测每个字符。同样，它也是解析到字符串末尾或者解析到一个无效的浮点数值字符（包括小数点）为止。并且只解析10进制。

```javascript
Number(' ') // 0
parseInt(' ') // NaN

Number('.1') // 0.1
parseInt('.1') // NaN
```

#### String类型
~~未完待续~~