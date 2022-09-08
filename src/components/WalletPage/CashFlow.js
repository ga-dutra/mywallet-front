import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../../contexts/UserContext";
import { deleteCashFlow } from "../../services/requests";

async function deleteFlow(id, config) {
  const result = await deleteCashFlow(id, config);
  return result;
}

export default function CashFlow({
  date,
  description,
  amount,
  flowType,
  id,
  config,
  render,
  setRender,
}) {
  const navigate = useNavigate();
  const { setEditingCashFlow } = useContext(UserContext);

  return (
    <Wrapper>
      <div
        onClick={() => {
          setEditingCashFlow({
            date: date,
            description: description,
            amount: amount,
            flowType: flowType,
            id: id,
          });
          navigate(`/mywallet/editar/${description}`);
        }}
      >
        <Date>{date}</Date> <Description>{description}</Description>
      </div>
      <div>
        <Amount flowType={flowType}>{amount}</Amount>
        <ion-icon
          onClick={() => {
            if (
              window.confirm(`Tem certeza de que quer apagar '${description}'?`)
            ) {
              deleteFlow(id, config);
              setRender(!render);
            }
          }}
          name="close-circle"
        ></ion-icon>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: calc(100% - 14px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
  font-size: 16px;
  font-weight: 500;
  div {
    display: flex;
    align-items: center;
  }

  ion-icon {
    color: #999999;
    margin-right: -6px;
    padding-left: 4px;
  }
`;

const Date = styled.span`
  color: #c6c6c6;
  padding-right: 10px;
  margin-left: -4px;
`;

const Description = styled.span`
  color: #000000;
  line-height: 20px;
`;

const Amount = styled.span`
  color: ${(props) => (props.flowType === "inflow" ? "#03AC00" : "#C70000")};
`;
