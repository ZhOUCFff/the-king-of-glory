<template>
  <div>
    <breadcrumb text="分类列表" />
    <el-card>
      <el-button size="small" type="primary" @click="addCate">添加分类</el-button>
      <tree-table
        :data="cateList"
        show-index
        index-text="序号"
        :columns="columns"
        :expand-type="false"
        :selection-type="false"
        border
      >
        <template slot="operate" slot-scope="scope">
          <el-button size="mini" type="primary" @click="editCateClick(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteCateClick(scope.row)">删除</el-button>
        </template>
      </tree-table>
    </el-card>

    <!-- 添加分类对话框 -->
    <el-dialog title="添加分类" :visible.sync="addDialogVisible" width="50%" @closed="addDialogClose">
      <el-form label-width="80px">
        <el-form-item label="分类名称">
          <el-input v-model.trim="newModel.name"></el-input>
        </el-form-item>
        <el-form-item label="选择分类">
          <el-cascader
            :props="cateProps"
            :options="cateList"
            v-model="newModel.parent"
            clearable
            @change="handleChange"
          ></el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="okAdd">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑分类对话框 -->
    <el-dialog title="编辑分类" :visible.sync="editDialogVisible" width="50%">
      <el-form label-width="70px">
        <el-form-item label="分类名称">
          <el-input v-model="model.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="okEdit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
 
<script>
// 导入网络请求函数
import { createCate, getCate, updateCate, getCateList, deleteCate } from 'network/admin/category'

import Breadcrumb from '../../components/commom/Breadcrumb'

export default {
  name: "CategoryEdit",
  components: {
    Breadcrumb
  },
  data() {
    return {
      newModel: {},
      model: {},
      //分类列表数据
      cateList: [],
      cateProps: {
        expandTrigger: 'hover',
        value: '_id',
        label: 'name',
        children: 'children',
        emitPath: false,
        checkStrictly: true
      },
      columns: [
        {
          label: '分类名称',
          prop: 'name',
          align: 'center',
          headerAlign: 'center'
        },
        {
          label: '操作',
          type: 'template',
          template: 'operate',
          align: 'center',
          headerAlign: 'center'
        }
      ],
      id: '',
      editDialogVisible: false,
      addDialogVisible: false
    }
  },
  methods: {
    //获取分类列表
    async getCateList() {
      const res = await getCateList()
      const data = res.data.map(item => {
        item.children.map(item => {
          item.disabled = true
          item.children = null
        })
        return item
      })
      // console.log(data);

      this.cateList = data
    },
    handleChange() {
      // console.log(this.model.parent);
    },
    //添加分类
    addCate() {
      this.addDialogVisible = true
    },
    async okAdd() {
      const res = await createCate(this.newModel)
      if (!res) return this.$message.error('添加分类失败')
      this.$message.success('添加分类成功')
      this.getCateList()
      this.addDialogVisible = false
    },
    addDialogClose() {
      this.newModel = {}
    },
    //编辑分类
    async editCateClick(row) {
      this.id = row._id
      const res = await getCate(row._id)
      // console.log(res.data);
      this.model = res.data
      this.editDialogVisible = true
    },
    async okEdit() {
      const res = await updateCate(this.id, this.model)
      if (!res) return this.$message.error('编辑分类失败')
      this.$message.success('编辑分类成功')
      this.getCateList()
      this.editDialogVisible = false
    },
    //删除分类
    async deleteCateClick(row) {
      try {
        await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        const res = await deleteCate(row._id)
        if (!res) return this.$message.error('删除分类失败')
        this.$message.success('删除分类成功')
        this.getCateList()
      } catch (error) {
        this.$message.info('已取消删除')
      }
    }
  },
  created() {
    this.getCateList()
  }
}
</script>
 
<style scoped>
</style>