<template>
  <div style="padding: 30px;">
    <!-- <fm-making-form style="height: calc(100vh - 84px);" preview generate-code generate-json /> -->
    <div style="height: 50px;">
      <el-button type="primary" @click="dialogVisible = true">Upload Image</el-button>
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
          <span>{{ (listQuery.currentPage - 1)*listQuery.limit + scope.$index + 1 }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Image" width="150">
        <template slot-scope="scope">
          <img
            style="width: 45px;"
            :src="scope.row.src"
          >
        </template>
      </el-table-column>

      <el-table-column
        label="url"
      >
        <template slot-scope="scope">
          <a :href="scope.row.src" target="_blank">{{ scope.row.src }}</a>
          <el-tag v-clipboard:copy="scope.row.src" v-clipboard:success="clipboardSuccess" class="copy">Copy Url</el-tag>
        </template>
      </el-table-column>

      <el-table-column
        prop="createtime"
        label="createtime"
        width="200"
      />
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="tableDataAll.length"
      :current-page="listQuery.currentPage"
      :page-size="listQuery.limit"
      @current-change="changePage"
    />
    <el-dialog :visible.sync="dialogVisible" title="Upload Image">
      <div class="upload-container">
        <el-upload
          :data="dataObj"
          :multiple="false"
          :show-file-list="false"
          :on-success="handleImageSuccess"
          class="image-uploader"
          drag
          action="customize"
          :http-request="uploadFile"
        >
          <i class="el-icon-upload" />
          <div class="el-upload__text">
            Drag file here, Or<em> Click to Upload</em>
          </div>
        </el-upload>
        <div class="image-preview">
          <div v-show="imageUrl" class="image-preview-wrapper">
            <img :src="imageUrl+'?imageView2/1/w/200/h/200'">
            <div class="image-preview-action">
              <i class="el-icon-delete" @click="rmImage" />
            </div>
          </div>
        </div>
      </div>
      <div style="text-align:right;">
        <el-button type="primary" @click="dialogVisible=false">Close</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { deteleForm } from '@/api/customForms'
import clipboard from '@/directive/clipboard/index.js'
import { amazonS3, amazonS3List } from '@/api/amazons3'
import moment from 'moment'
import _ from 'underscore'
// import qs from 'qs'

export default {
  directives: {
    clipboard
  },
  data() {
    return {
      dialogVisible: false,
      tableDataAll: [],
      tempUrl: '',
      tableData: [],
      dataObj: { token: 'token', key: 'key' },
      imageUrl: '',
      listQuery: {
        page: 1,
        limit: 10,
        currentPage: 1
      }
    }
  },
  watch: {
    listQuery: {
      handler(newValue, oldValue) {
        // Note: `newValue` will be equal to `oldValue` here
        // on nested mutations as long as the object itself
        // hasn't been replaced.
        // console.log('newValue', newValue.currentPage)
        // console.log('oldValue', oldValue.currentPage)
        this.fetchData()
      },
      deep: true
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    uploadFile(params) {
      const that = this
      // console.log('uploadFile', params)
      const filesize2m = (params.file.size / 1024 / 1024) < 3

      if (!filesize2m) {
        that.$message.error('file size can not be greater than 3MB')
        return false
      }

      const formData = new FormData()
      formData.append('file', params.file)
      formData.append('name', params.file.name)

      amazonS3(formData).then(res => {
        that.imageUrl = res.data.src
        that.$message({
          message: 'Upload successfully',
          type: 'success',
          duration: 1500
        })
        that.initData()
        // console.log('res', res)
        // that.tableData = res.data
      }).catch(e => {
        // console.log(e)
      })
    },
    changePage(e) {
      this.listQuery.currentPage = e
      // console.log(this.listQuery)
      // console.log(e)
    },
    rmImage() {

    },
    handleImageSuccess() {

    },
    confirmUpload() {

    },
    clipboardSuccess() {
      this.$message({
        message: 'Copy successfully',
        type: 'success',
        duration: 1500
      })
    },
    fetchData() {
      const that = this
      that.tableData = that.tableDataAll.filter((item, index) => {
        return index >= ((that.listQuery.currentPage - 1) * that.listQuery.limit) && index < that.listQuery.currentPage * that.listQuery.limit
      })
    },
    initData() {
      var that = this
      amazonS3List().then(res => {
        console.log(res)
        res.data = _.sortBy(res.data, function(a) { return -moment(a.createtime).unix() })
        that.tableDataAll = res.data
        that.fetchData()
      })
    },
    resetForm1() {
      /* var that = this
      that.$nextTick(() => {
        that.form.id = ''
        that.form.name = ''
        that.form.json = ''
        that.$refs.makingform.setJSON({ 'list': [], 'config': { 'labelWidth': 100, 'labelPosition': 'right', 'size': 'small' }})
      }) */
    },
    back() {
      /* var that = this
      that.displayForm = false
      that.displayEditList = true */
    },
    handleDelete(index, row) {
      var that = this
      this.$confirm('This action will permanently delete' + row.name + ', continue?', 'Prompt', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        deteleForm({ id: row.id }).then(res => {
          // console.log(res)
          if (res.status === 'ok') {
            that.$alert(res.data.msg, 'Prompt', {
              confirmButtonText: 'Confirm'
            })

            that.back()
            that.initData()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Deleting Cancelled'
        })
      })
    },
    handleEdit(index, row) {
      var that = this
      that.displayForm = true
      that.displayEditList = false
      that.isEdit = true

      that.$nextTick((res) => {
        that.form.name = row.name
        that.form.id = row.id
        that.form.json = row.json
        that.$refs.makingform.setJSON(JSON.parse(row.json))
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.copy{
  cursor: pointer;
}

/deep/ .el-pagination{
  margin-top: 15px;
  margin-left: -7px;
}

/deep/ a{
  margin-right: 10px;
}
/deep/ a:hover{
  color: #409eff;
}

/deep/ .el-table td{
  padding-bottom: 0px;
  padding-top: 5px;
}

/deep/ tr:hover{
  background-color: #3b3363;
}

/deep/ .el-upload-dragger{
  background-color: inherit;
}

@import "~@/styles/mixin.scss";
    .upload-container {
        width: 100%;
        position: relative;
        margin-bottom: 20px;
        @include clearfix;
        .image-uploader {
            width: 60%;
            float: left;
        }
        .image-preview {
            width: 200px;
            height: 200px;
            position: relative;
            border: 1px dashed #d9d9d9;
            float: left;
            margin-left: 50px;
            .image-preview-wrapper {
                position: relative;
                width: 100%;
                height: 100%;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .image-preview-action {
                position: absolute;
                width: 100%;
                height: 100%;
                left: 0;
                top: 0;
                cursor: default;
                text-align: center;
                color: #fff;
                opacity: 0;
                font-size: 20px;
                background-color: rgba(0, 0, 0, .5);
                transition: opacity .3s;
                cursor: pointer;
                text-align: center;
                line-height: 200px;
                .el-icon-delete {
                    font-size: 36px;
                }
            }
            &:hover {
                .image-preview-action {
                    opacity: 1;
                }
            }
        }
    }

</style>

