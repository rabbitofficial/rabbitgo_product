<template>
  <div style="padding: 30px;" class="main">
    <!-- <fm-making-form style="height: calc(100vh - 84px);" preview generate-code generate-json /> -->
    <div style="height: 50px;">
      <el-button type="primary" @click="newCourse">New Course</el-button>
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column
        label="index"
        width="100"
      >
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="title"
        width="220"
      />
      <el-table-column
        prop="createtime"
        label="createtime"
        width="200"
      />
      <el-table-column
        prop="description"
        label="description"
        width="200"
      />
      <el-table-column
        prop="ranking"
        label="ranking"
        width="120"
      />
      <el-table-column align="center" label="operations">
        <template slot-scope="scope">
          <el-button type="success" size="small" @click="handleEdit(scope)">Edit</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'Edit Course':'Create Course'">
      <el-form :model="courseDetail" label-width="90px" label-position="left">
        <el-form-item label="Title">
          <el-input v-model="courseDetail.title" placeholder="Course title" />
        </el-form-item>
        <el-form-item label="Description">
          <el-input v-model="courseDetail.description" placeholder="Simple Description" />
        </el-form-item>
        <el-form-item label="Ranking">
          <el-input v-model="courseDetail.ranking" placeholder="Order of Display, please input a number" />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">Cancel</el-button>
        <el-button type="primary" @click="confirmCourse">Confirm</el-button>
      </div>
    </el-dialog>
    <!-- <tinymce v-model="content" class="editor" :height="300" /> -->
  </div>
</template>

<script>
import { getCourseList, createCourse, editCourse, deteleCourse } from '@/api/courses'
import { isNotEmpty } from '@/utils/validate'
// import tinymce from '@/components/Tinymce'
export default {
  components: {
    // tinymce
  },
  data() {
    return {
      dialogVisible: false,
      dialogType: 'edit',
      courseDetail: {
        title: '',
        description: '',
        ranking: 0,
        id: '9999999'
      },
      tableData: [
        /* {
          id: '2016-05-02',
          title: '王小虎',
          createtime: '上海市普陀区金沙江路 1518 弄',
          description: '上海市普陀区金沙江路 1518 弄',
          ranking: '上海市普陀区金沙江路 1518 弄'
        } */
      ],
      content: ''
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    initData() {
      var that = this
      getCourseList().then(res => {
        // console.log(res)
        that.tableData = res.data
      }).catch(e => {
        // console.log(e)
      })
    },
    newCourse() {
      var that = this
      that.dialogVisible = true
      that.dialogType = 'new'
      that.resetForm()
    },
    handleEdit(data) {
      var that = this
      that.dialogType = 'edit'
      that.dialogVisible = true

      that.$nextTick((res) => {
        // console.log(data)
        that.courseDetail.title = data.row.title
        that.courseDetail.id = data.row.id
        that.courseDetail.description = data.row.description
        that.courseDetail.ranking = data.row.ranking
      })
    },
    confirmCourse() {
      var that = this
      const isEdit = this.dialogType === 'edit'
      var result = isNotEmpty(that.courseDetail, ['title', 'description', 'ranking'], this)
      // console.log(result)
      if (result) {
        // add course
        if (!isEdit) {
          createCourse(that.courseDetail).then(res => {
            if (res.status === 'ok') {
              that.dialogVisible = false
              that.resetForm()
              that.initData()
            }
            that.$alert(res.data.msg, 'Prompt', {
              confirmButtonText: 'Confirm'
            })
          })
        } else {
          editCourse(that.courseDetail).then(res => {
            if (res.status === 'ok') {
              that.dialogVisible = false
              that.resetForm()
              that.initData()
            }
            that.$alert(res.data.msg, 'Prompt', {
              confirmButtonText: 'Confirm'
            })
          })
        }
      }
    },
    resetForm() {
      var that = this
      that.$nextTick(() => {
        /* that.courseDetail.title = ''
        that.courseDetail.description = '' */
        for (const key in that.courseDetail) {
          that.courseDetail[key] = ''
        }
        that.courseDetail.id = '9999999'
        that.courseDetail.ranking = 0
      })
    },
    handleDelete(data) {
      var that = this
      this.$confirm('This action will permanently delete ' + data.row.title + ' and its lessons, continue?', 'Prompt', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        deteleCourse({ id: data.row.id }).then(res => {
          // console.log(res)
          if (res.status === 'ok') {
            that.$alert(res.data.msg, 'Prompt', {
              confirmButtonText: 'Confirm'
            })
            that.initData()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Deleting Cancelled'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.editor{
  border: none;
}

.main {
  .el-input__inner::placeholder {
      color: #696969;
    }
    .el-input__inner::-webkit-input-placeholder {
      color: #696969;
    }
}

/deep/ input{
  border: #5B5288 solid 1px;
}
/deep/ input::-webkit-input-placeholder { color: rgba($color: #ffffff, $alpha: 0.4); } input::-moz-input-placeholder { color: rgba($color: #ffffff, $alpha: 0.4); } input::-ms-input-placeholder { color: rgba($color: #ffffff, $alpha: 0.4); }
</style>

