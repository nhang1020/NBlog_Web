import Container from 'react-bootstrap/Container';
import { Input, Dropdown, Button } from 'antd';
import { SearchOutlined, HomeOutlined, ShoppingOutlined, ReadOutlined, UserAddOutlined, LeftOutlined } from '@ant-design/icons';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import 'react-toastify/dist/ReactToastify.css';
import appSlice from '../redux/silceReducers/appSlice';
import { userInfoSelector } from '../redux/selector'
import { useDispatch, useSelector } from 'react-redux';
import './styles/ClientHeader.scss';

import { useTranslation } from 'react-i18next';
const Header = () => {
    const { t } = useTranslation();
    const { i18n } = useTranslation();
    const dispatch = useDispatch();
    const user = useSelector(userInfoSelector);
    const lang = useSelector(state => state.app.language);
    const handleLogOut = () => {
        dispatch(appSlice.actions.logOut());
    }
    const handleChangeLanguage = (language) => {
        i18n.changeLanguage(language);
        dispatch(appSlice.actions.changeLanguage(language));
    };
    const items = [
        {
            key: '1',
            label: (
                <NavLink to={`/user/info/${user.id}`} className='nav-link' >
                    {t("account")}
                </NavLink>
            ),
        },
        {
            key: '2',
            label: (
                <NavLink className='nav-link' >{t("setting")}</NavLink>
            ),
        },
        {
            key: '3',
            label: (
                <NavLink onClick={handleLogOut} className='nav-link' >
                    {t("logout")}
                </NavLink>
            ),
        },
    ];
    return (
        <div className='header'>
            <Navbar expand="lg" className="nav-header">
                <div className='left-header'>
                    <Input className='rounded-pill' bordered={false} placeholder={t('search')} prefix={<SearchOutlined />} />
                </div>
                <Container>

                    <NavLink
                        data-tooltip-content={t("home")}
                        className='nav-link'
                        to="/">
                        <HomeOutlined className='button' />
                    </NavLink>
                    <NavLink
                        data-tooltip-content={t("sell")}
                        className='nav-link'
                        to="products">
                        <ShoppingOutlined className='button' />
                    </NavLink>
                    <NavLink className='nav-link'
                        data-tooltip-content={t("post")}
                        to="/posts">
                        <ReadOutlined className='button' />
                    </NavLink>

                    <NavLink className='nav-link'
                        data-tooltip-content={t("find-friend")}
                        to="/friends">
                        <UserAddOutlined className='button' />
                    </NavLink>


                    <Dropdown
                        menu={{
                            items,
                        }}
                        placement="bottom"
                    >
                        <LeftOutlined className='nav-link dropdown-hover button' style={{ cursor: 'pointer' }} />
                    </Dropdown>


                </Container>
                <div className='right-header'>
                    <span className={lang === 'vi' ? 'lang active' : 'lang'}
                        onClick={() => handleChangeLanguage('vi')}>
                        VI
                    </span>
                    <span className={lang === 'en' ? 'lang active' : 'lang'}
                        onClick={() => handleChangeLanguage('en')}>
                        EN
                    </span>
                </div>
            </Navbar>

            <Tooltip
                anchorSelect=".nav-link"
                effect="solid"
                border={true}
                style={{
                    borderRadius: '5px',
                    padding: '5px',
                    zIndex: 10,
                    backgroundColor: 'rgb(255,255,255)',
                    color: 'gray',
                    boxShadow: '0 2px 5px silver'
                }}
            />

        </div>

    );
}

export default Header;