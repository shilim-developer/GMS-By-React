/**
 * Created by shilim on 2017/7/10.
 */
import * as http from 'axios';
import baseUrl from './apiConfig';
export const getEquipmentTypeList = (data,options) => http.post(baseUrl+'equipmentTypeManage/selectEquipmentTypeList',data,options);
export const deleteEquipmentType = (data,options) => http.post(baseUrl+'equipmentTypeManage/deleteEquipmentType',data,options);
export const addEquipmentType = (data,options) => http.post(baseUrl+'equipmentTypeManage/addEquipmentType',data,options);
export const getOneEquipmentType = (data,options) => http.post(baseUrl+'equipmentTypeManage/selectOneEquipmentType',data,options);
export const updateEquipomentType = (data,options) => http.post(baseUrl+'equipmentTypeManage/updateEquipmentType',data,options);
