import { PlusOutlined } from '@ant-design/icons';
import {
    Button, Checkbox, DatePicker, Form, Input, InputNumber, Radio, Select, Slider, Switch, TreeSelect, Upload,
} from 'antd';
import { useState } from 'react';
const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};
const FormDisabledDemo = () => {
    return (
        <div className='container'>
            <Form labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }} layout="horizontal" style={{ maxWidth: 800 }}
                className='row'
            >

                <Form.Item label="Input">
                    <Input />
                </Form.Item>
                <Form.Item label="Select">
                    <Select>
                        <Select.Option value="demo">Demo</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item label="DatePicker">
                    <DatePicker />
                </Form.Item>

                <Form.Item label="InputNumber">
                    <InputNumber />
                </Form.Item>


                <Form.Item label="Switch" valuePropName="checked">
                    <Switch />
                </Form.Item>

                <Form.Item label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
                    <Upload action="/upload.do" listType="picture-card">
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
                </Form.Item>

                <Form.Item label="">
                    <Button>Save</Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default () => <FormDisabledDemo />;