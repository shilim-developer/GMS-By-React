/**
 * Created by shilim on 2017/7/12.
 */
import * as actionTypes from '../constants/noticeManage';
import * as api from '../api/noticeManageApi';
const qs = require('qs');

import {notificationShow} from '../utils/notification'

export function changePageNum(page) {
  return {
    type: actionTypes.CHANGE_PAGE_NUM,
    page: page
  }
}

export function getNoticeList(page) {
  const pageVo = qs.stringify(page);
  return dispatch => api.getNoticeList(pageVo)
    .then((res) => {
      switch (res.data.serviceResult) {
        case 1:
          if(res.data.resultParam.list.length===0 && res.data.resultParam.pageNum>0) {
            let tempPage = JSON.parse(page.page);
            tempPage.pageNum--;
            dispatch(getNoticeList({page:JSON.stringify(tempPage)}));
          } else {
            dispatch(saveNoticeList(res.data.resultParam))
          }
      }
    })
    .catch((error) => {
      notificationShow('error',error)
    })
}

export function saveNoticeList(data) {
  return {
    type: actionTypes.SAVE_NOTICE_LIST,
    data: data
  }
}
