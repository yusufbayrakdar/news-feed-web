import React from "react";
import {useSelector} from "react-redux";

import {Layout} from "antd";

import {AuthButtonsContainer} from "./styles";

import LoginButton from "../../Buttons/LoginButton";
import SignUpButton from "../../Buttons/SignUpButton";
import UserDropdown from "../../UserDropdown";

function Header() {
  const loggedIn = useSelector((state) => state.auth.loggedIn);

  return (
    <Layout.Header
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center"
      }}>
      {loggedIn ? (
        <UserDropdown />
      ) : (
        <AuthButtonsContainer>
          <SignUpButton />
          <LoginButton />
        </AuthButtonsContainer>
      )}
    </Layout.Header>
  );
}
export default Header;
