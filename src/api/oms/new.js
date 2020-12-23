import { fetch } from "../../plugins/axios"

//
export function queryPage(params) {
    return fetch({
        url: '/oms/web/module1/basdatainfo/page',
        method: "POST",
        data: params
    })
}
//保存
export function save(params) {
    console.log(params)
    return fetch({
        url: '/oms/web/module1/basdatainfo/save',
        method: "POST",
        data: params
    })
}
//删除
export function deleteBatchById(params) {
    console.log(params)
    return fetch({
        url: '/oms/web/module1/basdatainfo/delete',
        method: "POST",
        data: params
    })
}
//指标列表
export function bizkpiinfo(params) {
    console.log(params)
    return fetch({
        url: '/oms/web/manage/bizkpiinfo/page',
        method: "POST",
        data: params
    })
}
//主题列表
export function bizsbjinfo(params) {
    console.log(params)
    return fetch({
        url: '/oms/web/manage/bizsbjinfo/page',
        method: "POST",
        data: params
    })
}