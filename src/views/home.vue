<template>
    <div class="all">
        <el-row :gutter="40">
            <el-col :span="6">
                <div class="box">
                    <el-avatar :icon="UserFilled" :size="80" />
                    <div>
                        <h3>住户数量</h3>
                        <h1>15100</h1>
                    </div>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="box">
                    <el-avatar :icon="House" :size="80" />
                    <div>
                        <h3>房屋总数量</h3>
                        <h1>1900</h1>
                    </div>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="box">
                    <el-avatar :icon="Van" :size="80" />
                    <div>
                        <h3>车位总数量</h3>
                        <h1>1800</h1>
                    </div>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="box">
                    <el-avatar :icon="Tools" :size="80" />
                    <div>
                        <h3>设备总数量</h3>
                        <h1>1600</h1>
                    </div>
                </div>
            </el-col>
        </el-row>
        <div ref="surface" class="surface"></div>
        <div ref="surface2" class="surface2"></div>
    </div>
</template>

<script setup>
import { UserFilled, House, Van, Tools } from '@element-plus/icons-vue'
import { defineComponent, ref, computed, watchEffect } from 'vue';
import * as echarts from 'echarts';
const surface = ref()
const surface2 = ref()
const y1 = ref(800)
const y2 = ref(1000)
const y3 = ref(700)
const y4 = ref(500)
const option = computed(() => {
    return {
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['04-01', '04-02', '04-03', '04-04']
        },
        yAxis: {
            type: 'value'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
                offset: 0, color: 'rgb(0, 123, 231)'// 0% 处的颜色
            }, {
                offset: 1, color: 'rgba(0, 123, 231, 0.166)' // 100% 处的颜色
            }],
            globalCoord: false // 缺省为 false
        },
        series: [
            {
                data: [y1.value, y2.value, y3.value, y4.value],
                type: 'line',
                areaStyle: {}
            }
        ]
    }
})
const option2 = computed(() => {
    return {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: '5%',
            left: 'center'
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '40',
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    { value: 1048, name: 'Search Engine' },
                    { value: 735, name: 'Direct' },
                    { value: 580, name: 'Email' },
                    { value: 484, name: 'Union Ads' },
                    { value: 300, name: 'Video Ads' }
                ]
            }
        ]
    };
})
const myChart = computed(() => {
    return echarts.init(surface.value)
})
const myChart2 = computed(() => {
    return echarts.init(surface2.value)
})

defineComponent({
    name: 'HomeView'
});
watchEffect(() => {
    option.value && myChart.value.setOption(option.value);
}, {
    flush: 'post'
})
watchEffect(() => {
    option2.value && myChart2.value.setOption(option2.value);
}, {
    flush: 'post'
})


</script>

<style scoped lang="scss">
.all {
    margin-top: 20px;
    overflow-x: hidden;
    .surface {
        float: left;
        width: 60%;
        height: 500px;
    }

    .surface2 {
        float: right;
        width: 40%;
        height: 500px;
    }

    .box {
        position: relative;
        height: 100px;
        text-align: center;
        background-color: rgba(183, 183, 183, 0.584);

        div {
            position: relative;
            left: 30px;

            h3 {
                line-height: 50px;
            }

            h1 {
                line-height: 20px;
            }
        }

        .el-avatar {
            position: absolute;
            top: 10px;
            left: 30px;
            font-size: 55px;
        }

    }
}
</style>