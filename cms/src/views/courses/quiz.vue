<template>
  <div style="padding: 30px;">
    <!-- <fm-making-form style="height: calc(100vh - 84px);" preview generate-code generate-json /> -->
    <div style="height: 50px;">
      <el-button type="primary" @click="newForm">New Lesson</el-button>
    </div>

  </div>
</template>

<script>
import { createForm, editForm, deteleForm } from '@/api/customForms'
import { isNotEmpty } from '@/utils/validate'
export default {
  data() {
    return {

    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    initData() {
      /* var that = this
      getForms().then(res => {
        console.log(res)
        that.tableData = res.data
      }) */
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

  </style>

