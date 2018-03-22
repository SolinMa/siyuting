---
title: 'CastError\: Cast to string failed for value "{}" at path "flow_id" for model "iflow_steps"'
date: 2018-03-21 18:00
category:
- Code
tags:
- erroe
- js
- mongodb
- mongoose
- node
---
## 错误代码
```
CastError: Cast to string failed for value "{}" at path "flow_id" for model "iflow_steps"
    at new CastError (/data/www/htdocs/rd-iflow2/node_modules/mongoose/lib/error/cast.js:26:11)
    at SchemaString.cast (/data/www/htdocs/rd-iflow2/node_modules/mongoose/lib/schema/string.js:458:9)
    at SchemaString.SchemaType._castForQuery (/data/www/htdocs/rd-iflow2/node_modules/mongoose/lib/schematype.js:1064:15)
    at SchemaString.castForQuery (/data/www/htdocs/rd-iflow2/node_modules/mongoose/lib/schema/string.js:513:15)
    at /data/www/htdocs/rd-iflow2/node_modules/mongoose/lib/schematype.js:991:18
    at Array.map (<anonymous>)
    at SchemaString.handleArray (/data/www/htdocs/rd-iflow2/node_modules/mongoose/lib/schematype.js:990:14)
    at SchemaString.castForQuery (/data/www/htdocs/rd-iflow2/node_modules/mongoose/lib/schema/string.js:506:20)
    at SchemaString.SchemaType.castForQueryWrapper (/data/www/htdocs/rd-iflow2/node_modules/mongoose/lib/schematype.js:1016:17)
    at cast (/data/www/htdocs/rd-iflow2/node_modules/mongoose/lib/cast.js:249:39)
    at model.Query.Query.cast (/data/www/htdocs/rd-iflow2/node_modules/mongoose/lib/query.js:3090:12)
    at model.Query.Query._castConditions (/data/www/htdocs/rd-iflow2/node_modules/mongoose/lib/query.js:1144:10)
    at model.Query.Query._find (/data/www/htdocs/rd-iflow2/node_modules/mongoose/lib/query.js:1159:8)
    at /data/www/htdocs/rd-iflow2/node_modules/kareem/index.js:250:8
    at /data/www/htdocs/rd-iflow2/node_modules/kareem/index.js:23:7
    at _combinedTickCallback (internal/process/next_tick.js:131:7)
    at process._tickDomainCallback (internal/process/next_tick.js:218:9)
```

## 错误原因
上代码先
```
var _Schema = new model.Schema({
    ...
    flow_id              : String,
    ...
}, { versionKey: false });
...
let iflowIds = await Iflow.schema.distinct('_id',{app_id:{$in:smartAppIds},current_step_type:{$ne:'end'}}).execAsync();
// 此处iflowIds是ObjectId的数组，下一行拿来$in查询flow_id，结果IflowStep的model里面flow_id字段规定的是String类型，因此报错
let iflowSteps = await IflowStep.schema.find({flow_id:{$in:iflowIds},$or:conditions}).select('_id app_id step_key').execAsync();
<!-- ... -->
```
## 解决方法
```
...
let iflowIds = await Iflow.schema.distinct('_id',{app_id:{$in:smartAppIds},current_step_type:{$ne:'end'}}).execAsync();
let iflowIdsCopy = iflowIds.map(id=>id.toString());
// 此处将ObjectId的数组转换成String数组就可以了。
let iflowSteps = await IflowStep.schema.find({flow_id:{$in:iflowIdsCopy},$or:conditions}).select('_id app_id step_key').execAsync();
...
```