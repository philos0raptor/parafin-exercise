import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { ParafinWidget } from "@parafin/react";
import { openParafinDashboard } from "@parafin/core";
import { Header } from "./components/Header.tsx";
import { SideNav } from "./components/SideNav.tsx";
import parkBackdrop from "./assets/ina-coolbrith-park.png";
import config from "./config";

function App() {
  const [token, setToken] = useState(null);
  const [bnplToken, setBnplToken] = useState(null);
  const [bnplLoading, setBnplLoading] = useState(false);
  const [bnplError, setBnplError] = useState(null);
  const [orderToken, setOrderToken] = useState(null);
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderError, setOrderError] = useState(null);
  const [tab, setTab] = useState("capital");

  useEffect(() => {
    const fetchToken = async () => {
      const response = await axios.get(
        `/parafin/token/capital/${config.capital.personId}/${config.isDev}`
      );
      setToken(response.data.parafinToken);
    };

    fetchToken();
  }, []);

  const handlePayOverTimeClick = async () => {
    setTab("payovertime");
    if (bnplToken) return;
    setBnplLoading(true);
    setBnplError(null);
    try {
      const response = await axios.get(
        `/parafin/token/payovertime/${config.payOverTime.personId}/${config.isDev}`
      );
      if (response.data.errorCode) {
        setBnplError(`Error ${response.data.errorCode}: Failed to fetch Pay Over Time token.`);
        return;
      }
      setBnplToken(response.data.parafinToken);
    } catch (err) {
      setBnplError("Failed to fetch Pay Over Time token.");
    } finally {
      setBnplLoading(false);
    }
  };

  const handleCheckoutClick = async () => {
    setTab("checkout");
    if (orderToken) {
      openParafinDashboard({
        product: "bnpl",
        token: orderToken,
        orderId: config.checkout.orderId,
        onExit: (orderId) => {
          console.log("Checkout exited for orderId:", orderId);
          setOrderLoading(false);
        },
      });
      return;
    }
    setOrderLoading(true);
    setOrderError(null);
    try {
      const response = await axios.get(
        `/parafin/token/checkout/${config.checkout.personId}/${config.isDev}`
      );
      if (response.data.errorCode) {
        setOrderError(`Error ${response.data.errorCode}: Failed to fetch Checkout token.`);
        return;
      }
      const token = response.data.parafinToken;
      setOrderToken(token);
      openParafinDashboard({
        product: "bnpl",
        token,
        orderId: config.checkout.orderId,
        onExit: (orderId) => {
          console.log("Checkout exited for orderId:", orderId);
          setOrderLoading(false);
        },
      });
    } catch (err) {
      setOrderError("Failed to launch Checkout flow.");
    } finally {
      setOrderLoading(false);
    }
  };

  const onOptIn = async () => ({
    businessExternalId: "<your-external-business-id>",
    legalBusinessName: "Phil's Coffee",
    dbaName: "Phil's Coffee",
    ownerFirstName: "Ralph",
    ownerLastName: "Furman",
    accountManagers: [
      {
        name: "Vineet Goel",
        email: "test1@parafin.com",
      },
    ],
    routingNumber: "121141822",
    accountNumberLastFour: "6789",
    bankAccountCurrencyCode: "USD",
    email: "test2@parafin.com",
    phoneNumber: "2026331000",
    address: {
      addressLine1: "301 Howard St",
      city: "San Francisco",
      state: "CA",
      postalCode: "94105",
      country: "USA",
    },
  });

  return (
    <AppShell>
      <Header />
      <ContentShell>
        <SideNav
          activeTab={tab}
          onClick={(newProduct) => {
            if (newProduct === "payovertime") {
              handlePayOverTimeClick();
            } else if (newProduct === "checkout") {
              handleCheckoutClick();
            } else {
              setTab(newProduct);
            }
          }}
          bnplLoading={bnplLoading}
          orderLoading={orderLoading}
        />
        <PageShell $capital={tab === "capital"}>
          <PageContent>
            <PageIntro>
              <Eyebrow>FINANCING FOR YOUR BUSINESS</Eyebrow>
              <h1>{tab === "capital" ? "Business Capital" : tab === "payovertime" ? "Pay Over Time" : "Checkout"}</h1>
              <p>
                {tab === "capital"
                  ? "Explore financing options for your restaurant, right from your GrubDash account."
                  : tab === "payovertime"
                  ? "Manage flexible payment options for your business."
                  : "Continue your Pay Over Time checkout experience."}
              </p>
            </PageIntro>
            <WidgetCard>
              <CardHeader>
                <CardTitle>{tab === "capital" ? "Your capital options" : tab === "payovertime" ? "Your line of credit" : "Checkout"}</CardTitle>
                <CardCaption>Provided by Parafin</CardCaption>
              </CardHeader>
              <CardBody>
                {tab === "capital" && (
                  token ? (
                    <ParafinWidget
                      token={token}
                      product="capital"
                      externalBusinessId={undefined}
                      onOptIn={onOptIn}
                    />
                  ) : <StatusText>Loading your capital options...</StatusText>
                )}
                {tab === "payovertime" && (
                  <>
                    {bnplLoading && <StatusText>Loading Pay Over Time...</StatusText>}
                    {bnplError && <ErrorText>{bnplError}</ErrorText>}
                    {!bnplLoading && !bnplError && bnplToken && (
                      <ParafinWidget
                        token={bnplToken}
                        product="line_of_credit"
                        lineOfCreditApplicationId={config.payOverTime.lineOfCreditApplicationId}
                        onExit={() => {}}
                      />
                    )}
                  </>
                )}
                {tab === "checkout" && (
                  <>
                    {orderLoading && <StatusText>Loading Checkout...</StatusText>}
                    {orderError && <ErrorText>{orderError}</ErrorText>}
                    {!orderLoading && !orderError && !orderToken && (
                      <StatusText>Configure checkout.personId and checkout.orderId in src/config.js and BNPL credentials in .env to use Checkout.</StatusText>
                    )}
                    {!orderLoading && !orderError && orderToken && (
                      <StatusText>Your checkout opens in a separate window. Select Checkout in the navigation to reopen it.</StatusText>
                    )}
                  </>
                )}
              </CardBody>
            </WidgetCard>
          </PageContent>
        </PageShell>
      </ContentShell>
    </AppShell>
  );
}

