/**
 * Created by shilim on 2017/7/11.
 */
import * as http from 'axios';
import baseUrl from './apiConfig';

export const getPlaceTypeList = (data,options) => http.post(baseUrl+'placeTypeManage/selectPlaceTypeList',data,options);
export const addPlaceType = (data,options) => http.post(baseUrl+'placeTypeManage/addPlaceType',data,options);
export const deletePlaceType = (data,options) => http.post(baseUrl+'placeTypeManage/deletePlaceType',data,options);
export const getOnePlaceType = (data,options) => http.post(baseUrl+'placeTypeManage/selectOnePlaceType',data,options);
export const updatePlaceType = (data,options) => http.post(baseUrl+'placeTypeManage/updatePlaceType',data,options);
