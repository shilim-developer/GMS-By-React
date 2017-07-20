/**
 * Created by shilim on 2017/7/3.
 */
import * as actionTypes from '../constants/equipmentManage';
import PageVo from '../models/PageVo'

const initialState = {
  page:new PageVo(1,5)
}
export function equipmentManage(state=initialState,action) {
  switch (action.type) {
    case actionTypes.CHANGE_PAGE_NUM:
      return {
        ...state,
        page:action.page
      }
    case actionTypes.SAVE_EQUIPMENT_LIST:
      return {
        ...state,
        equipmentList:action.data
      }
    default:
      return state;
  }
}
