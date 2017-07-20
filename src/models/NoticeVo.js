/**
 * Created by shilim on 2017/7/12.
 */
export default class NoticeVo{
  id;
  name;
  context;
  time;
  constructor() {
  }

  voToJson() {
    return JSON.stringify(this);
  }
}
