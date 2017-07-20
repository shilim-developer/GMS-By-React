/**
 * Created by shilim on 2017/7/10.
 */
import * as actionTypes from '../constants/equipmentTypeManage'
import * as api from '../api/equipmentTypeManageApi'
const qs = require('qs')

import {notificationShow} from '../utils/notification'

export function changePageNum(page) {
  return {
    type: actionTypes.CHANGE_PAGE_NUM,
    page: page
  }
}

export function getEquipmentTypeList(page) {
  const pageVo = qs.stringify(page);
  return dispatch => api.getEquipmentTypeList(pageVo)
    .then((res) => {
      switch (res.data.serviceResult) {
        case 1:
          if(res.data.resultParam.list.length===0 && res.data.resultParam.pageNum>0) {
            let tempPage = JSON.parse(page.page);
            tempPage.pageNum--;
            dispatch(getEquipmentTypeList({page:JSON.stringify(tempPage)}));
          } else {
            dispatch(saveEquipmentTypeList(res.data.resultParam))
          }
      }
    })
    .catch((error) => {
      notificationShow('error',error)
    })
}

export function saveEquipmentTypeList(data) {
  return {
    type: actionTypes.SAVE_EQUIPMENT_TYPE_LIST,
    data: data
  }
}
