import React, {useState} from "react";

import {Button} from "antd";

import SignUpModal from "../../Modals/SignUpModal";

function SignUpButton() {
  const [signUpModalVisible, setSignUpModalVisible] = useState(false);
  return (
    <>
      <SignUpModal isVisible={signUpModalVisible} close={() => setSignUpModalVisible(false)} />
      <Button onClick={() => setSignUpModalVisible(true)}>Sign Up</Button>
    </>
  );
}

export default SignUpButton;
