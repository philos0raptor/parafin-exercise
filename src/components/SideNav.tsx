import React from "react";
import styled from "styled-components";
import { partnerColor } from "./Header.tsx";

export const SideNav = ({
  activeTab,
  onClick,
  bnplLoading,
  orderLoading,
}: {
  activeTab: string;
  onClick: (product: string) => void;
  bnplLoading?: boolean;
  orderLoading?: boolean;
}) => (
  <SideNavShell>
    <SectionLabel>FINANCING</SectionLabel>
    <StyledSideNav aria-label="Financing">
      <NavItem type="button" $active={activeTab === "capital"} onClick={() => onClick("capital")}>
        <NavDot $active={activeTab === "capital"} />
        Business Capital
      </NavItem>
      <NavItem type="button" $active={activeTab === "payovertime"} disabled={bnplLoading} onClick={() => onClick("payovertime")}>
        <NavDot $active={activeTab === "payovertime"} />
        Pay Over Time
      </NavItem>
      <NavItem type="button" $active={activeTab === "checkout"} disabled={orderLoading} onClick={() => onClick("checkout")}>
        <NavDot $active={activeTab === "checkout"} />
        Checkout
      </NavItem>
    </StyledSideNav>
  </SideNavShell>
);

const SideNavShell = styled.aside`
  width: 244px;
  min-height: calc(100vh - 76px);
  flex: 0 0 244px;
  display: flex;
  flex-direction: column;
  padding: 37px 16px 24px;
  background: #fff;
  border-right: 1px solid #e8ebe8;
  @media (max-width: 800px) {
    width: 100%; min-height: auto; flex: none; padding: 12px 18px;
    border-right: 0; border-bottom: 1px solid #e8ebe8;
  }
`;
const SectionLabel = styled.div`
  padding: 0 16px; margin-bottom: 12px; color: #94a098;
  font-size: 10px; font-weight: 800; letter-spacing: 0.12em;
  @media (max-width: 800px) { display: none; }
`;
const StyledSideNav = styled.nav`
  display: flex; flex-direction: column; gap: 4px;
  @media (max-width: 800px) { flex-direction: row; overflow-x: auto; }
`;
const NavItem = styled.button<{ $active: boolean }>`
  display: flex; align-items: center; gap: 12px; width: 100%; min-height: 44px;
  padding: 0 15px; border: 0; border-radius: 9px;
  background: ${({ $active }) => ($active ? "#eaf5ef" : "transparent")};
  color: ${({ $active }) => ($active ? partnerColor : "#617068")};
  font: inherit; font-size: 13px; font-weight: ${({ $active }) => ($active ? 700 : 550)};
  text-align: left; white-space: nowrap; cursor: pointer;
  &:hover:not(:disabled) { background: #f1f6f2; }
  &:focus-visible { outline: 2px solid ${partnerColor}; outline-offset: 2px; }
  &:disabled { opacity: 0.55; cursor: wait; }
  @media (max-width: 800px) { width: auto; flex: 0 0 auto; padding: 0 14px; }
`;
const NavDot = styled.span<{ $active: boolean }>`
  width: 8px; height: 8px; flex: 0 0 8px; border-radius: 50%;
  background: ${({ $active }) => ($active ? partnerColor : "#bdc8c0")};
`;
