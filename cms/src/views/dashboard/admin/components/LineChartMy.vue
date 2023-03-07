<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      /* this.chart = echarts.init(this.$el, 'macarons') */
      this.chart = echarts.init(this.$el, 'dark')
      this.setOptions(this.chartData)
    },
    setOptions({ expectedData, actualData } = {}) {
      this.chart.setOption({
        title: {
          text: 'Market Overview',
          subtext: 'Learn to Earn',
          left: '40',
          top: 'auto',
          right: 'auto',
          bottom: 'auto'
        },
        backgroundColor: {
          type: 'radial',
          x: 0.3,
          y: 0.3,
          r: 0.8,
          colorStops: [
            {
              offset: 0,
              color: '#3B3363'
            },
            {
              offset: 1,
              color: '#3B3363'
            }
          ]
        },
        xAxis: {
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          boundaryGap: false,
          offset: 10,
          axisLine: {
            lineStyle: {
              color: '#483F79'
              // ...
            }
          },
          axisLabel: {
            color: '#808080'
          },
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 20,
          right: 20,
          bottom: 30,
          top: 60,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          splitLine: {
            show: true,
            lineStyle: {
              color: '#483F79',
              type: 'solid'
            }
          },
          axisTick: {
            show: false
          },
          offset: 10,
          axisLine: {
            show: false,
            lineStyle: {
              color: '#483F79'
            }
          },
          axisLabel: {
            color: '#808080'
          }
        },
        legend: {
          data: ['expected', 'actual']
        },
        series: [{
          name: 'expected', itemStyle: {
            normal: {
              color: '#FF005A',
              lineStyle: {
                color: '#FFAB2D',
                width: 4,
                shadowColor: 'rgb(255, 171, 45, 0.82)',
                shadowBlur: 20
              }
            }
          },
          smooth: true,
          type: 'line',
          data: expectedData,
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
        },
        {
          name: 'actual',
          smooth: true,
          type: 'line',
          itemStyle: {
            normal: {
              color: '#3888fa',
              lineStyle: {
                color: '#00ADA3',
                width: 4,
                shadowColor: 'rgb(0, 173, 163, 0.82)',
                shadowBlur: 20
              },
              areaStyle: {
                color: '#00ADA3',
                opacity: 0.12
              }
            }
          },
          data: actualData,
          animationDuration: 2800,
          animationEasing: 'quadraticOut'
        }]
      })
    }
  }
}
</script>
