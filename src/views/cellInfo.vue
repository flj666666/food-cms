<template>
    <h2 class="all">新建小区</h2>
    <div class="box">
        <h4 class="all1">基础信息</h4>
        <el-form label-width="150px" class="cellinfo-wrapper" :model="ruleForm" status-icon :rules="rules"
            ref="ruleFormRef">
            <el-form-item label="小区名称" prop="name">
                <el-input placeholder="请输入" v-model="ruleForm.name" />
            </el-form-item>
            <el-form-item label="小区编号" prop="number">
                <el-input placeholder="请输入" v-model="ruleForm.number" />
            </el-form-item>
            <el-form-item label="所属地区" prop="region">
                <el-input placeholder="请选择地区" v-model="ruleForm.region" />
            </el-form-item>
            <el-form-item label="详细地址" prop="detailed">
                <el-input placeholder="请输入" v-model="ruleForm.detailed" />
            </el-form-item>
            <el-form-item label="建成时间" prop="date">
                <div class="demo-date-picker">
                    <div class="block">
                        <el-date-picker v-model="ruleForm.value1" type="date" placeholder="请输入日期" />
                    </div>
                </div>
            </el-form-item>

            <el-form-item label="小区面积/m²" prop="small">
                <el-input v-model="ruleForm.small" />
            </el-form-item>

            <el-form-item label="小区图片" prop="file">
                <!-- :show-file-list="false" 不显示文件列表 -->
                <el-upload class="avatar-uploader" v-model="ruleForm.file" :http-request="handleUpload"
                    :show-file-list="false">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                    <el-icon v-else>
                        <PictureFilled />
                    </el-icon>
                </el-upload>
            </el-form-item>
            <el-form-item label="小区简介" prop="introduction">
                <el-input class="introduction" v-model="ruleForm.introduction" />
            </el-form-item>
            <el-form-item label="姓名" prop="names">
                <el-input placeholder="请输入" v-model="ruleForm.names" />
            </el-form-item>
            <el-form-item label="微信" prop="wechat">
                <el-input placeholder="请输入" v-model="ruleForm.wechat" />
            </el-form-item>
            <el-form-item label="电话" prop="telphone">
                <el-input placeholder="请输入" v-model="ruleForm.telphone" />
            </el-form-item>
            <el-form-item class="el-button0">
                <el-button type="warning" prop="submit" @click="submitForm($refs.ruleFormRef)">提交</el-button>
                <el-button type="primary" prop="returns">返回</el-button>
            </el-form-item>
        </el-form>
    </div>


</template>

<script>
import { ElMessage } from 'element-plus';
export default {
    name: 'CellInfo',
    data() {
        return {
            ruleForm: {
                name: '',
                number: '',
                region: '',
                detailed: '',
                small: '',
                introduction: '',
                names: '',
                wechat: '',
                telphone: '',
                file: '',
                value1: '',
            },
            imageUrl: '',
            rules: {
                name: [
                    { required: true, message: '请输入小区名称', trigger: 'blur' }
                ],
                number: [
                    { required: true, message: '请输入小区编号', trigger: 'blur' }
                ],
                region: [
                    { required: true, message: '请输入所属地区', trigger: 'blur' }
                ],
                detailed: [
                    { required: true, message: '请输入详细地址', trigger: 'blur' }
                ],
                small: [
                    { required: true, message: '请输入小区面积', trigger: 'blur' }
                ],

                introduction: [
                    { required: true, message: '请输入小区简介', trigger: 'blur' }
                ],

                names: [
                    { required: true, message: '请输入姓名', trigger: 'blur' }
                ],
                wechat: [
                    { required: true, message: '请输入微信', trigger: 'blur' }
                ],

                telphone: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    { pattern: /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/, message: '请输入正确的手机号', trigger: 'blur' }
                ],
                value1: [
                    { required: true, message: '请输入时间', trigger: 'blur' }
                ],
                file: [
                    { required: true, message: '请上传图片', trigger: 'blur' }
                ]

            }
        }
    },
    methods: {
        submitForm(formEl) {
            if (!formEl) return
            formEl.validate((valid) => {
                if (valid) {
                    // console.log(this.ruleForm)
                    this.$store.dispatch('cellInfo/update', this.ruleForm).then((res) => {
                            console.log(res.data);
                            ElMessage.success('提交成功')
                        
                        
                    })
                } else {
                    console.log('error submit!')
                    return false
                }
            })
        },
        handleUpload(options) {
            //console.log(options.file)  // 获取到上传的文件
            //做预览图片
            this.imageUrl = URL.createObjectURL(options.file)
            //放置上传给后端的文件
            this.ruleForm.file = options.file
        }
    },
    value: () => {
        const date = new Date()
        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
        return date

    },
}
</script>

<style scoped>
.all {
    margin: 30px 100px 20px 100px;

}

.box {
    background: #fff;
    display: flex;
    height: 1000px;
    width: 1000px;
    margin-left: 100px;
    border: 1px solid #ccc;
    border-radius: 10px;
}

.box {
    margin-bottom: 40px;
}

.box .all1 {
    font-weight: normal;
    margin-top: 15px;
    margin-left: 15px;
}

.box .el-form {
    margin-top: 80px;
    height: 100%;
}

.cellinfo-wrapper {
    width: 500px;
}

.avatar-uploader {
    width: 178px;
    height: 178px;
    display: block;
    border: 1px solid #ccc;
    line-height: 178px;
    text-align: center;
}

.avatar-uploader .el-icon {
    color: #ccc;
    font-size: 30px;
}

.el-button0 {
    margin-top: 40px;
}

.introduction {
    height: 100px;
}

.avatar {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>