/**
 * Created by shilim on 2017/6/12.
 */
import React from 'react';
import QueueAnim from 'rc-queue-anim'
import {Breadcrumb, Button, Popconfirm, Form, Input, Select} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

import {notificationShow} from '../../utils/notification'
import EquipmentVo from '../../models/EquipmentVo'
import PageVo from '../../models/PageVo'
const qs = require('qs')

import {getEquipmentTypeList} from '../../api/equipmentTypeManageApi'
import {getOneEquipment,updateEquipment} from '../../api/equipmentManageApi'
class EquipmentEditionPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {equipment:{},equipmentTypeList: []}
  }

  goBack = () => {
    this.props.history.push('/equipmentList')
  }

  getEquipmentTypeLists = () => {
    getEquipmentTypeList(qs.stringify({page:new PageVo(1,100).voToJson()}))
      .then(res => {
        switch (res.data.serviceResult) {
          case 1:
            this.setState({
              ...this.state,
              equipmentTypeList: res.data.resultParam.list
            })
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

  handleSubmit = (e) => {
    e.preventDefault();
    let equipmentVo = new EquipmentVo();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        equipmentVo = Object.assign(equipmentVo,this.state.equipment,values)
        updateEquipment(qs.stringify({equipment: equipmentVo.voToJson()}))
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
        <div key="equipmentAddiction" style={{padding: 15, background: '#fff', minHeight: 360}}>
          <Breadcrumb>
            <Breadcrumb.Item>器材管理</Breadcrumb.Item>
            <Breadcrumb.Item>修改器材</Breadcrumb.Item>
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
            <FormItem {...formItemLayout} label="器材名称" hasFeedback>
              {getFieldDecorator('equipmentname', {rules: [{required: true, message: '器材名称不能为空'}]})(
                <Input/>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="器材类型" hasFeedback>
              {getFieldDecorator('equipmentType.typeid', {
                rules: [{required: true, message: '器材类型不能为空'}
                ], initialValue: this.state.equipment.equipmentType ? this.state.equipment.equipmentType.typeid + '' : ''
              })(
                <Select>
                  {this.state.equipmentTypeList.map((item) => {
                    return (<Option key={item.typeid} value={item.typeid + ''}>{item.typename}</Option>)
                  })}
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="器材规格" hasFeedback>
              {getFieldDecorator('estandard', {rules: [{required: true, message: '器材规格不能为空'}]})(
                <Input/>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="器材租借价格" hasFeedback>
              {getFieldDecorator('eprice', {rules: [{required: true, message: '器材租借价格不能为空'}]})(
                <Input type="number"/>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="器材总数" hasFeedback>
              {getFieldDecorator('totalnum', {rules: [{required: true, message: '器材总数不能为空'}]})(
                <Input type="number"/>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="器材可租借数量" hasFeedback>
              {getFieldDecorator('loanablenum', {rules: [{required: true, message: '器材可租借数量不能为空'}]})(
                <Input type="number"/>
              )}
            </FormItem>
          </Form>
        </div>
      </QueueAnim>
    )
  }

  componentDidMount() {
    this.getEquipmentTypeLists();
    let equipmentVo = new EquipmentVo();
    equipmentVo.equipmentid = this.props.match.params.id;
    getOneEquipment(qs.stringify({equipment:equipmentVo.voToJson()}))
      .then(res => {
        this.setState({...this.state,equipment:res.data.resultParam})
        let setEquipment = Object.assign({},this.state.equipment);
        delete setEquipment.equipmentType;
        this.props.form.setFieldsValue(setEquipment)
      })
      .catch(err => {
        notificationShow('error',err)
      })
  }

}

EquipmentEditionPage = Form.create()(EquipmentEditionPage);

export default EquipmentEditionPage
