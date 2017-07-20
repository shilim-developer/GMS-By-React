/**
 * Created by shilim on 2017/7/11.
 */
import * as actionTypes from '../constants/placeTypeManage';
import PageVo from '../models/PageVo';

const initialState = {
  page:new PageVo(1,5)
}
export function placeTypeManage(state=initialState,action) {
  switch (action.type) {
    case actionTypes.CHANGE_PAGE_NUM:
      return {
        ...state,
        page:action.page
      }
    case actionTypes.SAVE_PLACE_TYPE_LIST:
      return {
        ...state,
        placeTypeList:action.data
      }
    default:
      return state;
  }
}
