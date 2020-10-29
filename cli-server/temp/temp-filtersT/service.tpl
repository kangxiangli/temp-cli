/**
 * Created by <%=author%> on <%=curDate%><% var mName=name.split("-")[0];%>
 */
const BASE_URL = ''
const API = {
  // <%=cnName%>表格请求
  TABLE: {
    url: BASE_URL + '/query',
    tag: 'table-loading',
    method: 'post'
  },
  EDIT_<%= mName %>: {
    url: BASE_URL,
    tag: 'edit-<%= mName %>'
  },
  DELETE: {
    url: `${BASE_URL}/delete`,
    method: 'post',
    tag: 'delete-<%= mName %>'
  }
}
export default {
  methods: {
    /**
     * 列表数据获取
     * <%=cnName%>
     */
    async getTableData () {
      this.tableData = await this.requestTable({
        ...API.TABLE,
        currentObj: this.tableData,
        params: { ...this.form }
      }, { noTime: true })
    },
     async deleteData (ids) {
      await this.$request({
        ...API.DELETE,
        data: { ids }
      }, { isPromptError: false })
    },
    async saveData (type, data) {
      await this.$request({
        ...API.EDIT,
        method: type === 'add' ? 'post' : 'put',
        data: type === 'add' ? { } : {}
      })
    }
  }
}
