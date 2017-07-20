/**
 * Created by shilim on 2017/7/12.
 */
import * as actionTypes from '../constants/noticeManage';
import PageVo from '../models/PageVo';

const initialState = {
  page:new PageVo(1,5)
}
export function noticeManage(state=initialState,action) {
  switch (action.type) {
    case actionTypes.CHANGE_PAGE_NUM:
      return {
        ...state,
        page:action.page
      }
    case actionTypes.SAVE_NOTICE_LIST:
      return {
        ...state,
        noticeList:action.data
      }
    default:
      return state;
  }
}
