#  v-fit-columns
A Vue.js plugin that auto fit Element UI's el-table-column with cell content.

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
<el-table class="r-table" v-fit-columns>
  <el-table-column label="No." type="index" class-name="leave-alone"></el-table-column>
  <el-table-column label="Name" prop="name"></el-table-column>
  <el-table-column label="Age" prop="age"></el-table-column>
</el-table>

```

## Notes
- `<el-table>` needs a `r-table` class to style cells.
- For columns that don't need to be fitted, add a `leave-alone` class by setting `class-name` in `<el-table-column>`.