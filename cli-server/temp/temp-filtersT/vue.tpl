/**
 * Created by <%=author%> on <%=curDate%> <% var mName=name.split("-")[0];%>
 */
<template>
  <div class="<%=name%>-page">
   <idss-widget :footer-style="{padding:'8px 16px'}" :header-style="{padding: '16px'}">
      <!-- 左侧过滤条件 -->
      <template slot="title-left">
        <idss-filters :filter-items="filterItems" :default-params="form" @submit="filtersSubmit"></idss-filters>
      </template>

      <!-- 右侧操作按钮 -->
      <template slot="title-right">
        <el-button size="small" type="danger" :disabled="!selectionIds.length" :loading="loading['table']" @click="deletes">
          <idss-icon-svg name="delete-hover"></idss-icon-svg>
          <span class="idss-margin--l-s">删除</span>
        </el-button>
        <el-button size="small" type="primary" @click="openDialog('add')">
          <idss-icon-svg name="add"></idss-icon-svg>
          <span class="idss-margin--l-s">新增</span>
        </el-button>
      </template>

      <!-- <%=cnName%>表格start -->
      <template>
        <el-table
          :data="<%= mName %>TableData.data"
          border
          stripe
          style="width:100%;"
          v-loading="loading['table-loading']"
          @selection-change="handleSelectionChange"
          @filter-change="filterChange">
          <template slot="empty">
            <idss-no-data></idss-no-data>
          </template>
          <el-table-column type="selection" width="40" align="center"></el-table-column>
          <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
          <el-table-column prop="assetIp" label="IP地址" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="version" label="软件版本" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="assetName" label="资产名称" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="assetType" label="资产类型" align="center" show-overflow-tooltip column-key="assetTypeList" :filters="assetCategoryList">
            <template v-slot="{row}">
              <span>{{row.assetTypeValue}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="启动时间" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="updateTime" label="最后一次时间" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="agentState" label="状态" align="center" show-overflow-tooltip column-key="agentStatusList" :filters="agentStateList"></el-table-column>
          <el-table-column label="操作" align="center" show-overflow-tooltip>
            <template v-slot="{row}">
              <el-button size="mini" type="primary" plain @click="openDialog('edit', row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <!-- 分页 -->
      <template slot="footer">
        <idss-pagination
          :tableData="<%= mName %>TableData"
          @page-change="<%= mName %>TableChange"
          @size-change="<%= mName %>TableChange">
        </idss-pagination>
      </template>
    <!-- <%=cnName%>end -->
    </idss-widget>
    <!-- 新增/编辑 start-->
    <template>
      <idss-static-frame
        width="50%"
        height='100vh'
        :title="optType === 'add' ? '新增' : '编辑'"
        :close-on-click-modal="false"
        :main-style="{padding: '16px 32px'}"
        :show-close="false"
        :visible.sync="dialogVisible">
        <div>
          <el-form
            label-width="100px"
            size="medium"
            ref="editForm"
            class="idss-margin--t-m"
            max-height="400px"
            :model="editForm"
            :rules="editFormRules">

          </el-form>
          <div slot="footer" class="idss-txt--center">
            <el-button size="medium" type="primary" @click="save">确 定</el-button>
            <el-button size="medium" @click="closeDialog">取 消</el-button>
          </div>
        </div>
      </idss-static-frame>
    </template>
  <!-- 新增/编辑 end-->
  </div>
</template>

<script>
import globalMixins from '@/mixins/globalMixins.js'
import { debounce } from '@utils'
import { mapGetters } from 'vuex'
import table from './table.js'
import service from './<%=name%>-service.js'
<% if (isFolder) {%>import Container from '../../container'<% } %>
<% if (!isFolder) {%>import Container from '../container'<% } %>
export default {
  name: '<%=name%>',
   // table mixins 为基础实现（可覆盖）
  mixins: [globalMixins,table,service],
  components: {},
  props: {},
  data () {
    return {
      optType: 'add',
      dialogVisible: false, // 弹窗开关
      editForm: {},
    }
  },
  methods: {
    /* 删除 */
    deletes: debounce(async function () {
    // 确认提示
      await this.confirmBox({
        message: `是否要删除数据吗?`,
        title: '提示',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      try {
        await this.deleteData(this.selectionIds)
        this.showMessage('删除成功!')
        await this.<%= mName %>TableChange({ type: 'submit' })
      } catch (err) {
        this.showMessage(err.message, 'error')
      }
    }, 300),
      /* 新增/编辑 */
    openDialog (optType = 'add', row = {}) {
      this.optType = optType
      this.dialogVisible = true
      this.editForm = Object.assign(this.editForm, row)
    },
     save () {
      this.$refs['editForm'].validate(async (valid) => {
        if (valid) {
          await this.saveData(this.optType, this.editForm)
          this.closeDialog()
          this.<%= mName %>TableChange({ type: 'submit' })
        }
      })
    },
    closeDialog () {
      this.$refs['editForm'].resetFields()
      this.dialogVisible = false
    },

    /* 初始化 */
    init () {
      this.globalTime.timeFlag = 1
      this.$set(this.form, 'createTime', this.globalTime)
      this.<%= mName %>TableChange({ type: 'init' })
    }
  },
 created () {
    this.init()
  }
}
</script>
