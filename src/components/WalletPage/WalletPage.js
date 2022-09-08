import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { getCashFlows } from "../../services/requests";
import logout from "../../services/logout";
import CashFlow from "./CashFlow";

export default function WalletPage() {
  const navigate = useNavigate();
  const { userData, setUserData, cashFlows, setCashFlows } =
    useContext(UserContext);
  console.log(userData);
  const config = {
    headers: { Authorization: `Bearer ${userData.token}` },
  };
  const [render, setRender] = useState(true);

  useEffect(() => {
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
  }, [render]);

  function dateSort(array) {
    array.forEach((value) => {
      value.formatedDate = new Date(
        value.date.slice(3, 5) + "/" + value.date.slice(0, 2)
      );
    });
    return array.sort((a, b) => {
      if (a.formatedDate > b.formatedDate) return 1;
      if (a.formatedDate < b.formatedDate) return -1;
      return 0;
    });
  }

  let balance = 0;
  if (cashFlows.length) {
    cashFlows.forEach((element) => {
      const amount = Number(
        element.amount.replace("R$", "").replace(".", "").replace(",", ".")
      );

      if (element.flowType === "inflow") {
        balance += amount;
      } else if (element.flowType === "outflow") {
        balance -= amount;
      }
    });
  }
  return (
    <Wrapper>
      <Header>
        <h1>Olá, {userData.name}</h1>
        <ion-icon
          onClick={() => {
            if (window.confirm("Tem certeza de que deseja sair?")) {
              logout(config);
              setCashFlows({});
              setUserData({});
              navigate("/");
            }
          }}
          name="log-out-outline"
        ></ion-icon>
      </Header>
      {cashFlows.length ? (
        <WalletBoard>
          {dateSort(cashFlows).map((item) => (
            <CashFlow
              key={item.description}
              date={item.date}
              description={item.description}
              amount={item.amount}
              flowType={item.flowType}
              id={item._id}
              config={config}
              render={render}
              setRender={setRender}
            ></CashFlow>
          ))}
          <Balance balance={balance}>
            <h2>SALDO</h2>
            <p>
              R$ {balance < 0 ? "-" : ""}
              {String(balance).replace("-", "").replace(".", ",")}
              {String(balance)
                .replace("-", "")
                .replace(".", ",")
                .indexOf(",") === -1
                ? ",00"
                : ""}
            </p>
          </Balance>
        </WalletBoard>
      ) : (
        <EmptyWalletBoard>
          <h2>Não há registros de entrada ou saída</h2>
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
  position: relative;
  overflow: hidden;
`;

const MovementWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: calc(100% - 50px);
  max-height: calc(100% - 40px);
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
    cursor: pointer;
  }

  p {
    color: #ffffff;
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    width: 30px;
  }
`;

const Balance = styled.div`
  width: calc(100% - 16px);
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  position: absolute;
  bottom: 14px;

  h2 {
    font-weight: 700;
  }
  p {
    font-weight: 500;
    padding-right: 10px;
    color: ${(props) => (props.balance >= 0 ? "#03AC00" : "#C70000")};
  }
`;
