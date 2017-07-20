/**
 * Created by shilim on 2017/7/10.
 */
export default class EquipmentTypeVo{
  constructor(typeid,typename) {
    this.typeid = typeid;
    this.typename = typename
  }

  voToJson() {
    return JSON.stringify(this);
  }
}
