/**
 * Created by shilim on 2017/6/12.
 */
import React from 'react';
import QueueAnim from 'rc-queue-anim'
import {Breadcrumb, Button, Popconfirm, Form, Input} from 'antd';
const FormItem = Form.Item;

import EquipmentTypeVo from '../../models/EquipmentTypeVo';
import {getOneEquipmentType,updateEquipomentType} from '../../api/equipmentTypeManageApi';
import {notificationShow} from '../../utils/notification';

const qs = require('qs');

class EquipmentTypeEditionPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {equipmentType:{}}
  }

  goBack = () => {
    this.props.history.push('/equipmentTypeList')
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let equipmentTypeVo = new EquipmentTypeVo();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        equipmentTypeVo = Object.assign(equipmentTypeVo,this.state.equipmentType,values)
        updateEquipomentType(qs.stringify({equipmentType: equipmentTypeVo.voToJson()}))
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
        <div key="equipmentTypeEdition" style={{padding: 15, background: '#fff'}}>
          <Breadcrumb>
            <Breadcrumb.Item>器材管理</Breadcrumb.Item>
            <Breadcrumb.Item>修改器材类型</Breadcrumb.Item>
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
            <FormItem {...formItemLayout} label="类型名称" hasFeedback>
              {getFieldDecorator('typename', {rules: [{required: true, message: '类型名称不能为空'}]})(
                <Input/>
              )}
            </FormItem>
          </Form>
        </div>
      </QueueAnim>
    )
  }

  componentDidMount() {
    let equipmentTypeVo = new EquipmentTypeVo(this.props.match.params.id);
    getOneEquipmentType(qs.stringify({equipmentType:equipmentTypeVo.voToJson()}))
      .then(res => {
        this.setState({...this.state,equipmentType:res.data.resultParam})
        this.props.form.setFieldsValue(this.state.equipmentType)
      })
      .catch(err => {
        notificationShow('error',err)
      })
  }

}

EquipmentTypeEditionPage = Form.create()(EquipmentTypeEditionPage);

export default EquipmentTypeEditionPage
