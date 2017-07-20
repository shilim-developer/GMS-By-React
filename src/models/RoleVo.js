/**
 * Created by shilim on 2017/7/4.
 */
export default class RoleVo{
  id;
  description;
  status;
  type;
  constructor() {

  }

  voToJson() {
    return JSON.stringify(this);
  }
}
