import { fetch } from "../../plugins/axios"

export function testApi() {
    return fetch({
        url: '/oms/web/module1/basdatainfo/page',
        method: "POST",
        data: { "dsType": "外部数据", "pageSize": 2, "currentPage": 1 }
    })
}