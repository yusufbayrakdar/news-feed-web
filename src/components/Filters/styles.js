import {Menu} from "antd";
import styled from "styled-components";

export const Container = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export const StyledMenu = styled(Menu)`
  margin-top: 7px;
  max-height: 500px;
  overflow: scroll;
  overflow-x: hidden;
`;
