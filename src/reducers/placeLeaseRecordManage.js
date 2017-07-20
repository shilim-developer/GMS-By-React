/**
 * Created by shilim on 2017/7/12.
 */
import * as actionTypes from '../constants/placeLeaseRecordManage';
import PageVo from '../models/PageVo'

const initialState = {
  page:new PageVo(1,5)
}
export function placeLeaseRecordManage(state=initialState,action) {
  switch (action.type) {
    case actionTypes.CHANGE_PAGE_NUM:
      return {
        ...state,
        page:action.page
      }
    case actionTypes.SAVE_PLACE_LEASE_RECORD_LIST:
      return {
        ...state,
        placeLeaseRecordList:action.data
      }
    default:
      return state;
  }
}
