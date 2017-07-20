/**
 * Created by shilim on 2017/7/12.
 */
export default class PlaceLeaseRecordVo{
  id;
  placeId;
  startTime;
  endTime;
  userId;
  cost;
  result;
  payStatus;
  checkStatus;
  constructor() {
  }

  voToJson() {
    return JSON.stringify(this);
  }
}
