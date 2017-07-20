/**
 * Created by shilim on 2017/6/12.
 */
import React from 'react';
import QueueAnim from 'rc-queue-anim'
import {Breadcrumb, Button, Popconfirm, Form, Input} from 'antd';
const FormItem = Form.Item;

import RoleVo from '../../models/RoleVo';
import {addRole} from '../../api/roleManageApi';
import {notificationShow} from '../../utils/notification';

const qs = require('qs');

class RoleEditionPage extends React.Component {

  goBack = () => {
    this.props.history.push('/roleList')
  }

  handleSubmit = () => {
    const roleVo = new RoleVo();
    roleVo.description = this.props.form.getFieldValue('description');
    addRole(qs.stringify({role: roleVo.voToJson()}))
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
        notificationShow('error', error);
      })
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
        <div key="roleEdition" style={{padding: 15, background: '#fff'}}>
          <Breadcrumb>
            <Breadcrumb.Item>用户管理</Breadcrumb.Item>
            <Breadcrumb.Item>修改角色</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{margin: '15px 0'}}>
            <Popconfirm placement="top" title="您确定放弃当前修改记录吗？" okText="是" cancelText="否"
                        onConfirm={this.goBack}>
              <Button type="default" icon="rollback">返回</Button>
            </Popconfirm>
            <Button type="primary" icon="file" style={{marginLeft: 10}} onClick={this.handleSubmit}>保存</Button>
          </div>
          <div style={{borderTop: '1px dashed #e7eaec', margin: '20px 0'}}/>
          <Form>
            <FormItem {...formItemLayout} label="角色名称" hasFeedback>
              {getFieldDecorator('description', {rules: [{required: true}]})(
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

RoleEditionPage = Form.create()(RoleEditionPage);

export default RoleEditionPage
