import React from "react";

import {Layout} from "antd";

import BrandNameStyles from "./styles";

import Filters from "../../Filters";

const Sider = () => {
  return (
    <Layout.Sider width={295}>
      <BrandNameStyles>
        <div>
          <div style={{marginTop: 10}}>NEWS</div>
          <div style={{marginLeft: 45}}>FEED</div>
        </div>
      </BrandNameStyles>
      <Filters />
    </Layout.Sider>
  );
};

export default Sider;
