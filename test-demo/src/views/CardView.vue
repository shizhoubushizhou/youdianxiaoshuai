<template>
    <div class="card">
        <el-table ref="multipleTableRef" :data="store.state.cardList" style="width: 100%">
            <el-table-column width="55">
                <template #default="scope">
                    <el-checkbox v-model="scope.row.checked" @change="changechecked(scope.row.title)" />
                </template>
            </el-table-column>
            <el-table-column label="商品名称">
                <template #default="scope">{{ scope.row.title }}</template>
            </el-table-column>
            <el-table-column label="商品描述">
                <template #default="scope">{{ scope.row.desc }}</template>
            </el-table-column>
            <el-table-column label="商品价格">
                <template #default="scope">{{ scope.row.price }}</template>
            </el-table-column>
            <el-table-column label="商品小计">
                <template #default="scope">{{ scope.row.price * scope.row.num }}￥</template>
            </el-table-column>
            <el-table-column label="购买数量">
                <template #default="scope">
                    <el-input-number v-model="scope.row.num" :min="1" :max="10"
                        @change="numChange($event, scope.row.title)" />
                </template>
            </el-table-column>

        </el-table>

        <div class="bottom">
            <el-checkbox v-model="store.state.checked" @change="allchange" label="全选" />
            <p>总价：{{ store.getters.total }}</p>
            <p>总数：{{ store.getters.length }}</p>
            <el-button type="danger" @click="delchecked">删除选中</el-button>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useStore } from 'vuex';
import { useRouter } from 'vue-router'


let store = useStore()
let router = useRouter()


const delchecked = ()=>{
    store.commit('delchecked')
}
const changechecked = (title) => {
    store.commit('changechecked', title)
}
const allchange = () => {
    store.commit('allchange')
}
const numChange = (e, id, name) => {
    // console.log(e,id,name)
    store.commit('numChange', { e, id, name })

}
</script>

<style lang="scss" scoped>
.card {
    padding: 20px;

    .bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
        line-height: 60px;
    }
}
</style>