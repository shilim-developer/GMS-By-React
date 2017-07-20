/**
 * Created by shilim on 2017/7/12.
 */
import * as http from 'axios';
import baseUrl from './apiConfig';

export const getNoticeList = (data,options) => http.post(baseUrl+'postManage/selectPostList',data,options);
export const addNotice = (data,options) => http.post(baseUrl+'postManage/addPost',data,options);
export const deleteNotice = (data,options) => http.post(baseUrl+'postManage/deletePost',data,options);
export const getOneNotice = (data,options) => http.post(baseUrl+'postManage/selectOnePost',data,options);
export const updateNotice = (data,options) => http.post(baseUrl+'postManage/updatePost',data,options);
