/**
 * Created by shilim on 2017/6/12.
 */
import React from 'react';
import QueueAnim from 'rc-queue-anim'
import {Breadcrumb, Button, Popconfirm, Form, Input} from 'antd';
const FormItem = Form.Item;

import NoticeVo from '../../models/NoticeVo';
import {getOneNotice,updateNotice} from '../../api/noticeManageApi';
import {notificationShow} from '../../utils/notification';

const qs = require('qs');

class NoticeEditionPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {notice:{}}
  }

  goBack = () => {
    this.props.history.push('/noticeList')
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let noticeVo = new NoticeVo();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        noticeVo = Object.assign(noticeVo,this.state.notice,values)
        updateNotice(qs.stringify({post: noticeVo.voToJson()}))
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
        <div key="noticeAddiction" style={{padding: 15, background: '#fff'}}>
          <Breadcrumb>
            <Breadcrumb.Item>公告管理</Breadcrumb.Item>
            <Breadcrumb.Item>修改公告</Breadcrumb.Item>
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
            <FormItem {...formItemLayout} label="公告名称" hasFeedback>
              {getFieldDecorator('name', {rules: [{required: true, message: '公告名称不能为空'}]})(
                <Input/>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="公告内容" hasFeedback>
              {getFieldDecorator('context', {rules: [{required: true, message: '公告内容不能为空'}]})(
                <Input/>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="公告发布时间" hasFeedback>
              {getFieldDecorator('time', {rules: [{required: true, message: '公告发布时间不能为空'}]})(
                <Input type="Date"/>
              )}
            </FormItem>
          </Form>
        </div>
      </QueueAnim>
    )
  }

  componentDidMount() {
    let noticeVo = new NoticeVo();
    noticeVo.id = this.props.match.params.id;
    getOneNotice(qs.stringify({post:noticeVo.voToJson()}))
      .then(res => {
        this.setState({...this.state,notice:res.data.resultParam})
        this.props.form.setFieldsValue(this.state.notice)
      })
      .catch(err => {
        notificationShow('eror',err)
      })
  }

}

NoticeEditionPage = Form.create()(NoticeEditionPage);

export default NoticeEditionPage
