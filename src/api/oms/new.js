import { fetch } from "../../plugins/axios"

//
export function queryPage(params) {
    return fetch({
        url: '/oms/web/manage/basdatainfo/page',
        method: "POST",
        data: params
    })
}
//保存
export function save(params) {
    console.log(params)
    return fetch({
        url: '/oms/web/manage/basdatainfo/save',
        method: "POST",
        data: params
    })
}
//删除
export function deleteBatchById(params) {
    console.log(params)
    return fetch({
        url: '/oms/web/manage/basdatainfo/delete',
        method: "POST",
        data: params
    })
}
//指标管理
export function percentage(params) {
    console.log(params)
    return fetch({
        url: '/oms/web/manage/bizkpiinfo/percentage',
        method: "POST",
        data: params
    })
}
export function selectAll(params) {
    console.log(params)
    return fetch({
        url: '/oms/web/manage/bizsbjinfo/selectAll',
        method: "POST",
        data: params
    })
}
export function bizdiminfo(params) {
    console.log(params)
    return fetch({
        url: '/oms/web/manage/bizdiminfo/selectAll',
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
//服务监测
export function servmnitinfo(params) {
    console.log(params)
    return fetch({
        url: '/oms/web/manage/servmnitinfo/page',
        method: "POST",
        data: params
    })
}
//服务监测-数量
export function countCnt(params) {
    console.log(params)
    return fetch({
        url: '/oms/web/manage/servmnitinfo/countCnt',
        method: "POST",
        data: params
    })
}
//日志管理
export function loginfo(params) {
    console.log(fetch,"fetch")
    console.log(params)
    return fetch({
        url: '/oms/web/manage/loginfo/page',
        method: "POST",
        data: params
    })
}