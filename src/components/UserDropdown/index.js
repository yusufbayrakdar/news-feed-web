import React from "react";
import {useSelector} from "react-redux";

import {DownOutlined} from "@ant-design/icons";
import {faLayerGroup, faPowerOff, faUserCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Dropdown, Menu} from "antd";

import useBaseScreen from "../../hooks/useBaseScreen";

function UserDropdown() {
  const {dispatchAction, $} = useBaseScreen();

  const {user} = useSelector((state) => state.auth);

  const menu = (
    <Menu style={{marginTop: 7}}>
      <Menu.Item className="text-center" onClick={() => dispatchAction($().SET_CATEGORY_MODAL_VISIBLE, true)}>
        <FontAwesomeIcon icon={faLayerGroup} style={{marginRight: 10}} />
        Preferred Categories
      </Menu.Item>
      <Menu.Item className="text-center" onClick={() => dispatchAction($().LOGOUT_REQUEST)}>
        <FontAwesomeIcon icon={faPowerOff} style={{marginRight: 10}} />
        Log out
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={menu} trigger={["click"]}>
      <div style={{cursor: "pointer"}} onClick={(e) => e.preventDefault()}>
        <div
          style={{
            margin: 10,
            display: "flex",
            flexDirection: "row"
          }}>
          <FontAwesomeIcon icon={faUserCircle} style={{color: "#008ea5f2", fontSize: 35, marginRight: 10}} />

          <div style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
            <div
              style={{
                color: "white",
                fontSize: 14,
                lineHeight: "14px",
                fontWeight: "bold"
              }}>
              {user?.email || ""}
              <DownOutlined style={{color: "white", fontSize: 12, marginLeft: 4}} />
            </div>
          </div>
        </div>
      </div>
    </Dropdown>
  );
}

export default UserDropdown;
