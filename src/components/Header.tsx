import React from "react";
import styled from "styled-components";
import grubdashLogo from "../grubdash-logo.svg";

export const partnerColor = "#08765f";

export const Header = () => (
  <HeaderShell>
    <Brand>
      <Logo src={grubdashLogo} alt="GrubDash" />
      <BrandDivider />
      <PortalLabel>Merchant portal</PortalLabel>
    </Brand>
    <Account>
      <AccountDetails>
        <AccountName>Phil's Coffee</AccountName>
        <AccountCaption>Merchant account</AccountCaption>
      </AccountDetails>
      <Avatar aria-hidden="true">PC</Avatar>
    </Account>
  </HeaderShell>
);

const HeaderShell = styled.header`
  height: 76px;
  padding: 0 36px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  border-bottom: 1px solid #e8ebe8;
  @media (max-width: 700px) { height: 68px; padding: 0 20px; }
`;
const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 22px;
  min-width: 0;
`;
const Logo = styled.img`
  display: block;
  width: 170px;
  height: auto;
  @media (max-width: 700px) { width: 145px; }
`;
const BrandDivider = styled.span`
  width: 1px;
  height: 28px;
  background: #dfe5e1;
`;
const PortalLabel = styled.span`
  color: #58645e;
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
  @media (max-width: 520px) { display: none; }
`;
const Account = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;
const AccountDetails = styled.div`
  text-align: right;
  @media (max-width: 700px) { display: none; }
`;
const AccountName = styled.div`
  color: #20332b;
  font-size: 13px;
  font-weight: 700;
`;
const AccountCaption = styled.div`
  margin-top: 3px;
  color: #85918a;
  font-size: 11px;
`;
const Avatar = styled.div`
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #e8f2ed;
  color: ${partnerColor};
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.03em;
`;
