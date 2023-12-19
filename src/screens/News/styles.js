import {Input} from "antd";
import styled from "styled-components";

export const Container = styled.div`
  padding: 30px 0;
`;

export const PagiationContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 30px 0;
`;

export const StyledSearch = styled(Input.Search)`
  margin-bottom: 10px;
`;

export const OpacityLoadingContainer = styled.div`
  opacity: ${({loading}) => (loading ? 0.5 : 1)};
`;

export const SpinnerContainer = styled.div`
  position: absolute;
  z-index: 10;
  top: 60%;
  left: 60%;
  transform: translate(-60%, -60%);
`;
