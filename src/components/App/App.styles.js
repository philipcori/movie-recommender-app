import React from "react";
import styled from "styled-components";

const StyledContent = styled.div`
  flex: 1 0 auto;
  background-color: #f7f7f7;
  margin-top: 70px;
`;

const Content = ({ children }) => <StyledContent>{children}</StyledContent>;

export default Content;
