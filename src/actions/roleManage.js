/**
 * Created by shilim on 2017/7/3.
 */
import * as actionTypes from '../constants/roleManage';
import * as api from '../api/roleManageApi';
const qs = require('qs');

import {notificationShow} from '../utils/notification'

export function changePageNum(page) {
  return {
    type: actionTypes.CHANGE_PAGE_NUM,
    page: page
  }
}

export function getRoleList(page) {
  const pageVo = qs.stringify(page);
  return dispatch => api.getRoleList(pageVo)
    .then((res) => {
      switch (res.data.serviceResult) {
        case 1:
          if(res.data.resultParam.list.length===0 && res.data.resultParam.pageNum>0) {
            let tempPage = JSON.parse(page.page);
            tempPage.pageNum--;
            dispatch(getRoleList({page:JSON.stringify(tempPage)}));
          } else {
            dispatch(saveRoleList(res.data.resultParam))
          }
      }
    })
    .catch((error) => {
      notificationShow('error',error)
    })
}

export function saveRoleList(data) {
  return {
    type: actionTypes.SAVE_ROLE_LIST,
    data: data
  }
}
