#  v-fit-columns
A Vue.js plugin that auto fits Element UI's `el-table-column` with cell content.
Vue.js 插件，可实现 Element UI `el-table-column` 宽度自适应内容，同时保持内容不换行。
## Install
```
npm install v-fit-columns --save
```

## Use
In app entry file:
```
import Vue from 'vue';
import Plugin from 'v-fit-columns';
Vue.use(Plugin);
```

In your component:
```
<el-table v-fit-columns>
  <el-table-column label="No." type="index" class-name="leave-alone"></el-table-column>
  <el-table-column label="Name" prop="name"></el-table-column>
  <el-table-column label="Age" prop="age"></el-table-column>
</el-table>

```

## Notes
- For columns that don't need to be fitted, add a `leave-alone` class by setting `class-name` in `<el-table-column>`.