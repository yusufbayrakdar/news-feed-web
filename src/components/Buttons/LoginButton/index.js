import { Button } from "antd"
import React, { useState } from 'react'
import Styles from './styles';
import LoginModal from "../../Modals/LoginModal";

function LoginButton() {
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  return (
    <Styles>
        <LoginModal isVisible={loginModalVisible} close={() => setLoginModalVisible(false)} />
        <Button>
            Sign Up
        </Button>
        <Button ghost onClick={() => setLoginModalVisible(true)}>
            Login
        </Button>
    </Styles>
  )
}

export default LoginButton