import React from 'react';
import styled from 'styled-components';

function MainFooter() {
  return (
    <MainFooterWrapper>MainFooter</MainFooterWrapper>
  )
}

export default MainFooter;

const MainFooterWrapper = styled.footer`
  margin: 0 auto;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0; left: 0;
  z-index: 999;
`;