import { dataType } from "element-plus/es/components/table-v2/src/common";
import http from "./http";

export const loginApi = (data)=> http.post('/api/auth/login',data)  //登录
export const getCategoryListApi = (data)=> http.get('api/admin/category?type='+data.type,data) //分类列表
export const changeStatusApi = (data)=> http.patch(`/api/admin/category/${data.category}/status`,data) //更改状态
export const addCategoryListApi = (data)=> http.post('/api/admin/category',data) //添加
export const editCategoryListApi = (data)=> http.put('/api/admin/category/'+data.category,data)