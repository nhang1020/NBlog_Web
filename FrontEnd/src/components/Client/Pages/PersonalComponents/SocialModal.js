import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Input } from 'antd';
import { useTranslation } from 'react-i18next'

const App = (props) => {
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const link = props.socialLink
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        form.setFieldsValue({ facebook: link.facebook, youtube: link.youtube, twitter: link.twitter })
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Button className='border-0' onClick={showModal}><i className="bi bi-pen-fill"></i></Button>
            <Modal title={t("another-social")} open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}

            >
                <Form onFinish={handleOk} name="wrap" labelAlign="left" form={form}
                    labelCol={{
                        flex: '110px',
                    }}>

                    <Form.Item label="Facebook link" name="facebook">
                        <Input addonAfter={<i className="bi bi-facebook text-primary"></i>} />
                    </Form.Item>

                    <Form.Item label="Youtube link" name="youtube" >
                        <Input addonAfter={<i className="bi bi-youtube text-danger"></i>} />
                    </Form.Item>

                    <Form.Item label="Twitter link" name="twitter" >
                        <Input addonAfter={<i className="bi bi-twitter text-info"></i>} />
                    </Form.Item>

                    <Form.Item label="" >
                        <Button htmlType="submit">
                            {t("save")}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};
export default App;