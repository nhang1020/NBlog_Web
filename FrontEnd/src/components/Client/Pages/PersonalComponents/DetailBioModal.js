import React, { useState, useRef, useEffect } from 'react';
import { Button, Input, Modal, DatePicker, Select, message } from 'antd';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '../styles/DetailBioModal.scss'
import AddressSelect from './AddressSelect';
import { getAllCode } from '../../../../redux/silceReducers/adminReducers'
import { useDispatch, useSelector } from 'react-redux';
import { allCodeRemainingSelector, userInfoSelector } from '../../../../redux/selector'
import { editUser } from '../../../../redux/silceReducers/userSlice';
import moment from 'moment';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next'
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];

const App = (props) => {
    const { t } = useTranslation();
    const language = useSelector(state => state.app.language);
    const [messageApi, contextHolder] = message.useMessage();
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState('');
    const user = props.user;
    const userLogin = useSelector(userInfoSelector);
    const [address, setAddress] = useState('');
    const [size, setSize] = useState('60%');
    const [hidden, setHidden] = useState(true);

    const allcodes = useSelector(allCodeRemainingSelector);
    const [listGenders, setListGenders] = useState([]);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [gender, setGender] = useState('');
    const [birth, setBirth] = useState('');
    const [profile, setProfile] = useState('');

    const showModal = () => {
        setIsModalOpen(true);
        setData(user.profile)
        setHidden(true);
        setAddress(user.address);
        setPhoneNumber(user.phoneNumber);
        setGender(user.gender);
        let timeVal = moment(user.birth).toDate();
        setBirth(timeVal.toISOString().slice(0, 10).replace('T', ' '));
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const containerRef = useRef(null);

    useEffect(() => {
        dispatch(getAllCode());
        //Resize
        const handleResize = () => {
            if (window.innerWidth < 1000) {
                setSize('100%')
            } else {
                setSize('60%')
            }
        };
        const resizeObserver = new ResizeObserver(handleResize);
        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }
        return () => {
            resizeObserver.disconnect();
        };
    }, [dispatch]);
    useEffect(() => {
        setListGenders(allcodes)
    }, [allcodes]);

    const handleSaveBio = () => {
        dispatch(editUser({
            id: userLogin.id,
            phoneNumber: phoneNumber,
            gender: gender,
            birth: birth,
            address: address
        })).then(() => {
            messageApi.open({
                type: 'success',
                content: 'Lưu thông tin cá nhân thành công!',
            });
        })
    }
    const onChangeBirth = (value) => {
        if (value) {
            setBirth(moment(value.$d).format("YYYY-MM-DD"));
        }
    }
    const onChangeGender = (value) => {
        setGender(value);
    }
    const onChangePhoneNumber = (e) => {
        setPhoneNumber(e.target.value)
    }
    const saveBio = () => {
        dispatch(editUser({
            id: userLogin.id,
            profile: profile
        })).then((res) => {
            if (res.payload.errCode === 0) {
                messageApi.open({
                    type: 'success',
                    content: 'Lưu thông tin cá nhân thành công!',
                });
            }
        })
    }

    const getAddressChildren = (value) => {
        setAddress(value);
    }
    return (
        <div ref={containerRef}>
            {contextHolder}
            <Button className='info-detail' onClick={(showModal)}>{t("view-info-detail")}</Button>
            <Modal width={size} title={t("info-detail")} open={isModalOpen} onCancel={handleCancel}
                okText={t("save-bio")} cancelText={t("cancel")}
                onOk={saveBio}
            >
                {userLogin.id === user.id ?
                    <div>
                        <AddressSelect
                            getAddressChildren={getAddressChildren}
                            hidden={hidden} address={address} />
                        <div className='form'>
                            <Input className='control'
                                onChange={onChangePhoneNumber}
                                value={phoneNumber} type='number' placeholder={t("phone-number")} />

                            <DatePicker value={dayjs(birth, language === 'vi' ? 'YYYY/MM/DD' : 'YYYY/DD/MM')}
                                className='control' onChange={onChangeBirth} placeholder='Ngày sinh'
                                format={dateFormatList} />
                            <Select placeholder={t("gender")}
                                value={gender}
                                className='control'
                                onChange={onChangeGender}
                            >
                                {listGenders && listGenders.length > 0 &&
                                    listGenders.map((item, index) => {
                                        return item.type === 'Gender' ?
                                            <Select.Option key={index} value={item.keyMap} >
                                                {language === 'vi' ? item.valueVi : item.valueEn}
                                            </Select.Option> : ''
                                    })
                                }
                            </Select>
                        </div>

                        <Button className='mb-5 mt-3' htmlType="submit" onClick={handleSaveBio}>
                            {t("save-info")}
                        </Button>

                        <CKEditor
                            editor={ClassicEditor}
                            data={data}
                            onChange={(event, editor) => {
                                setProfile(editor.getData());
                            }}
                        />
                    </div>
                    : ''
                }
            </Modal>

        </div>
    );
};
export default App;