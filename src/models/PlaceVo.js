/**
 * Created by shilim on 2017/7/11.
 */
export default class PlaceVo{
  id;
  placeName;
  placeLocation;
  placeType;
  cost;
  status;
  constructor() {
  }

  voToJson() {
    return JSON.stringify(this);
  }
}
