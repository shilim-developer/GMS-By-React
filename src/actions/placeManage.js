/**
 * Created by shilim on 2017/7/11.
 */
import * as actionTypes from '../constants/placeManage';
import * as api from '../api/placeManageApi';
const qs = require('qs');

import {notificationShow} from '../utils/notification'

export function changePageNum(page) {
  return {
    type: actionTypes.CHANGE_PAGE_NUM,
    page: page
  }
}

export function getPlaceList(page) {
  page = qs.stringify(page);
  return dispatch => api.getPlaceList(page)
    .then((res) => {
      dispatch(savePlaceList(res.data.resultParam))
    })
    .catch((error) => {
      notificationShow('error',error)
    })
}

export function savePlaceList(data) {
  return {
    type: actionTypes.SAVE_PLACE_LIST,
    data: data
  }
}
