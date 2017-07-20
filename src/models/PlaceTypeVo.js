/**
 * Created by shilim on 2017/7/10.
 */
export default class PlaceTypeVo{
  constructor(id,placeTypeName) {
    this.id = id;
    this.placeTypeName = placeTypeName
  }

  voToJson() {
    return JSON.stringify(this);
  }
}
