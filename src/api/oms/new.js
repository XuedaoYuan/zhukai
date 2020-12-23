import { fetch } from "../../plugins/axios"

export function queryPage(params) {
    console.log(params)
    return fetch({
        url: '/oms/web/module1/basdatainfo/page',
        method: "POST",
        data: params
    })
}