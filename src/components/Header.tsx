import React from "react";
import styled from "styled-components";
import grubdashLogo from "../grubdash-logo.png";

export const partnerColor = "#008363";
export const partnerColorAlpha = "#00836314";

export const Header = () => {
  return (
    <HeaderShell>
      <StyledHeader>
        <Logo src= {grubdashLogo} alt="GrubDash" />
      </StyledHeader> <PortalLabel>Merchant Portal</PortalLabel>
    </HeaderShell>
  );
};

const HeaderShell = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
  padding: 20px;
  border-bottom: 1px solid ${partnerColorAlpha};
`;

const StyledHeader = styled.h1`
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  display: block;
  height: 44px;
  width: auto;
`;

const PortalLabel = styled.span`
rc  color: #555;
`;