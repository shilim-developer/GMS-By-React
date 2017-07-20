/**
 * Created by shilim on 2017/7/12.
 */
import * as actionTypes from '../constants/placeLeaseRecordManage';
import * as api from '../api/placeLeaseRecordManageApi';
const qs = require('qs');

import {notificationShow} from '../utils/notification'

export function changePageNum(page) {
  return {
    type: actionTypes.CHANGE_PAGE_NUM,
    page: page
  }
}

export function getPlaceLeaseRecordList(page) {
  page = qs.stringify(page);
  return dispatch => api.getPlaceLeaseRecordList(page)
    .then((res) => {
      dispatch(savePlaceLeaseRecordList(res.data.resultParam))
    })
    .catch((error) => {
      notificationShow('error',error)
    })
}

export function savePlaceLeaseRecordList(data) {
  return {
    type: actionTypes.SAVE_PLACE_LEASE_RECORD_LIST,
    data: data
  }
}