export default App;

const AppShell = styled.div`
  min-height: 100vh;
`;
const ContentShell = styled.div`
  display: flex;
  @media (max-width: 800px) { flex-direction: column; }
`;
const PageShell = styled.main`
  width: 100%;
  min-height: calc(100vh - 76px);
  padding: 42px 54px 80px;
  background-color: #f6f8f5;
  background-image: ${({ $capital }) => $capital
    ? `linear-gradient(90deg, rgba(246, 248, 245, 0.78) 0%, rgba(246, 248, 245, 0.08) 88%), linear-gradient(180deg, rgba(246, 248, 245, 0.04) 0%, rgba(246, 248, 245, 0.12) 54%, rgba(246, 248, 245, 0.4) 100%), url(${parkBackdrop})`
    : "none"};
  background-size: cover;
  background-position: center top;
  background-repeat: no-repeat;
  @media (max-width: 800px) { padding: 32px 24px 64px; }
  @media (max-width: 520px) { padding: 28px 16px 48px; }
`;
const PageContent = styled.div`
  max-width: 1112px;
`;
const PageIntro = styled.div`
  margin-bottom: 32px;
  h1 { margin: 9px 0 10px; color: #1d3529; font-size: clamp(29px, 3vw, 38px); font-weight: 720; letter-spacing: -0.035em; }
  p { margin: 0; color: #68776d; font-size: 15px; line-height: 1.55; }
`;
const Eyebrow = styled.div`
  color: #08765f;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.14em;
`;
const WidgetCard = styled.section`
  overflow: hidden;
  background: #fff;
  border: 1px solid #e3eae4;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(30, 60, 43, 0.035);
`;
const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  min-height: 71px;
  padding: 20px 27px;
  border-bottom: 1px solid #edf0eb;
  @media (max-width: 520px) { padding: 18px; }
`;
const CardTitle = styled.h2`
  margin: 0;
  color: #263d2f;
  font-size: 16px;
  font-weight: 700;
`;
const CardCaption = styled.span`
  color: #8c9990;
  font-size: 11px;
  white-space: nowrap;
`;
const CardBody = styled.div`
  min-height: 220px;
  padding: 26px;
  @media (max-width: 520px) { padding: 18px; }
`;
const StatusText = styled.p`
  margin: 0;
  padding: 24px 0;
  color: #66746a;
  font-size: 14px;
  line-height: 1.6;
`;
const ErrorText = styled(StatusText)`
  color: #b34236;
`;
