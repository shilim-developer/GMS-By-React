/**
 * Created by shilim on 2017/7/11.
 */
import * as http from 'axios';
import baseUrl from './apiConfig';

export const getPlaceList = (data,options) => http.post(baseUrl+'placeManage/selectPlaceList',data,options);
export const addPlace = (data,options) => http.post(baseUrl+'placeManage/addPlace',data,options);
export const getOnePlace = (data,options) => http.post(baseUrl+'placeManage/selectOnePlace',data,options);
export const updatePlace = (data,options) => http.post(baseUrl+'placeManage/updatePlace',data,options);
export const deletePlace = (data,options) => http.post(baseUrl+'placeManage/deletePlace',data,options);
export const getPlaceStatus = (data,options) => http.post(baseUrl+'placeStatusManage/getPlaceStatusListByPlaceId',data,options);
