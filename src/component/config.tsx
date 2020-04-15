import * as React from 'react';
import { Drawer, Form, Input, Button } from 'antd';
import * as conf from '@/conf/elecodiConf';

interface Props {
    visible: boolean,
    closeConfig: () => void
}

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const Config = (props: Props) => {
    const [form] = Form.useForm();

    const onFinish = (values: conf.Config) => {
        console.log('Success:', values);
        conf.setConfig(values);
        props.closeConfig();
    };
    const onReset = () => {
        form.resetFields();
    }

    const { visible } = props;
    return (
        <Drawer
            title="配置"
            width={500}
            placement="right"
            closable={false}
            maskClosable={false}
            visible={visible}
        >
            <Form
                {...layout}
                form={form}
                onFinish={onFinish}>
                <Form.Item name="playerCmd" label="playerCmd" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="kodiHttpUrl" label="kodiHttpUrl" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="kodiWsUrl" label="kodiWsUrl" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button htmlType="button" style={{marginRight: '10px'}} onClick={onReset}>重置</Button>
                    <Button type="primary" htmlType="submit">提交</Button>
                </Form.Item>
            </Form>
        </Drawer>
    )
}

export default Config;