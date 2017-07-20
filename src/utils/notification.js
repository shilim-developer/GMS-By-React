/**
 * Created by shilim on 2017/7/4.
 */
import {notification} from 'antd';
export function notificationShow(type,description) {
  notification[type]({
    message:'提示',
    description:description,
    duration:2
  })
}
