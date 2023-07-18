import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import './styles/PersonalPage.scss';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Card, Empty, Popover, Skeleton } from 'antd'
import SocialModal from './PersonalComponents/SocialModal'
import DetailBioModal from './PersonalComponents/DetailBioModal';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { getUserDetail } from '../../../redux/silceReducers/userSlice';
import { userDetailRemainingSelector } from '../../../redux/selector';
import AvatarModal from './PersonalComponents/AvatarModal';
import { useTranslation } from 'react-i18next'
const Buffer = require('buffer/').Buffer
const PersonalPage = () => {
    const { t } = useTranslation();
    const language = useSelector(state => state.app.language);
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const getUser = useSelector(userDetailRemainingSelector);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState({});
    const [imageBase64, setImageBase64] = useState('');
    useEffect(() => {
        dispatch(getUserDetail(id))
            .then((res) => {
                setIsLoading(false);
                if (!res.payload.id) {
                    navigate('not-found')
                }
            })
            .catch(() => setIsLoading(false));
        ;

    }, [id, dispatch]);

    useEffect(() => {
        setUser(getUser);
        if (getUser.avatar) {
            const base64String = new Buffer(getUser.avatar, 'base64').toString('binary');
            setImageBase64(base64String);
        }
        if (getUser.avatar == null) {
            setImageBase64('https://anubis.gr/wp-content/uploads/2018/03/no-avatar.png')
        }
    }, [getUser])

    const socialLink = { facebook: 'facebook', youtube: 'youtube', twitter: 'twitter' }
    return (
        <>
            {isLoading === false ?
                <div className='personal-container'>
                    <div className='info-content'>
                        <div className='info-header'>
                            <AvatarModal id={id} image={`${imageBase64}`} />
                            <div className='name'>
                                <h4>{language === 'vi' ? `${user.lastName} ${user.firstName} ` :
                                    `${user.firstName} ${user.lastName} `}
                                    {user.role === 'R0' ?
                                        <Popover content={t("admin")} placement='topLeft'>
                                            <i className="bi bi-patch-check-fill text-primary"></i>
                                        </Popover> : ''}

                                </h4>
                                <p> {user.email} <i className="bi bi-envelope-at-fill"></i></p>
                                <p className='social-link'>
                                    <Link className='nav-link'> <i className="bi bi-facebook text-primary"></i></Link>
                                    <Link className='nav-link'> <i className="bi bi-youtube text-danger"></i></Link>
                                    <Link className='nav-link'> <i className="bi bi-twitter text-info"></i></Link>

                                    <SocialModal socialLink={socialLink} />
                                </p>
                            </div>
                        </div>

                        <div className='infomation'>
                            <h5>{t("introduce")}</h5>
                            <div className='table'>
                                <p><i className="bi bi-pin-map-fill"></i> {user.address ? user.address : 'Chưa cập nhật'}</p>
                                <p><i className="bi bi-person-heart"></i> 10 {t("follower")}</p>
                            </div>

                            <DetailBioModal user={user} />

                            <Card title={t("photo")} extra={<NavLink>{t("view-all")}</NavLink>}>
                                {!id.null ?
                                    <Empty description={t("empty")} /> : ''
                                }
                            </Card>
                        </div>
                    </div>


                    <div className='post-content'>
                        <Scrollbars style={{ width: '100%', height: '1000px' }}>
                            <div className='m-3'>
                                <Skeleton /><Skeleton /><Skeleton /><Skeleton /><Skeleton /><Skeleton /><Skeleton /><Skeleton />
                            </div>
                        </Scrollbars>
                    </div>

                </div>
                : 'Loading'
            }
        </>
    )
}

export default PersonalPage