/**
 * Created by shilim on 2017/6/12.
 */
import React from 'react';
import QueueAnim from 'rc-queue-anim'
import {Breadcrumb, Button, Popconfirm, Form, Input, Select} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

import {notificationShow} from '../../utils/notification'
import UserVo from '../../models/UserVo'
const qs = require('qs')

import {getAllRole} from '../../api/roleManageApi'
import {addUser} from '../../api/userManageApi'
class UserAddictionPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {roleList: []}
  }

  goBack = () => {
    this.props.history.push('/userList')
  }

  getRoleList = () => {
    getAllRole()
      .then(res => {
        switch (res.data.serviceResult) {
          case 1:
            this.setState({
              ...this.state,
              roleList: res.data.resultParam
            })
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

  handleSubmit = (e) => {
    e.preventDefault();
    let userVo = new UserVo();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        userVo = Object.assign(userVo, values)
        addUser(qs.stringify({user: userVo.voToJson()}))
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
        <div key="userAddiction" style={{padding: 15, background: '#fff', minHeight: 360}}>
          <Breadcrumb>
            <Breadcrumb.Item>用户管理</Breadcrumb.Item>
            <Breadcrumb.Item>新增用户</Breadcrumb.Item>
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
            <FormItem {...formItemLayout} label="用户账号" hasFeedback>
              {getFieldDecorator('account', {rules: [{required: true, message: '用户账户不能为空'}]})(
                <Input/>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="用户密码" hasFeedback>
              {getFieldDecorator('password', {rules: [{required: true, message: '用户密码不能为空'}]})(
                <Input type="password"/>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="用户姓名" hasFeedback>
              {getFieldDecorator('name', {rules: [{required: true, message: '用户姓名不能为空'}]})(
                <Input/>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="用户卡号" hasFeedback>
              {getFieldDecorator('cardno', {rules: [{required: true, message: '用户卡号不能为空'}]})(
                <Input type="number"/>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="用户邮箱" hasFeedback>
              {getFieldDecorator('email', {
                rules: [{required: true, message: '用户邮箱不能为空'},
                  {type: 'email', message: '请输入正确的邮箱格式'}]
              })(
                <Input/>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="用户手机" hasFeedback>
              {getFieldDecorator('mobilephone', {rules: [{required: true, message: '用户手机不能为空'}]})(
                <Input/>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="用户住址" hasFeedback>
              {getFieldDecorator('address', {rules: [{required: true, message: '用户住址不能为空'}]})(
                <Input/>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="用户角色" hasFeedback>
              {getFieldDecorator('role.id', {
                rules: [{required: true, message: '用户角色不能为空'}
                ], initialValue: this.state.roleList.length > 0 ? this.state.roleList[0].id + '' : ''
              })(
                <Select>
                  {this.state.roleList.map((item) => {
                    return (<Option key={item.id} value={item.id + ''}>{item.description}</Option>)
                  })}
                </Select>
              )}
            </FormItem>
          </Form>
        </div>
      </QueueAnim>
    )
  }

  componentDidMount() {
    this.getRoleList();
  }

}

UserAddictionPage = Form.create()(UserAddictionPage);

export default UserAddictionPage
