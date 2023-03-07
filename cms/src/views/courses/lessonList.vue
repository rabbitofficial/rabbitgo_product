<template>
  <div style="padding: 30px;" class="main">
    <!-- <fm-making-form style="height: calc(100vh - 84px);" preview generate-code generate-json /> -->
    <div style="height: 50px;">
      <el-button type="primary" @click="newLesson">New Lesson</el-button>
      <el-select v-model="globalCourseId" placeholder="Select relevant course" style="margin-left: 10px;" @change="initData">
        <el-option v-for="(item,index) in courseList" :key="index" :label="item.title" :value="item.id" />
      </el-select>
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
        width="200"
      />
      <el-table-column
        prop="createtime"
        label="createtime"
        width="200"
      />
      <el-table-column
        prop="courseTitle"
        label="courseTitle"
        width="200"
      />
      <el-table-column
        prop="tokenAward"
        label="tokenAward"
        width="150"
      />
      <el-table-column align="center" label="operations">
        <template slot-scope="scope">
          <el-button type="success" size="small" @click="handleEdit(scope)">Edit</el-button>
          <el-button type="info" size="small" @click="viewContent(scope)">View</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="viewContentVisible" width="60%">
      <div style="margin-bottom: 20px; font-size: 20px;">View Content</div>
      <tinymce ref="viewtiny" v-model="viewContentHtml" class="editor" :height="300" />
      <div style="text-align:right;margin-top: 20px;">
        <el-button type="primary" @click="viewContentVisible=false">Close</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'Edit Lesson':'Create Lesson'" width="60%">
      <el-form :model="lessonDetail" label-width="90px" label-position="left">
        <el-form-item label="Course">
          <el-select v-model="lessonDetail.course_id" placeholder="Select relevant course">
            <el-option v-for="(item,index) in courseList" :key="index" :label="item.title" :value="item.id" />
          </el-select>
        </el-form-item>

        <el-form-item label="Title">
          <el-input v-model="lessonDetail.title" placeholder="Lesson title" />
        </el-form-item>
        <el-form-item label="Award">
          <el-input v-model="lessonDetail.tokenAward" placeholder="Simple Description" />
        </el-form-item>
      </el-form>
      <tinymce ref="viewtinyEdit" v-model="lessonDetail.content" class="editor" :height="250" />
      <div style="text-align:right;margin-top: 20px;">
        <el-button type="danger" @click="dialogVisible=false">Cancel</el-button>
        <el-button type="primary" @click="confirmLesson">Confirm</el-button>
      </div>
    </el-dialog>
    <!-- <tinymce v-model="content" class="editor" :height="300" /> -->
  </div>
</template>

<script>
import { deleteLesson, getCourseList, createLesson, editLesson } from '@/api/courses'
import { getLessonList } from '@/api/courses'
import { isNotEmpty } from '@/utils/validate'
import tinymce from '@/components/Tinymce'
export default {
  components: {
    tinymce
  },
  data() {
    return {
      viewContentVisible: false,
      dialogVisible: false,
      dialogType: 'edit',
      globalCourseId: 1,
      lessonDetail: {
        title: '',
        content: '222',
        tokenAward: 0,
        id: '9999999',
        course_id: ''
      },
      tableData: [
        /* {
          id: '2016-05-02',
          title: '王小虎',
          createtime: '上海市普陀区金沙江路 1518 弄',
          coursetitle: '上海市普陀区金沙江路 1518 弄',
          tokenaward: '上海市普陀区金沙江路 1518 弄'
        } */
      ],
      viewContentHtml: '',
      courseList: []
    }
  },
  mounted() {
    this.initData()
    this.initCourseList()
  },
  methods: {
    initCourseList() {
      var that = this
      getCourseList().then(res => {
        console.log(res)
        that.courseList = res.data
      }).catch(e => {
        // console.log(e)
      })
    },
    initData() {
      var that = this
      getLessonList({ course_id: that.globalCourseId }).then(res => {
        // console.log(res)
        that.tableData = res.data
      }).catch(e => {
        // console.log(e)
      })
    },
    viewContent(data) {
      var that = this
      that.viewContentVisible = true
      that.viewContentHtml = data.row.content

      setTimeout(() => {
        that.$nextTick((res) => {
          that.$refs.viewtiny.setContent(data.row.content)
        })
      }, 100)
    },
    newLesson() {
      var that = this
      that.dialogVisible = true
      that.dialogType = 'new'
      that.resetForm()
    },
    handleEdit(data) {
      var that = this
      that.dialogType = 'edit'
      that.dialogVisible = true

      /* lessonDetail: {
        title: '',
        content: '222',
        tokenAward: 0,
        id: '9999999',
        course_id: ''
      }, */
      that.$nextTick((res) => {
        // console.log(data)
        that.lessonDetail.title = data.row.title
        that.lessonDetail.content = data.row.content
        that.lessonDetail.tokenAward = data.row.tokenAward
        that.lessonDetail.id = data.row.id
        that.lessonDetail.course_id = data.row.course_id
      })

      setTimeout(() => {
        that.$nextTick((res) => {
          that.$refs.viewtinyEdit.setContent(data.row.content)
        })
      }, 100)
    },
    confirmLesson() {
      var that = this
      const isEdit = this.dialogType === 'edit'
      var result = isNotEmpty(that.courseDetail, ['title', 'course_id', 'tokenAward', 'content'], this)
      // console.log(result)
      if (result) {
        // add course
        if (!isEdit) {
          createLesson(that.lessonDetail).then(res => {
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
          editLesson(that.lessonDetail).then(res => {
            if (res.status === 'ok') {
              that.dialogVisible = false
              that.globalCourseId = that.lessonDetail.course_id
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
        for (const key in that.lessonDetail) {
          that.lessonDetail[key] = ''
        }
        that.lessonDetail.id = '9999999'
      })
    },
    handleDelete(data) {
      var that = this
      this.$confirm('This action will permanently delete ' + data.row.title + ', continue?', 'Prompt', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        deleteLesson({ id: data.row.id }).then(res => {
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

