/**
 * Created by shilim on 2017/7/3.
 */
import * as http from 'axios';
import baseUrl from './apiConfig';

export const getPlaceLeaseRecordList = (data,options) => http.post(baseUrl+'placeLeaseRecordManage/selectPlaceLeaseRecordList',data,options);
export const checkPlaceLeaseRecord = (data,options) => http.post(baseUrl+'placeLeaseRecordManage/checkPlaceLeaseRecord',data,options);
