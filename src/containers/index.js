require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

//路由模块
import {Link} from 'react-router-dom'

//引入antd模块
import {Layout, Menu, Icon} from 'antd'
const SubMenu = Menu.SubMenu;
const {Header, Content, Sider} = Layout;

import 'antd/dist/antd.css'


let yeomanImage = require('../images/yeoman.png');

class AppComponent extends React.Component {
  state = {
    current: '',
    username: 'shilin',
    collapsed: false,
    mode:'inline'
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
      mode: this.state.collapsed ? 'inline' : 'vertical'
    })
  }
  handleClick = (e) => {
    this.setState({
      current: e.key
    });
  }

  render() {
    return (
      <Layout id="main-view">
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <img src={yeomanImage} width="50" id="logo"/>
          <Menu theme="dark"
                onClick={this.handleClick}
                defaultSelectedKeys={[this.state.current]}
                mode={this.state.mode}
          >
            <SubMenu key="sub1" title={<span><Icon type="user"/><span>用户管理</span></span>}>
              <Menu.Item key="1"><Link to="/userList">用户管理</Link></Menu.Item>
              <Menu.Item key="2"><Link to="/roleList">角色管理</Link></Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" title={<span><Icon type="tool"/><span>器材管理</span></span>}>
              <Menu.Item key="4"><Link to="/equipmentTypeList">类型管理</Link></Menu.Item>
              <Menu.Item key="5"><Link to="/equipmentList">器材管理</Link></Menu.Item>
              <Menu.Item key="6"><Link to="/equipmentLoanList">租借管理</Link></Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" title={<span><Icon type="appstore-o"/><span>场地管理</span></span>}>
              <Menu.Item key="7"><Link to="/placeTypeList">类型管理</Link></Menu.Item>
              <Menu.Item key="8"><Link to="/placeList">场地管理</Link></Menu.Item>
              <Menu.Item key="9"><Link to="/placeLeaseRecordList">租借管理</Link></Menu.Item>
            </SubMenu>
            <SubMenu key="sub4" title={<span><Icon type="schedule"/><span>赛事管理</span></span>}>
              <Menu.Item key="10"><Link to="/gameList">赛事管理</Link></Menu.Item>
              <Menu.Item key="11"><Link to="/noticeList">公告管理</Link></Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{background: '#fff', padding: 0,borderBottom:'1px solid #e9e9e9'}}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
            <span>体育馆管理系统</span>
          </Header>
          <Content>
              { this.props.children }
          </Content>
        </Layout>
      </Layout>
    );
  }
}

AppComponent.defaultProps = {};

export default AppComponent;
