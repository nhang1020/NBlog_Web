import Container from 'react-bootstrap/Container';
import { Input, Dropdown } from 'antd';
import { SearchOutlined, HomeOutlined, ShoppingOutlined, ReadOutlined, UserAddOutlined, LeftOutlined } from '@ant-design/icons';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import 'react-toastify/dist/ReactToastify.css';
import appSlice from '../redux/silceReducers/appSlice'
import { useDispatch } from 'react-redux';
import './styles/ClientHeader.scss';

const Header = () => {
    const dispatch = useDispatch();
    const handleLogOut = () => {
        dispatch(appSlice.actions.logOut());
    }
    const items = [
        {
            key: '1',
            label: (
                <NavLink className='nav-link' >
                    Tài khoản
                </NavLink>
            ),
        },
        {
            key: '2',
            label: (
                <a >
                    Cài đặt
                </a>
            ),
        },
        {
            key: '3',
            label: (
                <a onClick={handleLogOut} >
                    Đăng xuất
                </a>
            ),
        },
    ];
    return (
        <div className='header'>

            <Navbar expand="lg" className="nav-header">
                <Container>
                    <div className='left-header'>
                        <Input className='rounded-pill' placeholder="Tìm kiếm" prefix={<SearchOutlined />} />
                    </div>
                    <NavLink
                        data-tooltip-content="Home"
                        className='nav-link'
                        to="/">
                        <HomeOutlined />
                    </NavLink>
                    <NavLink
                        data-tooltip-content="Shop"
                        className='nav-link'
                        to="products">
                        <ShoppingOutlined />
                    </NavLink>
                    <NavLink className='nav-link'
                        data-tooltip-content="Blog"
                        to="/posts">
                        <ReadOutlined />
                    </NavLink>

                    <NavLink className='nav-link'
                        data-tooltip-content="Find friends"
                        to="/friends">
                        <UserAddOutlined />
                    </NavLink>


                    <Dropdown
                        menu={{
                            items,
                        }}
                        placement="bottom"
                    >
                        <LeftOutlined className='nav-link dropdown-hover' style={{ cursor: 'pointer' }} />
                    </Dropdown>

                    <div className='right-header'></div>
                </Container>
            </Navbar>





            <Tooltip
                anchorSelect=".nav-link"
                effect="solid"
                border={true}
                style={{
                    borderRadius: '5px',
                    padding: '5px'
                }}
            />

        </div>

    );
}

export default Header;