<script>
// import TheWelcome from '../components/TheWelcome.vue'
import { instance } from '@/axios.js'
import * as echarts from 'echarts';
import { onMounted } from 'vue';
import { ref } from 'vue'
import { connectWebsocket } from '@/api/websocket'
export default {
  // `setup` 是一个特殊的钩子，专门用于组合式 API。

  setup() {
    // const getVideoData = get('/helloword').then(res=>console.log(res.data))
    // console.log(getVideoData)
    async function bu() {
      let result = await instance.get('/video_feed')
      console.log(result)

    }
    onMounted(() => {
      var chartDom = document.getElementById('main');
      var myChart = echarts.init(chartDom, 'dark');

      var option;

      const data = [
        [10, 45],
        [20, 90]
      ];
      const isAlam = [0, 1];

      option = {
        title: {
          text: '监控现场状态图',
          left: 'center'
        },

        polar: {},
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        angleAxis: {
          type: 'value',
          startAngle: 0,
          min: 0, // 添加最小角度值
          max: 360 // 添加最大角度值
        },
        radiusAxis: {},
        series: [

          {
            type: 'effectScatter',
            showEffectOn: 'render',  //'render' 绘制完成后显示特效,'emphasis' 高亮（hover）的时候显示特效。
            rippleEffect: { //设置涟漪动画样式
              // color:'purple',  //涟漪颜色,默认为散点自身颜色
              // brushType:'fill' //动画方式,全填充或只有线条,'stroke'
              period: 4,  //动画周期
              scale: '2.5',  //涟漪规模
              brushType: 'fill'
            },
            coordinateSystem: 'polar',
            name: 'line',
            //   type: 'scatter', // 将类型改为散点图
            data: data,
            itemStyle: {
              // 在这里添加自定义样式配置
              //  color: 'red', // 设置点的颜色为红色
              size: 10,// 设置点的大小为10像素
              color: function (params) // 包含了seriesIndex, dataIndex, data, value等参数
              {

                if (isAlam[params.dataIndex] == 0) {
                  return 'red';
                } else {
                  return '#5bff4a';
                }

              },
              label: {
                show: true,
                fontSize: 5
              }
            },
          }
        ]
      };
      myChart.setOption(option)
      // websocket连接
       connectWebsocket()

    })
    const isOK = ref(1)
    const value = ref('')

    const options = [
      {
        value: 'Option1',
        label: '设备1',
      },
      {
        value: 'Option2',
        label: '设备2',
      },
      {
        value: 'Option3',
        label: '设备3',
      },

    ]

    // 将 ref 暴露给模板
    return {
      value,
      options,
      isOK
    }
  }
}
</script>

<template>
  <div class="container">
    <div style="display: flex;">
      <el-select v-model="value" placeholder="Select" size="large" style="width: 240px;color: white;">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.label" />
      </el-select>
      <div class="second1">总数</div>
      <div class="second2">8</div>
      <div class="second1">正常</div>
      <div class="second2" style="color: green">8</div>
      <div class="second1">警告</div>
      <div class="second2" style="color: red">0</div>
      <div class="second1">总数</div>
      <div class="second2">8</div>
      <div style="color: #ffffff; position: absolute; right: 10px; line-height: 40px">
        数据更新时间:
      </div>
      <div v-show="isOK" class="item2"></div>
      <div v-show="!isOK" class="item3"></div>
      <div style="color: white">运行正常</div>
    </div>
    <div style="display: flex;margin-top: 50px;justify-content: space-around">
      <div class="add">
        <div class="table-container">
          <table>
            <tbody>
              <tr>
                <td>设备名称</td>
                <td>{{value}}</td>
              </tr>
              <tr>
                <td>设备角度</td>
                <td>10</td>
              </tr>
              <tr>
                <td>设备中心距</td>
                <td>30</td>
              </tr>
              <tr>
                <td>设备地址</td>
                <td>c11，205室</td>
              </tr>
              <tr>
                <td>置信度</td>
                <td>90%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="video1">
        <!-- <img src="">http://192.168.10.104:5000/video_feed -->
      </div>
      <div id="main" style="height: 500px;width: 500px">
      </div>
    </div>
  </div>
</template>
<style scoped>
.container {
  height: 100%;
  width: 100%;
  padding-top: 20px;
  padding-left: 20px;
  background-color: #100c2a;
}

.video1 {
  height: 400px;
  width: 500px;
  background-color: black;
  border: 10px solid green;
}

.second1 {
  width: 57.3px;
  height: 40px;
  line-height: 40px;
  font-size: 20px;
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
  color: #6b749f;
  background: #292c41;
  margin-left: 20px;
  text-align: center;
  color: #ffffff;
}

.second2 {
  font-size: 30px;
  font-family: "UnidreamLED";
  width: 57.3px;
  height: 40px;
  line-height: 40px;
  color: #6b749f;
  background-color: #222436;
  border-top-right-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  margin-right: 20px;
  text-align: center;
  color: #ffffff;
}

@keyframes scale {
  0% {
    transform: scale(1);
  }

  50%,
  75% {
    transform: scale(3);
  }

  78%,
  100% {
    opacity: 0;
  }
}

.item2 {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: #5bff4a;
  margin: 13px;
}

.item2:before {
  content: '';
  display: block;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: #5bff4a;
  opacity: 0.7;
  animation: scale 2s infinite cubic-bezier(0, 0, 0.49, 1.02);
  animation-delay: 100ms;
}

.item3 {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: red;
  margin: 13px;
}

.item3:before {
  content: '';
  display: block;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: red;
  opacity: 0.7;
  animation: scale 2s infinite cubic-bezier(0, 0, 0.49, 1.02);
  animation-delay: 100ms;
}
.el-select__wrapper {
  align-items: center;
  background-color: #222436;
  border: none;
}

.el-select__placeholder {
  color: white;
}



.table-container {
  background-color: #f0f0f0;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid blue;
  padding: 8px;
  text-align: left;
  background-color: #25273a;
  color: white;
}

th {
  background-color: #25273a;
}
</style>