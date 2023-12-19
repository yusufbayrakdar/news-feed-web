import React from "react";
import {useSelector} from "react-redux";

import {Layout} from "antd";

import LoginButton from "../../Buttons/LoginButton";
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
      {loggedIn ? <UserDropdown /> : <LoginButton />}
    </Layout.Header>
  );
}
export default Header;
