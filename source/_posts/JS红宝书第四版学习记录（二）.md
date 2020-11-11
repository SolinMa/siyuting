---
title: JS红宝书第四版学习记录（二）
date: 2020-11-11 16:36:25
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
在一些类型转换中（比如减法操作），通常采用的逻辑为：
> 字符串、布尔值、null 或 undefined： Number()
对象： 优先调用valueOf()，没有则调用toString()

`parseInt()` 函数，从第一个非空格字符开始转换，如果第一个字符不是数值字符、加号或减号，parseInt()立即返回 NaN。这意味着空字符串也会返回 NaN（这一点跟 `Number()` 不一样，它返回 0）。parseInt()也接收第二个参数，用于指定进制数（_推荐始终传入_）。

`parseFloat()` 函数的工作方式跟 `parseInt()` 函数类似，都是从位置 0 开始检测每个字符。同样，它也是解析到字符串末尾或者解析到一个无效的浮点数值字符（包括小数点）为止。并且只解析10进制。

```javascript
Number(undefined) // NaN
parseInt(undefined) // NaN

Number(null) // 0
parseInt(null) // NaN

Number(' ') // 0
parseInt(' ') // NaN

Number('.1') // 0.1
parseInt('.1') // NaN
```

#### String类型
在一些类型转换中（比如字符串加法操作），通常采用的逻辑为：
> 对象、数值或布尔值：toString()
undefined 和 null：String()

转义序列表示一个字符，只占一个长度。
```js
let text = "sigma:\u03a3"; // sigma:Σ
console.log(text.length) // 7
```

不确定一个值是不是 null 或 undefined，可以使用 String()转型函数，它始终会返回表示相应类型值的字符串。
```js
let foo;
console.log(foo.toString()) // 报错
console.log(String(foo)) // undefined
```

字符串插值中所有插入的值都会使用 `toString()` 强制转型为字符串，而且任何 JavaScript 表达式都可以用于插值。

模板字面量标签函数，用例子说明。
```js
let a = 6;
let b = 9;
function zipTag(strings, ...expressions) {
	return strings[0] + expressions.map((e, i) => `${e}${strings[i + 1]}`).join('');
}
let untaggedResult = `${ a } + ${ b } = ${ a + b }`;
let taggedResult = zipTag`${ a } + ${ b } = ${ a + b }`;
console.log(untaggedResult); // "6 + 9 = 15"
console.log(taggedResult); // "6 + 9 = 15"
```

原始模板字符串。
```js
console.log(`\u00A9`); // © 
console.log(String.raw`\u00A9`); // \u00A9
```
也可以通过标签函数的第一个参数，即字符串数组的.raw 属性取得每个字符串的原始内容。
```js
function printRaw(strings) { 
 console.log('Actual characters:'); 
 for (const string of strings) { 
 console.log(string); 
 } 
 console.log('Escaped characters;'); 
 for (const rawString of strings.raw) { 
 console.log(rawString); 
 } 
} 
printRaw`\u00A9${ 'and' }\n`; 
// Actual characters: 
// © 
//（换行符）
// Escaped characters: 
// \u00A9 
// \n
```

#### Symbol类型

Symbol()实例用作对象的属性名可以保证其唯一性。Symbol()函数接收一个字符串参数作为描述以调试。但是它们并不相等。
```js
let fooSymbol = Symbol(); 
let barSymbol = Symbol(); 
let bazSymbol = Symbol('baz'); 
let baz1Symbol = Symbol('baz'); 
console.log(bazSymbol.description) // "foo"
console.log(fooSymbol == barSymbol); // false 
console.log(bazSymbol == baz1Symbol); // false
```

使用 Symbol.for()方法在全局符号注册表中创建并重用符号，但是它跟描述符并不相同。使用 Symbol.keyFor()来查询全局注册表。
```js
let fooGlobalSymbol = Symbol.for('foo'); // 创建新符号
let otherFooGlobalSymbol = Symbol.for('foo'); // 重用已有符号
console.log(fooGlobalSymbol === otherFooGlobalSymbol); // true

let fooSymbol = Symbol('foo');
console.log(fooGlobalSymbol === fooSymbol); // false

console.log(Symbol.keyFor(fooGlobalSymbol)) // foo
console.log(Symbol.keyFor(fooSymbol)) // undefined
```
#### 操作符

##### 位操作符

有符号整数使用 32 位的前 31 位表示整数值。第 32 位表示数值的符号，如 0 表示正，1 表示负。
负值以一种称为**二补数**（或补码）的二进制编码存储。步骤如下：
(1) 确定绝对值的二进制表示；
(2) 找到数值的一补数（或反码），换句话说，就是每个 0 都变成 1，每个 1 都变成 0；
(3) 给结果加 1（补数加1，实际值为减1）。

##### 布尔运算符

逻辑与具有短路效应，如果第一个值为false，那么不会走到第二个值（React中常用于条件渲染）。

##### 指数操作符

es7新增 `**` 操作符，效果等同`Math.pow()`
```js
// 开平方
let sqrt = 16;
sqrt **= 0.5;
console.log(sqrt); // 4
```
##### 关系操作符

字符串比较，逐个按照编码比较；
数值字符串比较，先转换为数值；
NaN参与比较，均为false;

```js
let result = "Brick" < "alphabet"; // true
let result = "23" < "3"; // true
let result = "23" < 3; // false
let result = "a" < 3; // 因为"a"会转换为 NaN，所以结果是 false
let result1 = NaN < 3; // false 
let result2 = NaN >= 3; // false
```
##### 逗号操作符
在赋值时使用逗号操作符分隔值，最终会返回表达式中最后一个值。
```js
let num = (5, 1, 4, 8, 0); // num 的值为 0
```

#### 语句

for-in 语句用于 **枚举** 对象中的 **非符号** 键属性。
for-of 语句用于遍历 **可迭代** 对象的元素。
switch 语句采用全等判断，它的一种用法如下：
```js
let num = 25;
switch (true) {
	case num < 0:
		console.log("Less than 0.");
 		break;
	case num >= 0 && num <= 10:
		console.log("Between 0 and 10.");
		break;
	case num > 10 && num <= 20:
		console.log("Between 10 and 20.");
		break;
	default:
		console.log("More than 20.");
}
```