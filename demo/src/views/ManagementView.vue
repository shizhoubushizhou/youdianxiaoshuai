<template>
    <div class="manage">
        <div class="top">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item>
                    <el-input v-model="formInline.val" placeholder="请输入内容">
                        <template #append>
                            <el-button @click="onsearch" icon="Search" />
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="managedialog = true">添加分类</el-button>
                    <el-button @click="goodsdialog = true">添加商品</el-button>
                </el-form-item>
            </el-form>
        </div>

        <div class="main">
            <el-table :data="store.state.newtableData" style="width: 100%; margin-bottom: 20px" row-key="id" border
                default-expand-all>
                <el-table-column prop="title" label="商品名称" sortable />
                <el-table-column prop="desc" label="商品描述" sortable />
                <el-table-column prop="price" label="商品价格" sortable />
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button type="primary" text @click="deldialog = true">删除</el-button>
                    </template>

                </el-table-column>
            </el-table>
        </div>

        <!-- 添加对话框 -->
        <el-dialog v-model="managedialog" title="请输入大类" width="30%">
            <span>
                <el-input v-model="manageinput" placeholder="请输入大类" />
            </span>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="managedialog = false">取消</el-button>
                    <el-button type="primary" @click="addmanage">
                        确定
                    </el-button>
                </span>
            </template>
        </el-dialog>
        <!-- 添加商品对话框 -->
        <el-dialog v-model="goodsdialog" title="请输入大类" width="30%">
            <span>
                <el-form :model="form" label-width="120px">

                    <el-form-item label="请选择分类">
                        <el-radio-group v-model="form.name">
                            <el-radio :label="item.title" v-for="(item) in store.state.newtableData" :key="item.id" />
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="商品名称">
                        <el-input v-model="form.title" />
                    </el-form-item>
                    <el-form-item label="商品价格">
                        <el-input v-model="form.price" />
                    </el-form-item>
                    <el-form-item label="商品描述">
                        <el-input v-model="form.desc" />
                    </el-form-item>
                </el-form>
            </span>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="goodsdialog = false">取消</el-button>
                    <el-button type="primary" @click="addgoods">
                        确定
                    </el-button>
                </span>
            </template>
        </el-dialog>


        <!-- 删除对话框 -->
        <el-dialog v-model="deldialog" title="请输入大类" width="30%">
            <span>
                <el-icon color="#d5a55f">
                    <WarningFilled />
                </el-icon>
                确认要永久删除该数据吗？
            </span>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="deldialog = false">取消</el-button>
                    <el-button type="primary" @click="del(id)">
                        确定
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useStore } from 'vuex';
import {useRouter} from 'vue-router'


let store = useStore()
let router = useRouter()
const form = ref({
    title: '',
    price: '',
    desc: '',
    name: ''
})

const formInline = reactive({
    val: '',
})
const manageinput = ref()
// const tableData = ref([])
const managedialog = ref(false)
const goodsdialog = ref(false)
const deldialog = ref(false)

const del = (id) => {
    // console.log(id);
    store.commit('del', id)
    deldialog.value = false
}
const addmanage = () => {
    console.log(manageinput.value);
    store.commit('addmanage', manageinput.value)
    managedialog.value = false
    manageinput.value=''

}
const addgoods = () => {
    console.log(form.value);
    store.commit('addgoods', {...form.value})
    goodsdialog.value = false
    // router.go()
    form.value.name =''
    form.value.price =''
    form.value.title =''
    form.value.desc =''
}
const onsearch = () => {
    // console.log('submit!')
    console.log(formInline.val);
    store.commit('onsearch', formInline.val)
}


</script>

<style lang="scss" scoped>
.manage {
    padding: 20px;
}
</style>