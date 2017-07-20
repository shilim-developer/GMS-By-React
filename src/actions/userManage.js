/**
 * Created by shilim on 2017/7/3.
 */
import * as actionTypes from '../constants/userManage';
import * as api from '../api/userManageApi';
const qs = require('qs');

import {notificationShow} from '../utils/notification'

export function changePageNum(page) {
  return {
    type: actionTypes.CHANGE_PAGE_NUM,
    page: page
  }
}

export function getUserList(page) {
  page = qs.stringify(page);
  return dispatch => api.getUserList(page)
    .then((res) => {
      dispatch(saveUserList(res.data.resultParam))
    })
    .catch((error) => {
      notificationShow('error',error)
    })
}

export function saveUserList(data) {
  return {
    type: actionTypes.SAVE_USER_LIST,
    data: data
  }
}
