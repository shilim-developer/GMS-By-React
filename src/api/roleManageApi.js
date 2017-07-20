/**
 * Created by shilim on 2017/7/4.
 */
import * as http from 'axios';
import baseUrl from './apiConfig';

export const getRoleList = (data,options) => http.post(baseUrl+'roleManage/selectRoleList',data,options);
export const addRole = (data,options) => http.post(baseUrl+'roleManage/addRole',data,options);
export const deleteRole = (data,options) => http.post(baseUrl+'roleManage/deleteRole',data,options);
export const getAllRole = (data,options) => http.post(baseUrl+'roleManage/selectAllRole',data,options);
