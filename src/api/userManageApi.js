/**
 * Created by shilim on 2017/7/3.
 */
import * as http from 'axios';
import baseUrl from './apiConfig';

export const getUserList = (data,options) => http.post(baseUrl+'userManage/selectUserList',data,options);
export const addUser = (data,options) => http.post(baseUrl+'userManage/addUser',data,options);
export const getOneUser = (data,options) => http.post(baseUrl+'userManage/selectOneUser',data,options);
export const updateUser = (data,options) => http.post(baseUrl+'userManage/updateUser',data,options);
export const deleteUser = (data,options) => http.post(baseUrl+'userManage/deleteUser',data,options);
