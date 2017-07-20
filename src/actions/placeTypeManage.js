/**
 * Created by shilim on 2017/7/11.
 */
import * as actionTypes from '../constants/placeTypeManage';
import * as api from '../api/placeTypeManageApi';
const qs = require('qs');

import {notificationShow} from '../utils/notification'

export function changePageNum(page) {
  return {
    type: actionTypes.CHANGE_PAGE_NUM,
    page: page
  }
}

export function getPlaceTypeList(page) {
  const pageVo = qs.stringify(page);
  return dispatch => api.getPlaceTypeList(pageVo)
    .then((res) => {
      switch (res.data.serviceResult) {
        case 1:
          if(res.data.resultParam.list.length===0 && res.data.resultParam.pageNum>0) {
            let tempPage = JSON.parse(page.page);
            tempPage.pageNum--;
            dispatch(getPlaceTypeList({page:JSON.stringify(tempPage)}));
          } else {
            dispatch(savePlaceTypeList(res.data.resultParam))
          }
      }
    })
    .catch((error) => {
      notificationShow('error',error)
    })
}

export function savePlaceTypeList(data) {
  return {
    type: actionTypes.SAVE_PLACE_TYPE_LIST,
    data: data
  }
}
