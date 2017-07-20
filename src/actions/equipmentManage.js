/**
 * Created by shilim on 2017/7/3.
 */
import * as actionTypes from '../constants/equipmentManage';
import * as api from '../api/equipmentManageApi';
const qs = require('qs');

import {notificationShow} from '../utils/notification'

export function changePageNum(page) {
  return {
    type: actionTypes.CHANGE_PAGE_NUM,
    page: page
  }
}

export function getEquipmentList(page) {
  page = qs.stringify(page);
  return dispatch => api.getEquipmentList(page)
    .then((res) => {
      dispatch(saveEquipmentList(res.data.resultParam))
    })
    .catch((error) => {
      notificationShow('error',error)
    })
}

export function saveEquipmentList(data) {
  return {
    type: actionTypes.SAVE_EQUIPMENT_LIST,
    data: data
  }
}
