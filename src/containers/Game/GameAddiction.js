/**
 * Created by shilim on 2017/6/12.
 */
import React from 'react';
import QueueAnim from 'rc-queue-anim'
import {Breadcrumb, Button, Popconfirm, Form, Input} from 'antd';
const FormItem = Form.Item;

import GameVo from '../../models/GameVo';
import {addGame} from '../../api/gameManageApi';
import {notificationShow} from '../../utils/notification';

const qs = require('qs');

class GameAddictionPage extends React.Component {

  goBack = () => {
    this.props.history.push('/gameList')
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let gameVo = new GameVo();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        gameVo = Object.assign(gameVo, values)
        addGame(qs.stringify({game: gameVo.voToJson()}))
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
        <div key="gameAddiction" style={{padding: 15, background: '#fff'}}>
          <Breadcrumb>
            <Breadcrumb.Item>赛事管理</Breadcrumb.Item>
            <Breadcrumb.Item>新增赛事</Breadcrumb.Item>
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
            <FormItem {...formItemLayout} label="赛事名称" hasFeedback>
              {getFieldDecorator('gamename', {rules: [{required: true, message: '赛事名称不能为空'}]})(
                <Input/>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="赛事类型" hasFeedback>
              {getFieldDecorator('gametype', {rules: [{required: true, message: '赛事类型不能为空'}]})(
                <Input/>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="赛事位置" hasFeedback>
              {getFieldDecorator('gameplace', {rules: [{required: true, message: '赛事位置不能为空'}]})(
                <Input/>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="赛事器材" hasFeedback>
              {getFieldDecorator('equip', {rules: [{required: true, message: '赛事器材不能为空'}]})(
                <Input/>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="赛事时间" hasFeedback>
              {getFieldDecorator('gametime', {rules: [{required: true, message: '赛事时间不能为空'}]})(
                <Input type="Date"/>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="赛事介绍" hasFeedback>
              {getFieldDecorator('gamedec', {rules: [{required: true, message: '赛事介绍不能为空'}]})(
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

GameAddictionPage = Form.create()(GameAddictionPage);

export default GameAddictionPage
