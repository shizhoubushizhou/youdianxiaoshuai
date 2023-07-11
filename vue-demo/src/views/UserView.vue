<template>
    <div class="user">
        <div class="top">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="姓名">
                    <el-input v-model="formInline.name" placeholder="姓名" />
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="formInline.email" placeholder="邮箱" />
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="formInline.phone" placeholder="手机号" />
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="onSearch">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="main">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/' }">分类管理</el-breadcrumb-item>
                <el-breadcrumb-item>分类列表</el-breadcrumb-item>
            </el-breadcrumb>
            <el-button class="add" @click="drawer = true">添加</el-button>


            <el-table :data="tableData" style="width: 100%; margin-bottom: 20px" row-key="id" border>
                <el-table-column prop="id" label="编号" sortable />
                <el-table-column prop="name" label="分类名称" sortable />
                <el-table-column prop="status" label="状态" sortable>
                    <template #default="scope">
                        <el-switch v-model="scope.row.status" @change="changeStatus($event, scope.row.id)" :active-value="1"
                            :inactive-value="0" />
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="操作" sortable>
                    <template #default="scope">
                        <el-button type="primary" text @click="changedrawer1(scope.row.name, scope.row.id)">编辑</el-button>
                        <el-button type="danger" text @click="del">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>




        <!-- 添加 -->
        <el-drawer v-model="drawer" title="添加分类" :with-header="false">
            <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm"
                :size="formSize" status-icon>
                <el-form-item label="分类名称" prop="name">
                    <el-input v-model="ruleForm.name" placeholder="请输入分类名称" />
                </el-form-item>

                <el-form-item label="所属分类">

                    <el-select v-model="ruleForm.pid" placeholder="请选择所属分类">
                        <el-option :label="item.name" :value="item.id"
                            v-for="(item) in tableData.filter(item => item.level == 1)" :key="item.id" />

                    </el-select>
                </el-form-item>


                <el-form-item>
                    <el-button type="primary" @click="add(ruleFormRef)">
                        添加分类
                    </el-button>
                    <el-button @click="drawer = false">返回</el-button>
                </el-form-item>
            </el-form>
        </el-drawer>
        <!-- 编辑 -->
        <el-drawer v-model="drawer1" title="编辑分类" :with-header="false">
            <el-form ref="ruleFormRef" :model="ruleForm1" :rules="rules1" label-width="120px" class="demo-ruleForm"
                :size="formSize" status-icon>
                <el-form-item label="分类名称" prop="name">
                    <el-input v-model="ruleForm1.name" placeholder="请输入分类名称" />
                </el-form-item>

                <el-form-item label="所属分类">

                    <el-select v-model="ruleForm1.id" placeholder="请选择所属分类">
                        <el-option :label="item.name" :value="item.id"
                            v-for="(item) in tableData.filter(item => item.level == 1)" :key="item.id" />

                    </el-select>
                </el-form-item>


                <el-form-item>
                    <el-button type="primary" @click="edit(ruleFormRef)">
                        修改分类
                    </el-button>
                    <el-button @click="drawer = false">返回</el-button>
                </el-form-item>
            </el-form>
        </el-drawer>


    </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getCategoryListApi, changeStatusApi, addCategoryListApi, editCategoryListApi } from '@/api'

const formInline = reactive({
    name: '',
    email: '',
    phone: '',
})


const tableData = ref([])
const drawer = ref(false)
const drawer1 = ref(false)





const formSize = ref('default')
const ruleFormRef = ref()
const ruleForm = reactive({
    name: '',
    pid: ''
})
const ruleForm1 = reactive({
    name: '',
    id: ''
})

const rules = reactive({
    name: [
        { required: true, message: '请输入分类名称', trigger: 'blur' },
    ],
})
const rules1 = reactive({
    name: [
        { required: true, message: '请输入分类名称', trigger: 'blur' },
    ],
})

const add = async (formEl) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            // console.log(ruleForm)
            addCategoryListApi({ name: ruleForm.name }).then(res => {
                console.log(res);
                getCategoryList()
            })
            drawer.value = false
            
        } else {
            console.log('error submit!', fields)
        }
    })
}




const changedrawer1 = (name, id) => {
    console.log(name, id);
    ruleForm1.name = name
    ruleForm1.id = id
    drawer1.value = true
}
const edit = async (formEl) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            console.log(ruleForm1)
            // console.log(ruleForm1.id);
            editCategoryListApi({ category: ruleForm1.id, name: ruleForm1.name }).then(res => {
                console.log(res);
                getCategoryList()
            })
            drawer1.value = false
            // getCategoryList()
        } else {
            console.log('error submit!', fields)
        }
    })
}



const del = () => {
    ElMessageBox.alert('将删除这条数据', '提示', {
        // if you want to disable its autofocus
        // autofocus: false,
        confirmButtonText: '确认'
        
    })
}





const changeStatus = (e, id) => {
    // console.log(e, id);
    changeStatusApi({ category: id }).then(res => {
        // console.log(res);
    })
}

const onSearch = () => {
    console.log(formInline)
}
const getCategoryList = () => {
    getCategoryListApi({ type: 'all' }).then(res => {
        // console.log(res.data);
        tableData.value = res.data
    })
}
getCategoryList()
</script>

<style lang="scss" scoped>
.user {
    width: 100%;
    height: 100%;
    background-color: #fff;
    padding: 20px;
    box-sizing: border-box;

    .main {
        .add {
            margin: 20px 0;
        }
    }
}
</style>