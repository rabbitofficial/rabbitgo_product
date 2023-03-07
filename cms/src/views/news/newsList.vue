<template>
  <div style="padding: 30px;">
    <!-- <fm-making-form style="height: calc(100vh - 84px);" preview generate-code generate-json /> -->
    <div style="height: 50px;">
      <el-button type="primary" @click="newForm">New Forms</el-button>
    </div>

    <el-dialog
      title="Form Preview"
      :visible.sync="quickViewForm"
      width="60%"
      center
    >
      <div class="a">
        <fm-generate-form
          ref="generateViewForm"
          :data="jsonViewData"
          :value="editViewData"
          :edit="false"
          @on-change="onChange"
        />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="quickViewForm = false">Confirm</el-button>
        <el-button type="primary" @click="viewData">View Data</el-button>
      </span>
    </el-dialog>

    <div v-if="displayEditList" class="">
      <el-table
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column
          prop="id"
          label="id"
          width="180"
        />
        <el-table-column
          prop="name"
          label="name"
          width="180"
        />

        <el-table-column
          prop="create_time"
          label="Time"
          width="180"
        />
        <el-table-column
          label="Operation"
        >
          <template slot-scope="scope">
            <el-button type="text" @click="handleView(scope.$index, scope.row)">View</el-button>
            <el-button type="text" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
            <el-button type="text" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <template>
      <fm-making-form
        v-if="displayForm"
        ref="makingform"
        style="height: calc(100vh - 194px);"
        preview
        :generate-code="false"
        :generate-json="true"
        :upload="false"
      >
        <template slot="action">
          <div class="codeWrap">
            <el-tag style="font-size: 13px;margin-right: 10px;" effect="dark" type="primary">{{ isEdit?"Editing":"Creating" }}</el-tag>
            <el-input v-model="form.name" class="code" placeholder="Please input form name" size="mini" />
            <el-button class="" type="primary" size="mini" @click="saveServer">Submit</el-button>
            <el-button v-if="displayForm" class="" type="danger" size="mini" @click="back">Cancel</el-button>
          </div>
        </template>
      </fm-making-form>
    </template>

  </div>
</template>

<script>
import { getForms, createForm, editForm, deteleForm } from '@/api/customForms'
import { isNotEmpty } from '@/utils/validate'
export default {
  data() {
    return {
      jsonViewData: { 'list': [], 'config': { 'labelWidth': 100, 'labelPosition': 'right', 'size': 'small' }},
      editViewData: { myname: '' },
      form: {
        name: '',
        id: '',
        json: ''
      },
      quickViewForm: false,
      displayForm: false,
      displayEditList: true,
      tableData: [],
      isEdit: false
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    onChange(field, value) {
      console.log(field)
      console.log(value)
    },
    viewData() {
      console.log(JSON.stringify(this.editViewData))
    },
    initData() {
      var that = this
      getForms().then(res => {
        console.log(res)
        that.tableData = res.data
      })
    },
    resetForm1() {
      var that = this
      that.$nextTick(() => {
        that.form.id = ''
        that.form.name = ''
        that.form.json = ''
        that.$refs.makingform.setJSON({ 'list': [], 'config': { 'labelWidth': 100, 'labelPosition': 'right', 'size': 'small' }})
      })
    },
    resetForm2() {
      var that = this
      that.form.id = ''
      that.form.name = ''
      that.form.json = ''
      that.$refs.makingform.setJSON({ 'list': [], 'config': { 'labelWidth': 100, 'labelPosition': 'right', 'size': 'small' }})
    },
    back() {
      var that = this
      that.displayForm = false
      that.displayEditList = true
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
    handleView(index, row) {
      var that = this
      that.quickViewForm = true

      that.jsonViewData = JSON.parse(row.json)
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
    },
    saveLocal() {
      var json = this.$refs.makingform.getJSON()
      this.form.json = json
    },
    saveServer() {
      var that = this
      that.saveLocal()
      var form = { name: that.form.name }
      var result = isNotEmpty(form, ['name'], this)

      if (result) {
        that.form.json = JSON.stringify(that.form.json)
        // 新增
        if (!that.isEdit) {
          createForm(that.form).then(res => {
            if (res.status === 'ok') {
              that.back()
              that.initData()
            }
            that.$alert(res.data.msg, 'Prompt', {
              confirmButtonText: 'Confirm'
            })
          })
        } else {
          editForm(that.form).then(res => {
            if (res.status === 'ok') {
              that.back()
              that.initData()
            }
            that.$alert(res.data.msg, 'Prompt', {
              confirmButtonText: 'Confirm'
            })
          })
        }
      }
    },
    newForm() {
      var that = this
      that.displayForm = true
      that.displayEditList = false
      that.isEdit = false
      that.resetForm1()
    }
  }
}
</script>

  <style scoped>

    .codeWrap{
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 15px;
      height: 100%;
    }

    .code{
      margin-right:15px;
      width: 120px;
    }

  </style>

