<template>
  <div>
    <svg
      v-if="Array.isArray(data) && data.length > 0"
      width="100%"
      height="100%"
      :viewBox="`0 0 ${direction === 'horizontal' ? '600 300' : '300 600'}`"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg">
      <g :transform="`${direction === 'horizontal' ? 'rotate(0)' : 'translate(300,0)rotate(90)'}`">
        <!-- 中线 -->
        <line x1="0" y1="150" x2="600" y2="150" :style="config.mediumLine" />
        <!-- 节点 -->
        <g
          :transform="`translate(${index * gap + 50},150)`"
          v-for="(item, index) in data"
          :key="index">
          <line x1="0" y1="0" x2="0" :y2="`${generatePos(50, index)}`" :style="config.nodeLine" />
          <!-- 用于替代圆环样式 -->
          <slot>
            <template v-for="n in 3">
              <circle
                cx="0"
                cy="0"
                :r="3 * (n + 1)"
                :key="n"
                :opacity="1 - 0.2 * n"
                :style="config.nodeStartCircle"/>
            </template>
          </slot>
          <circle cx="0" :cy="`${generatePos(50, index)}`" r="5" :style="config.nodeEndCircle" />
          <g
            @click="handleClick(item, index)"
            :transform="`translate(${direction === 'horizontal' ? '0' : `${generatePos(15, index)}`}, ${generatePos(direction === 'horizontal' ? '90' : '110', index)})rotate(${direction === 'horizontal' ? '0' : '-90'})`">
            <rect
              :x="-config.textContainer.width / 2"
              :y="`${index % 2 === 0 ? 0 : -30}`"
              :style="config.textContainer"/>
            <text x="0" :y="`${generatePos(-15, index)}`" :style="config.text">{{item.name}}</text>
            <text x="0" :y="`${generatePos(15, index)}`" :style="config.text">{{item.value}}</text>
          </g>
        </g>
      </g>
    </svg>
    <div class="nodata" v-else>
      <span>暂无数据</span>
    </div>
    <slot name="empty"></slot>
  </div>
</template>

<script>
/**
 * svg视口（viewbox）
 * svg视口是对内的，他提供给svg标签内部环境一个自定义的坐标系, 而width和height属性是对外的，用来告知外界svg这个对象在document中的大小
 */
import { merge } from '../utils/base.js'
const baseStyleConfig = {
  // 中线样式
  mediumLine: {
    stroke: '#46A0D4',
    strokeWidth: 1
  },
  // 节点起始端圆环样式 (中线上圆环)
  nodeStartCircle: {
    fill: '#72C4EF'
  },
  // 节点分支线样式
  nodeLine: {
    stroke: '#46A0D4'
  },
  // 节点末端圆环样式
  nodeEndCircle: {
    fill: '#72C4EF'
  },
  // 文本矩形矩形容器样式
  textContainer: {
    width: '100',
    height: '30',
    fill: '#46A0D4',
    stroke: '#46A0D4',
    fillOpacity: 0.4,
    rx: 2
  },
  // 文本样式
  text: {
    fontSize: '18px',
    fontFamily: 'PingFangSC-Regular, PingFang SC',
    fontWeight: 'bold',
    fill: '#C9F6FF',
    textAnchor: 'middle',
    dominantBaseline: 'middle'
  }
}

/**
 * @name 攻击链
 * @event {Function} clickItem 点击事件
 * @props {Array} data $$_数据项
 * @props {String} direction 方向
 * @props {Object} styleConfig 样式配置项
 */
export default {
  name: 'idss-kill-chain',
  props: {
    data: {
      type: Array,
      default: function () {
        return []
      }
    },
    direction: {
      type: String,
      default: 'horizontal'
    },
    // 样式配置项  ！！！请注意: 不要使用px等其他任何css单位, 具体原因请补习svg 【viewbox】相关知识
    styleConfig: {
      type: Object,
      default: function () {
        return baseStyleConfig
      }
    }
  },
  computed: {
    // 相邻节点之间的间隔, 默认根据数据进行计算  计算公式: (直线长度 - 左右留白) / (节点数量 - 1)
    gap () {
      return 500 / (this.data.length - 1)
    }
  },
  data () {
    return {
      // 样式配置项
      config: {}
    }
  },
  methods: {
    /**
     * 动态生成节点位置
     * @param { Number } dis 节点间距
     * @param { Number } idx 数据下标
     */
    generatePos (dis, idx) {
      return dis * (idx % 2 === 0 ? -1 : 1)
    },
    /**
     * 冒出事件
     */
    handleClick (item, index) {
      this.$emit('clickItem', item, index)
    }
  },
  created () {
    this.config = merge(baseStyleConfig, this.styleConfig)
  }
}
</script>
<style>
.nodata {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
