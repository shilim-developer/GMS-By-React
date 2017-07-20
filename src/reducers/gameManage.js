/**
 * Created by shilim on 2017/7/12.
 */
import * as actionTypes from '../constants/gameManage';
import PageVo from '../models/PageVo';

const initialState = {
  page:new PageVo(1,5)
}
export function gameManage(state=initialState,action) {
  switch (action.type) {
    case actionTypes.CHANGE_PAGE_NUM:
      return {
        ...state,
        page:action.page
      }
    case actionTypes.SAVE_GAME_LIST:
      return {
        ...state,
        gameList:action.data
      }
    default:
      return state;
  }
}
