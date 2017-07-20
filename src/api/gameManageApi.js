/**
 * Created by shilim on 2017/7/12.
 */
import * as http from 'axios';
import baseUrl from './apiConfig';

export const getGameList = (data,options) => http.post(baseUrl+'gameManage/selectGameList',data,options);
export const addGame = (data,options) => http.post(baseUrl+'gameManage/addGame',data,options);
export const deleteGame = (data,options) => http.post(baseUrl+'gameManage/deleteGame',data,options);
export const getOneGame = (data,options) => http.post(baseUrl+'gameManage/selectOneGame',data,options);
export const updateGame = (data,options) => http.post(baseUrl+'gameManage/updateGame',data,options);
