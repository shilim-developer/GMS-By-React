/**
 * Created by shilim on 2017/7/11.
 */
import * as actionTypes from '../constants/equipmentLoanManage';
import * as api from '../api/equipmentLoanManageApi';
const qs = require('qs');

import {notificationShow} from '../utils/notification'

export function changePageNum(page) {
  return {
    type: actionTypes.CHANGE_PAGE_NUM,
    page: page
  }
}

export function getEquipmentLoanList(page) {
  page = qs.stringify(page);
  return dispatch => api.getEquipmentLoanList(page)
    .then((res) => {
      dispatch(saveEquipmentLoanList(res.data.resultParam))
    })
    .catch((error) => {
      notificationShow('error',error)
    })
}

export function saveEquipmentLoanList(data) {
  return {
    type: actionTypes.SAVE_EQUIPMENT_LOAN_LIST,
    data: data
  }
}
