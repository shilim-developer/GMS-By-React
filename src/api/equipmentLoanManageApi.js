/**
 * Created by shilim on 2017/7/3.
 */
import * as http from 'axios';
import baseUrl from './apiConfig';

export const getEquipmentLoanList = (data,options) => http.post(baseUrl+'equipmentloanManage/selectEquipmentloanList',data,options);
export const checkEquipmentLoan = (data,options) => http.post(baseUrl+'equipmentloanManage/checkEquipmentloan',data,options);
