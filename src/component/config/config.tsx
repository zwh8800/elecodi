import * as React from 'react';
import { useEffect } from 'react';
import { Drawer, Form, Input, Button } from 'antd';

import * as conf from '@/conf/elecodiConf';
import FileSelect from '@/component/fileselect/fileselect';

interface Props {
    visible: boolean;
    onCloseConfig: () => void;
}

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
};

function Config(props: Props) {
    const [form] = Form.useForm();
    const { visible } = props;

    let config = new conf.Config();

    useEffect(() => {
        form.setFieldsValue(conf.getConfig());
    }, [visible]);

    function onFinish(values: conf.Config) {
        conf.setConfig(Object.assign({}, config, values));
        props.onCloseConfig();
    }

    function onClose() {
        props.onCloseConfig();
    }

    function onFileSelect(path: string) {
        config.kodiHttpUrl = path;
    }

    return (
        <Drawer
            title="配置"
            width={500}
            placement="right"
            closable={false}
            visible={visible}
            getContainer={false}
            className="config-drawer"
        >
            <Form
                {...layout}
                form={form}
                onFinish={onFinish}>
                <Form.Item name="playerCmd" label="playerCmd">
                    <FileSelect onChange={onFileSelect} />
                </Form.Item>
                <Form.Item name="kodiHttpUrl" label="kodiHttpUrl" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="kodiWsUrl" label="kodiWsUrl" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <div style={{ textAlign: 'right' }}>
                    <Button htmlType="button" style={{ marginRight: '10px' }} onClick={onClose}>取消</Button>
                    <Button type="primary" htmlType="submit">提交</Button>
                </div>
            </Form>
        </Drawer>
    )
}

export default Config;
