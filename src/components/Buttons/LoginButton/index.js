import React, {useState} from "react";

import {Button} from "antd";

import LoginModal from "../../Modals/LoginModal";

function LoginButton() {
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  return (
    <>
      <LoginModal isVisible={loginModalVisible} close={() => setLoginModalVisible(false)} />
      <Button ghost onClick={() => setLoginModalVisible(true)}>
        Login
      </Button>
    </>
  );
}

export default LoginButton;
