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
