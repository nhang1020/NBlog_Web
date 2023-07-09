import { Button, Input, Modal, Card, Avatar, Select, Spin, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { createPost } from '../../../redux/silceReducers/postSlice'
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { allCodeRemainingSelector } from '../../../redux/selector'
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
const ModalQuickPost = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    // const [fileList, setFileList] = useState([]);
    const allCodes = useSelector(allCodeRemainingSelector);
    const [contents, setContents] = useState('');


    const showModal = () => {
        setOpen(true);
    };
    const handlePost = () => {
        setConfirmLoading(true);

        setOpen(false);
        setConfirmLoading(false);

        setTimeout(() => {
            dispatch(createPost({
                userId: 18,
                topic: 'T1',
                privacy: 'P0',
                contents: contents,
                theme: 'danger'
            }));
        }, 1000);
    };
    const handleCancel = () => {
        setOpen(false);
    };
    //Upload
    const handleOnchangeContent = (e) => {
        setContents(e.target.value)
    }

    const handleCancelImage = () => setPreviewOpen(false);
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };
    return (
        <>
            <span className='m-3' style={{ fontSize: '13pt', cursor: 'pointer' }} onClick={showModal}>
                <i className="bi bi-file-image text-success"> </i>
                <i className="bi bi-pen text-success"> </i>
            </span>
            <Button className='rounded-pill mt-2' size='large'
                style={{ color: 'silver', width: '100%', textAlign: 'left' }}
                onClick={showModal} >What are you thinking?</Button>

            <Modal
                title="CREATE NEW POST"
                open={open}
                onOk={handlePost}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                okText='Post'
                footer={[<Button
                    disabled={contents ? false : true}
                    key=''
                    onClick={handlePost}>
                    {confirmLoading ? <Spin /> : 'Post'}
                </Button>]
                }
            >
                <Card bordered={false} style={{ display: 'flex' }}>
                    <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
                    <div>
                        <Select style={{ width: '100%' }} defaultValue='P0'>
                            {allCodes && allCodes.length > 0 &&
                                allCodes.map((item, index) => {
                                    return item.type === 'Privacy' ? <Select.Option value={item.keyMap} key={index} >{item.valueEn}</Select.Option>
                                        : ''
                                })
                            }

                        </Select>
                    </div>
                </Card>
                <Input
                    onChange={handleOnchangeContent}
                    placeholder='Hey Nhang, what are you doing?'
                    className='mt-3 mb-5'
                    size='large'
                    bordered={false} />

                <Upload method='GET'
                    onPreview={handlePreview}
                    accept="image/png, image/jpeg"
                    maxCount={5} listType="picture-card"
                    multiple={true}
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

                <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancelImage}>
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