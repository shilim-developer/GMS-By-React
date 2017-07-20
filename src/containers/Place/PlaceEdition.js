/**
 * Created by shilim on 2017/6/12.
 */
import React from 'react';
import QueueAnim from 'rc-queue-anim'
import {Breadcrumb, Button, Popconfirm, Form, Input, Select} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

import {notificationShow} from '../../utils/notification'
import PlaceVo from '../../models/PlaceVo'
import PlaceStatusVo from '../../models/PlaceStatusVo'
import PageVo from '../../models/PageVo'
const qs = require('qs')

import {getPlaceTypeList} from '../../api/placeTypeManageApi'
import {getOnePlace,getPlaceStatus,updatePlace} from '../../api/placeManageApi'
class PlaceEditionPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      place:{},
      placeTypeList: [],
      placeStatusList:[]
    }
  }

  goBack = () => {
    this.props.history.push('/placeList')
  }

  getPlaceTypeLists = () => {
    getPlaceTypeList(qs.stringify({page:new PageVo(1,100).voToJson()}))
      .then(res => {
        switch (res.data.serviceResult) {
          case 1:
            this.setState({
              ...this.state,
              placeTypeList: res.data.resultParam.list
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
    let placeVo = new PlaceVo();
    let placeStatusList = [];
    this.props.form.validateFields((err, values) => {
      if (!err) {
        placeVo = Object.assign(placeVo,this.state.place, values)
        delete placeVo.placeStatusList;
        values.placeStatusList.forEach((item,index) => {
          placeStatusList.push(Object.assign(new PlaceStatusVo(),
            this.state.placeStatusList[index],item))
        })
        updatePlace(qs.stringify({place: placeVo.voToJson(),placeStatusList:JSON.stringify(placeStatusList)}))
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

  tdRender = (start, end) => {
    const {getFieldDecorator} = this.props.form;
    const tableCellTDStyle = {padding: '8px 8px', borderRight: '1px solid #e9e9e9', borderBottom: '1px solid #e9e9e9'};
    let dom = [];
    for (let i = start; i <= end; i++) {
      dom.push(
        <td style={tableCellTDStyle}>
          {getFieldDecorator('placeStatusList['+i+'].placeStatus',
            {initialValue:this.state.placeStatusList.length>0?
              this.state.placeStatusList[i].placeStatus:'空闲'})(
            <Select disabled={
              this.state.placeStatusList.length>0 && (
              this.state.placeStatusList[i].placeStatus === '已预订' ||
              this.state.placeStatusList[i].placeStatus === '已租借') }>
              <Option key="空闲" value="空闲">空闲</Option>
              <Option key="上课" value="上课">上课</Option>
            </Select>
          )}
          {getFieldDecorator('placeStatusList['+i+'].id',
            {initialValue:this.state.placeStatusList.length>0?
              this.state.placeStatusList[i].id:''})}
        </td>
      )
    }
    return dom;
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
    const tableCellTHStyle = {
      padding: '8px 8px',
      background: '#f7f7f7',
      borderRight: '1px solid #e9e9e9',
      borderBottom: '1px solid #e9e9e9'
    };
    return (
      <QueueAnim duration="1200">
        <div key="placeEdition" style={{padding: 15, background: '#fff', minHeight: 360}}>
          <Breadcrumb>
            <Breadcrumb.Item>场地管理</Breadcrumb.Item>
            <Breadcrumb.Item>修改场地</Breadcrumb.Item>
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
            <FormItem {...formItemLayout} label="场地名称" hasFeedback>
              {getFieldDecorator('placeName', {rules: [{required: true, message: '场地名称不能为空'}]})(
                <Input/>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="场地类型" hasFeedback>
              {getFieldDecorator('placeType.id', {
                rules: [{required: true, message: '场地类型不能为空'}
                ], initialValue: this.state.placeTypeList.length > 0 ? this.state.placeTypeList[0].id + '' : ''
              })(
                <Select>
                  {this.state.placeTypeList.map((item) => {
                    return (<Option key={item.id} value={item.id + ''}>{item.placeTypeName}</Option>)
                  })}
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="场地位置" hasFeedback>
              {getFieldDecorator('placeLocation', {rules: [{required: true, message: '场地位置不能为空'}]})(
                <Input/>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="租借费用" hasFeedback>
              {getFieldDecorator('cost', {rules: [{required: true, message: '租借费用不能为空'}]})(
                <Input type="number"/>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="场地状态">
              <table
                style={{width: '100%', border: '1px solid #e9e9e9', borderSpacing: 0, borderRight: 0, borderBottom: 0}}>
                <thead>
                <tr>
                  <th style={tableCellTHStyle}></th>
                  <th style={tableCellTHStyle}>日</th>
                  <th style={tableCellTHStyle}>一</th>
                  <th style={tableCellTHStyle}>二</th>
                  <th style={tableCellTHStyle}>三</th>
                  <th style={tableCellTHStyle}>四</th>
                  <th style={tableCellTHStyle}>五</th>
                  <th style={tableCellTHStyle}>六</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <th style={tableCellTHStyle}>第一节</th>
                  {this.tdRender(0,6)}
                </tr>
                <tr>
                  <th style={tableCellTHStyle}>第二节</th>
                  {this.tdRender(7,13)}
                </tr>
                <tr>
                  <th style={tableCellTHStyle}>第三节</th>
                  {this.tdRender(14,20)}
                </tr>
                <tr>
                  <th style={tableCellTHStyle}>第四节</th>
                  {this.tdRender(21,27)}
                </tr>
                <tr>
                  <th style={tableCellTHStyle}>第五节</th>
                  {this.tdRender(28,34)}
                </tr>
                </tbody>
              </table>
            </FormItem>
          </Form>
        </div>
      </QueueAnim>
    )
  }

  componentDidMount() {
    this.getPlaceTypeLists();
    let placeVo = new PlaceVo();
    placeVo.id = this.props.match.params.id;
    getOnePlace(qs.stringify({place:placeVo.voToJson()}))
      .then(res => {
        this.setState({...this.state,place:res.data.resultParam})
        let setPlace = Object.assign({},this.state.place);
        delete setPlace.placeType;
        this.props.form.setFieldsValue(setPlace)
        let placeStatusVo = new PlaceStatusVo()
        placeStatusVo.placeId = this.props.match.params.id;
        getPlaceStatus(qs.stringify({placeStatus:placeStatusVo.voToJson()}))
          .then(res => {
           this.setState({placeStatusList:res.data.resultParam})
          })
          .catch(err => {
            notificationShow('error',err)
          })
      })
      .catch(err => {
       notificationShow('error',err)
      })
  }

}

PlaceEditionPage = Form.create()(PlaceEditionPage);

export default PlaceEditionPage
