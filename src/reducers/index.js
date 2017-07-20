/**
 * Created by shilim on 2017/7/3.
 */
import { combineReducers } from 'redux'

import { userManage } from './userManage'
import { roleManage } from './roleManage'
import { equipmentTypeManage } from './equipmentTypeManage'
import { equipmentManage } from './equipmentManage'
import { equipmentLoanManage } from './equipmentLoanManage'
import { placeTypeManage } from './placeTypeManage'
import { placeManage } from './placeManage'
import { placeLeaseRecordManage } from './placeLeaseRecordManage'
import { gameManage } from './gameManage'
import { noticeManage } from './noticeManage'

export default combineReducers({
  userManage,
  roleManage,
  equipmentTypeManage,
  equipmentManage,
  equipmentLoanManage,
  placeTypeManage,
  placeManage,
  placeLeaseRecordManage,
  gameManage,
  noticeManage
})
