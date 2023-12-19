import React, {useEffect} from "react";
import {useSelector} from "react-redux";

import {Form, Input, Modal} from "antd";

import useBaseScreen from "../../../hooks/useBaseScreen";

export default function SignUpModal({isVisible, close}) {
  const {dispatchAction, $} = useBaseScreen();
  const [form] = Form.useForm();

  const signUpInProgress = useSelector((state) => state.auth.signUpInProgress);
  const loggedIn = useSelector((state) => state.auth.loggedIn);

  const handleOk = () => {
    dispatchAction($().SIGNUP_REQUEST, form.getFieldsValue());
  };

  useEffect(() => {
    if (loggedIn) close();
  }, [loggedIn, close]);

  return (
    <Modal
      title="Sign Up"
      visible={isVisible}
      onOk={handleOk}
      onCancel={close}
      okButtonProps={{loading: signUpInProgress}}
      cancelButtonProps={{loading: signUpInProgress}}>
      <Form form={form} layout="vertical">
        <Form.Item label="First Name" name="firstName" required>
          <Input />
        </Form.Item>
        <Form.Item label="Last Name" name="lastName" required>
          <Input />
        </Form.Item>
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
