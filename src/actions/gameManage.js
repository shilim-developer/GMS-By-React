/**
 * Created by shilim on 2017/7/12.
 */
import * as actionTypes from '../constants/gameManage';
import * as api from '../api/gameManageApi';
const qs = require('qs');

import {notificationShow} from '../utils/notification'

export function changePageNum(page) {
  return {
    type: actionTypes.CHANGE_PAGE_NUM,
    page: page
  }
}

export function getGameList(page) {
  const pageVo = qs.stringify(page);
  return dispatch => api.getGameList(pageVo)
    .then((res) => {
      switch (res.data.serviceResult) {
        case 1:
          if(res.data.resultParam.list.length===0 && res.data.resultParam.pageNum>0) {
            let tempPage = JSON.parse(page.page);
            tempPage.pageNum--;
            dispatch(getGameList({page:JSON.stringify(tempPage)}));
          } else {
            dispatch(saveGameList(res.data.resultParam))
          }
      }
    })
    .catch((error) => {
      notificationShow('error',error)
    })
}

export function saveGameList(data) {
  return {
    type: actionTypes.SAVE_GAME_LIST,
    data: data
  }
}
