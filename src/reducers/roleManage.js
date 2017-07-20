/**
 * Created by shilim on 2017/7/3.
 */
import * as actionTypes from '../constants/roleManage';
import PageVo from '../models/PageVo';

const initialState = {
  page:new PageVo(1,5)
}
export function roleManage(state=initialState,action) {
  switch (action.type) {
    case actionTypes.CHANGE_PAGE_NUM:
      return {
        ...state,
        page:action.page
      }
    case actionTypes.SAVE_ROLE_LIST:
      return {
        ...state,
        roleList:action.data
      }
    default:
      return state;
  }
}
