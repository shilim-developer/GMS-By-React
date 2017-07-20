/**
 * Created by shilim on 2017/7/10.
 */
import * as actionTypes from '../constants/equipmentTypeManage';
import PageVo from '../models/PageVo';

const initialState = {
  page:new PageVo(1,5)
}
export function equipmentTypeManage(state=initialState,action) {
  switch (action.type) {
    case actionTypes.CHANGE_PAGE_NUM:
      return {
        ...state,
        page:action.page
      }
    case actionTypes.SAVE_EQUIPMENT_TYPE_LIST:
      return {
        ...state,
        equipmentTypeList:action.data
      }
    default:
      return state;
  }
}
