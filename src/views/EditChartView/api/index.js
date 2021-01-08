import { fetch } from '@/views/EditChartView/axios';

/* 
crteTime	大屏创建时间		false	
currentPage	当前页		false	
needCount	是否进行count查询，默认是		false	
order	排序方式		false	
orderField	排序字段		false	
pageSize	每页条数		false	
screenName	大屏名称		false	
status	大屏类型		false */

/**
 * 获取大屏列表
 *
 * @export
 * @param {*} data
 * @returns
 */
export function getScreenList(data) {
  return fetch({
    url: '/web/manage/scrinfomanu/listScreen',
    method: 'POST',
    data
  });
}

/**
 * 查询屏的各个状态的数量
 *
 * @export
 * @returns
 */
export function getScreenCount() {
  return fetch({
    url: '/web/manage/scrinfomanu/selectStas',
    method: 'POST'
  });
}

/**
 * 保存搭配
 *
 * @export
 * @param {DataInterface} data
 * interface DataInterface {
 *  cfg 大屏配置项
 *  scrName 大屏名称
 *  scrCodg 大屏Code
 *  scrThum 大屏缩略图
 * }
 *
 * @returns
 */
export function saveBoard(data) {
  return fetch({
    url: '/web/manage/scrinfomanu/saveScrInfoMnt',
    method: 'POST',
    data
  });
}

/**
 * 上传文件接口
 *
 * @export
 * @param {*} formData FormData<file>
 * @returns
 */
export function uploadFile(formData) {
  return fetch({
    url: '/web/fsstore/upload',
    method: 'POST',
    data: formData
  });
}

/**
 * 获取看板配置详情
 *
 * @export
 * @param {*} scrId
 * @returns
 */
export function getBoardConfigDetail(scrId) {
  return fetch({
    url: '/web/manage/scrinfomanu/getByMntId',
    method: 'POST',
    params: { scrId }
  });
}
