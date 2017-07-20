/**
 * Created by shilim on 2017/7/11.
 */
export default class PlaceStatusVo{
  id;
  placeId;
  timeId;
  placeStatus;
  constructor() {
  }

  voToJson() {
    return JSON.stringify(this);
  }
}
