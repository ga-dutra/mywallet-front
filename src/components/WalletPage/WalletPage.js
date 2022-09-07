import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import { getCashFlows } from "../../services/requests";
import CashFlow from "./CashFlow";

export default function WalletPage() {
  const navigate = useNavigate();
  const { userData, cashFlows, setCashFlows } = useContext(UserContext);
  console.log(userData);

  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${userData.token}` },
    };
    async function fetchData() {
      try {
        const cashFlowsList = await getCashFlows(config);
        console.log(cashFlowsList);
        setCashFlows(cashFlowsList.data);
        console.log(cashFlowsList.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
    console.log(cashFlows);
  }, []);

  return (
    <Wrapper>
      <Header>
        <h1>Olá, {userData.name}</h1>
        <ion-icon name="log-out-outline"></ion-icon>
      </Header>
      {cashFlows.length ? (
        <WalletBoard>
          {cashFlows.map((item) => (
            <CashFlow
              key={item.index}
              date={item.date}
              description={item.description}
              amount={item.amount}
              flowType={item.flowType}
            ></CashFlow>
          ))}{" "}
        </WalletBoard>
      ) : (
        <EmptyWalletBoard>
          (<h2>Não há registros de entrada ou saída</h2>)
        </EmptyWalletBoard>
      )}

      <MovementWrapper>
        <div>
          <ion-icon
            onClick={() => navigate(`/mywallet/inflow`)}
            name="add-circle-outline"
          ></ion-icon>
          <p>Nova entrada</p>
        </div>
        <div>
          <ion-icon
            onClick={() => navigate(`/mywallet/outflow`)}
            name="remove-circle-outline"
          ></ion-icon>
          <p>Nova saída</p>
        </div>
      </MovementWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  margin: 20px 0;
  width: calc(100% - 50px);
  display: flex;
  justify-content: space-between;

  h1 {
    color: #ffffff;
    font-weight: 700;
    font-size: 26px;
  }

  ion-icon {
    color: #ffffff;
    font-size: 30px;
  }
`;

const EmptyWalletBoard = styled.div`
  margin-bottom: 14px;
  width: calc(100% - 50px);
  height: calc(100vh - 236px);
  background-color: #ffffff;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;

  h2 {
    text-align: center;
    width: 180px;
    color: #868686;
    font-size: 20px;
    line-height: 24px;
  }
`;

const WalletBoard = styled.div`
  margin-bottom: 14px;
  width: calc(100% - 50px);
  height: calc(100vh - 236px);
  background-color: #ffffff;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  padding: 18px 0 0 14px;
`;

const MovementWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: calc(100% - 50px);

  div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 12px 0 12px 12px;
    height: 120px;
    width: calc(50% - 8px);
    background-color: #a328d6;
    border-radius: 5px;
  }

  ion-icon {
    color: #ffffff;
    font-size: 26px;
  }

  p {
    color: #ffffff;
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    width: 30px;
  }
`;
