import React, { useState } from 'react';
import { Modal } from 'antd';
import { Upload } from 'antd';
import { Button, Popconfirm } from 'antd';
import { CloudUploadOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';
import imageCompression from 'browser-image-compression';
import { useDispatch } from 'react-redux';
import { editUser } from '../../../../redux/silceReducers/userSlice';
import { v1 } from 'uuid'
const App = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [file, setFile] = useState(null);
    const dispatch = useDispatch();
    const showModal = () => {
        setIsModalOpen(true);
        setFile(props.image);
    };
    const handleOk = () => {
        setIsModalOpen(false);
        if (file !== null && file !== props.image) {
            dispatch(editUser({
                id: props.id,
                avatar: file
            }))
        }
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onChange = async ({ file: newFile }) => {
        const file = newFile.originFileObj;
        console.log(file);
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 200,
            useWebWorker: true,
        }
        if (file && (file.size / 1024) >= options.maxWidthOrHeight) {
            imageCompression(file, options).then(async (x) => {
                const reader = new FileReader();
                reader.onload = function (e) {
                    const imageUrl = e.target.result; // URL của hình ảnh đã chọn
                    setFile(imageUrl);
                };
                reader.readAsDataURL(x);
            })
        } else {
            const reader = new FileReader();
            reader.onload = function (e) {
                const imageUrl = e.target.result; // URL của hình ảnh đã chọn
                setFile(imageUrl);
            };
            reader.readAsDataURL(file);
        }

    };
    const popup = [
        <Popconfirm
            title="Thông báo"
            description="Bạn có chắc muốn thay ảnh đại diện không"
            okText="Có"
            cancelText="Không"
            onConfirm={handleOk}
            key={v1()}
            disabled={file !== props.image ? false : true}
        >
            <Button disabled={file !== props.image ? false : true}>Lưu</Button>
        </Popconfirm>
    ]
    return (
        <>

            <div className='avatar' onClick={showModal}>
                <img src={props.image} alt="avatar" />
            </div>
            <Modal title="Chọn ảnh đại diện" open={isModalOpen}
                onCancel={handleCancel}
                footer={popup}
            >
                <img src={file} className='avatar-pre' width={'100%'} alt='avatar' />
                <ImgCrop rotationSlider>
                    <Upload
                        method='GET'
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        accept="image/png, image/jpeg" maxCount={1}
                        onChange={onChange}
                    >
                        <Button className='mt-3' icon={<CloudUploadOutlined />}>Chọn ảnh</Button>
                    </Upload>
                </ImgCrop>
            </Modal>
        </>
    );
};
export default App;