import {
    MenuFoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    MenuUnfoldOutlined
} from '@ant-design/icons';
import { Link, NavLink, Navigate, Outlet, useNavigate } from 'react-router-dom'
import { Layout, Menu, Button } from 'antd';
import { useState } from 'react';
import AnimationPage from '../componentsCustom/AnimationPage';
import './styles/index.scss'
const { Header, Sider, Content } = Layout;
const App = () => {
    let navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Layout>
            <Sider theme='light' collapsible collapsed={collapsed}>

                <NavLink className='nav-link' to='/'>Home</NavLink>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={0}
                    style={{ background: '#fff' }}
                    items={[
                        {
                            key: '1',
                            icon: <UserOutlined />,
                            label: <Link className='nav-link' to='/admin'>Home</Link>,
                        },
                        {
                            key: '2',
                            icon: <VideoCameraOutlined />,
                            label: <Link className='nav-link' to='/admin/users-manage'>User manager</Link>,
                        },
                        {
                            key: '3',
                            icon: <UploadOutlined />,
                            label: <Link className='nav-link' to='/admin/posts-manage'>Post Manager</Link>,
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: 'white',
                    }}
                >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: '90vh',
                        background: 'white',
                    }}
                >
                    <AnimationPage>
                        <Outlet></Outlet>
                    </AnimationPage>
                </Content>
            </Layout>
        </Layout>
    );
};
export default App;