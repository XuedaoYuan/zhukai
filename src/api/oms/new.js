import axios from 'axios'

export const queryPage = data => {
    return axios({
        url: "/oms/web/module1/basdatainfo/page",
        method: "post",
        data
    });
};