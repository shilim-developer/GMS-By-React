/**
 * Created by shilim on 2017/7/10.
 */
import * as http from 'axios';
import baseUrl from './apiConfig';

export const getEquipmentList = (data,options) => http.post(baseUrl+'equipmentManage/selectEquipmentList',data,options);
export const addEquipment = (data,options) => http.post(baseUrl+'equipmentManage/addEquipment',data,options);
export const getOneEquipment = (data,options) => http.post(baseUrl+'equipmentManage/selectOneEquipment',data,options);
export const updateEquipment = (data,options) => http.post(baseUrl+'equipmentManage/updateEquipment',data,options);
export const deleteEquipment = (data,options) => http.post(baseUrl+'equipmentManage/deleteEquipment',data,options);
