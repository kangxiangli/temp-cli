/**
 * Created by <%=author%> on <%=curDate%> <% var mName=name.split("-")[0];%>
 */
import globalMixins from '@/mixins/globalMixins.js'
import { mapGetters } from 'vuex'
import service from './<%=name%>-service.js'
export default {
  name: '<%=name%>',
  mixins: [globalMixins,service],
  props: {},
   computed: {
    ...mapGetters('', []),
    filterItems () {
      return {
         searchTime: {
          name: '时间范围',
          type: 'idssTimeSelect',
          props: {
            noTimeRange: true
          }
        },
      }
    }
  },
  data () {
    return {
      form: {},
      selectionIds: [],
      <%= mName %>TableData: {
        data: []
      }
    }
  },
  methods: {
      /* 过滤条件 */
    filtersSubmit (params) {
      this.<%= mName %>TableChange({ type: 'submit' })
    },
    /* 表格 */
    // table:表头过滤
    filterChange (params) {
      for (let key in params) {
        this.$set(this.form, key, params[key])
      }
      this.<%= mName %>TableChange({ type: 'submit' })
    },
    // table:selection 选择
    handleSelectionChange (rows) {
      this.selectionIds = []
      if (rows && rows.length) {
        rows.map(row => {
          this.selectionIds.push(row.id)//根据业务需求修改
        })
      }
    },
    // table:change
    <%= mName %>TableChange (params = { type: 'refresh' }) {
      this.tableChange(params, this.<%= mName %>TableData, this.getTableData)
    }
  }

}

