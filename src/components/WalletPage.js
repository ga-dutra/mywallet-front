import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function WalletPage() {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <Header>
        <h1>Olá, fulano</h1>
        <ion-icon name="log-out-outline"></ion-icon>
      </Header>
      <WalletBoard>
        <h2>Não há registros de entrada ou saída</h2>
      </WalletBoard>
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

const WalletBoard = styled.div`
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
