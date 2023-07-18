import { Button, Input, Modal, Card, Avatar, Select, Spin, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Col, Row } from 'antd'
import { createPost } from '../../../redux/silceReducers/postSlice'
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { allCodeRemainingSelector, userInfoSelector } from '../../../redux/selector'
import { useTranslation } from 'react-i18next';

import imageCompression from 'browser-image-compression';

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
const icons = [<i className="bi bi-globe-americas"></i>, <i className="bi bi-person-heart"></i>, <i className="bi bi-file-earmark-lock2"></i>]
const { TextArea } = Input;


const ModalQuickPost = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const user = useSelector(userInfoSelector);
    // const [fileList, setFileList] = useState([]);
    const allCodes = useSelector(allCodeRemainingSelector);
    const [contents, setContents] = useState('');
    const [privacy, setPrivacy] = useState('P0');
    const [fileList, setFileList] = useState([]);
    const [image, setImage] = useState(null);
    let photo = "";
    const showModal = () => {
        setOpen(true);
        setContents('');
        setPrivacy('P0');
    };
    const handlePost = () => {
        setOpen(false);
        dispatch(createPost({
            userId: user.id,
            topic: 'T1',
            privacy: privacy,
            contents: contents,
            theme: 'danger',
            listImage: fileList
        }));
    };
    const handleCancel = () => {
        setOpen(false);
    };
    const onChangeAllCode = (value) => {
        setPrivacy(value);
    }
    //Upload
    const handleOnchangeContent = (e) => {
        setContents(e.target.value)
    }

    const handleCancelViewImage = () => setPreviewOpen(false);
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };
    const handleChangeImage = (data) => {

        // console.log(newWards);
        // setFileList(newWards);
        convertImagesToBase64(data.fileList)
            .then((base64Strings) => {
                setFileList(base64Strings) // Mảng chứa các chuỗi base64 của hình ảnh
            })
            .catch((error) => {
                console.error(error);
            });
    }


    function convertImagesToBase64(images) {
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 200,
            useWebWorker: true,
        }
        const promises = images.map((image) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();

                reader.onload = () => {
                    resolve(reader.result);
                };

                reader.onerror = (error) => {
                    reject(error);
                };
                if (image.originFileObj && (image.originFileObj.size / 1024) >= options.maxWidthOrHeight) {
                    imageCompression(image.originFileObj, options).then(async (x) => {
                        reader.readAsDataURL(x);
                    })
                } else {
                    reader.readAsDataURL(image.originFileObj);
                }
            });
        });

        return Promise.all(promises);
    }
    let i = 0;
    return (
        <>
            <Button className='rounded-pill' size='large'
                style={{ color: 'silver', width: '100%', textAlign: 'left' }}
                onClick={showModal} >{`Hey ${user.firstName}! ${t("what-think")}`}</Button>

            <Modal
                title="Tạo bài viết mới"
                centered
                open={open}
                onOk={handlePost}
                onCancel={handleCancel}
                okText='Post'
                footer={[<Button
                    disabled={contents ? false : true}
                    key=''
                    onClick={handlePost}>Post
                </Button>]
                }
            >
                <Card bordered={false} style={{ display: 'flex' }} >
                    <Row>
                        {user ?
                            <Col span={15}>
                                <Avatar size='large' src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
                                <strong>{`${user.lastName} ${user.firstName}`}</strong>
                            </Col> : ''
                        }
                        <Col span={9}>
                            <Select style={{ minWidth: '80%', boxShadow: '1px 1px 4px #fdd', borderRadius: '5px' }}
                                bordered={false} value={privacy}
                                className=''
                                onChange={onChangeAllCode}
                            >
                                {allCodes && allCodes.length > 0 &&
                                    allCodes.map((item, index) => {
                                        return item.type === 'Privacy' ?
                                            <Select.Option value={item.keyMap} key={index} >
                                                {icons[i++]} {item.valueVi}
                                            </Select.Option>
                                            : ''
                                    })
                                }
                            </Select>
                        </Col>
                    </Row>
                </Card>
                <TextArea
                    onChange={handleOnchangeContent}
                    placeholder={t("what-think")}
                    className='mt-3 mb-5'
                    size='large'
                    bordered={false}
                    value={contents}
                />
                <hr />
                <Upload method='GET'
                    onPreview={handlePreview}
                    accept="image/png, image/jpeg, image/jpg"
                    maxCount={5} listType="picture-card"
                    multiple={true}
                    onChange={handleChangeImage}
                >
                    <div>
                        <PlusOutlined />
                        <div
                            style={{
                                marginTop: 8,
                            }}
                        >
                            Upload
                        </div>
                    </div>
                </Upload>

                <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancelViewImage}>
                    <img
                        alt="example"
                        style={{
                            width: '100%',
                        }}
                        src={previewImage}
                    />
                </Modal>
            </Modal >
            <ToastContainer />
        </>
    );
};
export default ModalQuickPost;