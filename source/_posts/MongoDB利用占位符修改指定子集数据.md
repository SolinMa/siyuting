---
title: MongoDB利用占位符修改指定子集数据
date: 2018-04-03 18:00
category:
- Code
tags:
- js
- mongodb
- node
---
>占位符$的作用主要是用于返回数组中第一个匹配的数组元素值(子集)，重点是第一个  
>在更新时未显示指定数组中元素位置的情形下，占位符$用于识别元素的位置  
>通过数组过滤条件找到的第一个匹配的元素值的文档将被更新

## 原代码
```javascript
if(meritPay&&meritPay.slaves.some(slave=>slave.user_id===user_id)){
    meritPay.slaves.forEach(slave=>{
        if(slave.user_id===user_id){
            slave.state=state;
            if(state!=='done'){
                slave.reason=reason;
            }
            slave.updated = nowTime;
        }
    });
    meritPay.markModified('slaves');
    await meritPay.saveAsync();
}else{
    return service.restError(res, -1, `没有该数据或者该数据没有该用户`);
}
```

## 修改后代码
```javascript
await MeritPay.schema.update({bonus_id,group_id:other_group_id,'powers.group_id':group_id},{$set:setCondition_powers}).execAsync();
```