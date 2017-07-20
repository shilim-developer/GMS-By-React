/**
 * Created by shilim on 2017/7/10.
 */
export default class EquipmentTypeVo{
  equipmentid;
  equipmentname;
  equipmentType;
  estandard;
  eprice;
  totalnum;
  loanablenum;
  constructor() {
  }

  voToJson() {
    return JSON.stringify(this);
  }
}
