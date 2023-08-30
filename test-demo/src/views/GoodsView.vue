<template>
    <div class="goods">
        <div class="top">
            <span>筛选：</span>
            <el-select v-model="value" class="m-2" size="large">

                <el-option label="全部" value="" @click="onsearch" />
                <el-option v-for="item in store.state.tableData" :key="item.id" :label="item.title" :value="item.title"
                    @click="onsearch(item.title)" />
            </el-select>
        </div>

        <div class="main">
            <div class="main-item" v-for="item in store.state.newtableData" :key="item.id">
                <h4 style="line-height: 40px;text-align: center;background-color: #e9e9e9;">{{ item.title }}</h4>
                <el-table :data="item.children" style="width: 100%">
                    <el-table-column prop="title" label="商品名称" />
                    <el-table-column prop="desc" label="商品描述" />
                    <el-table-column prop="price" label="商品价格" />
                    <el-table-column label="操作">
                        <template #default="scope">
                            <div class="scope">
                                <el-input-number v-model="scope.row.num" :min="1" :max="10"
                                    @change="numChange($event, item.id, scope.row.title)" />
                                <el-button type="danger" @click="addcard(scope.row)">加入购物车</el-button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useStore } from 'vuex';
import { useRouter } from 'vue-router'


let store = useStore()
let router = useRouter()



const value = ref('')



const addcard = (item) => {
    store.commit('addcard',item)
}
const numChange = (e, id, name) => {
    // console.log(e,id,name)
    store.commit('numChange', { e, id, name })

}
const onsearch = () => {
    // console.log('submit!')
    // console.log(value.value);
    store.commit('onsearch', value.value)
}
</script>

<style lang="scss" scoped>
.goods {
    padding: 20px;

    .main {
        margin: 20px 0;

        .main-item {
            margin: 20px 0;

            .scope {
                display: flex;
                flex-direction: column;
            }

            .el-button {
                width: 150px;
            }
        }
    }
}
</style>