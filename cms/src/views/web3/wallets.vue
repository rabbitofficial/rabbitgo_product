<template>
  <div style="padding: 30px;" class="main">
    <el-table
      :data="tableData"
      border
      style="width: 100%"
    >
      <!-- 'id': 10,
          'wallet': '',
          'head': '',
          'points': '',
          'timestamp': '',
          'tokens': 0,
          'nft': '',
          'tg_first_name': '',
          'tg_last_name': '',
          'tg_language_code': '',
          'tg_username': '',
          'tg_id': 0 -->
      <el-table-column
        label="Index"
        width="100"
      >
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="wallet"
        label="Wallet"
      />
      <el-table-column
        prop="points"
        label="Eggs"
      />
      <el-table-column
        prop="tg_first_name"
        label="Tg FirstName"
      />
      <el-table-column
        prop="tg_last_name"
        label="Tg-LanstName"
      />
      <el-table-column
        prop="tg_language_code"
        label="Language-Code"
      />
      <el-table-column
        prop="tg_username"
        label="Tg-Username"
      />
      <el-table-column
        prop="tg_id"
        label="Tg-Id"
      />
      <el-table-column
        prop="timestamp"
        label="Register Time"
      />
      <!-- <el-table-column align="center" label="operations">
        <template slot-scope="scope">
          <el-button type="success" size="small" @click="handleEdit(scope)">Edit</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">Delete</el-button>
        </template>
      </el-table-column> -->
    </el-table>
  </div>
</template>

<script>
import { userList } from '@/api/web3users'
export default {
  components: {
    // tinymce
  },
  data() {
    return {
      tableData: [
        {
          'id': 10,
          'wallet': '',
          'head': '',
          'points': '',
          'timestamp': '',
          'tokens': 0,
          'nft': '',
          'tg_first_name': '',
          'tg_last_name': '',
          'tg_language_code': '',
          'tg_username': '',
          'tg_id': 0
        }
      ]
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    initData() {
      var that = this
      userList().then(res => {
        console.log(res)
        that.tableData = res.data
      }).catch(e => {
        // console.log(e)
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

