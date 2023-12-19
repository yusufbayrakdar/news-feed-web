import React, {useEffect} from "react";
import {useSelector} from "react-redux";

import {Form, Input, Modal} from "antd";

import useBaseScreen from "../../../hooks/useBaseScreen";

export default function LoginModal({isVisible, close}) {
  const {dispatchAction, $} = useBaseScreen();
  const [form] = Form.useForm();

  const loginInProgress = useSelector((state) => state.auth.loginInProgress);
  const loggedIn = useSelector((state) => state.auth.loggedIn);

  const handleOk = () => {
    dispatchAction($().LOGIN_REQUEST, form.getFieldsValue());
  };

  useEffect(() => {
    if (loggedIn) close();
  }, [loggedIn, close]);

  return (
    <Modal
      title="Login"
      visible={isVisible}
      onOk={handleOk}
      onCancel={close}
      okButtonProps={{loading: loginInProgress}}
      cancelButtonProps={{loading: loginInProgress}}>
      <Form form={form} layout="vertical">
        <Form.Item label="Email" name="email" required>
          <Input />
        </Form.Item>
        <Form.Item label="Password" name="password" required>
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  );
}
