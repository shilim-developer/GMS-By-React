/**
 * Created by shilim on 2017/7/11.
 */
import React from 'react';
import QueueAnim from 'rc-queue-anim'
import {Breadcrumb, Button, Popconfirm, Form, Input} from 'antd';
const FormItem = Form.Item;

import PlaceTypeVo from '../../models/PlaceTypeVo';
import {addPlaceType} from '../../api/placeTypeManageApi';
import {notificationShow} from '../../utils/notification';

const qs = require('qs');

class PlaceTypeAddictionPage extends React.Component {

  goBack = () => {
    this.props.history.push('/placeTypeList')
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let placeTypeVo = new PlaceTypeVo();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        placeTypeVo = Object.assign(placeTypeVo, values)
        addPlaceType(qs.stringify({placeType: placeTypeVo.voToJson()}))
          .then((res) => {
            switch (res.data.serviceResult) {
              case 1:
                notificationShow('success', res.data.resultInfo);
                this.goBack();
                break;
              default:
                notificationShow('error', res.data.resultInfo);
                break;
            }
          })
          .catch((error) => {
            notificationShow('error',error)
          })
      }
    });
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 6}
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 14}
      }
    };
    return (
      <QueueAnim duration="1200">
        <div key="placeTypeAddiction" style={{padding: 15, background: '#fff'}}>
          <Breadcrumb>
            <Breadcrumb.Item>场地管理</Breadcrumb.Item>
            <Breadcrumb.Item>新增场地类型</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{margin: '15px 0'}}>
            <Popconfirm placement="top" title="您确定放弃当前添加记录吗？" okText="是" cancelText="否"
                        onConfirm={this.goBack}>
              <Button type="default" icon="rollback">返回</Button>
            </Popconfirm>
            <Button type="primary" icon="file" style={{marginLeft: 10}} onClick={this.handleSubmit}>保存</Button>
          </div>
          <div style={{borderTop: '1px dashed #e7eaec', margin: '20px 0'}}/>
          <Form>
            <FormItem {...formItemLayout} label="类型名称" hasFeedback>
              {getFieldDecorator('placeTypeName', {rules: [{required: true, message: '类型名称不能为空'}]})(
                <Input/>
              )}
            </FormItem>
          </Form>
        </div>
      </QueueAnim>
    )
  }

  componentDidMount() {
  }

}

PlaceTypeAddictionPage = Form.create()(PlaceTypeAddictionPage);

export default PlaceTypeAddictionPage
