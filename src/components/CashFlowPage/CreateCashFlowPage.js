import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { FormWrapper } from "../LoginPage/LoginPage";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import TextInputMask from "react-masked-text";
import { postCashFlow } from "../../services/requests";

function dateCheck(date) {
  if (date.length !== 5 || Number(date.slice(3) > 12)) return false;

  if (
    [1, 3, 5, 7, 8, 10].indexOf(Number(date.slice(3) > 12)) !== -1 &&
    Number(date.slice(0, 2) > 31)
  ) {
    return false;
  } else if (
    [4, 6, 9, 11].indexOf(Number(date.slice(3) > 12)) !== -1 &&
    Number(date.slice(0, 2) > 30)
  ) {
    return false;
  } else if (Number(date.slice(0, 2) > 38)) return false;
  else return true;
  // checa o mês: se for 1, 3, 5, 7, 8, 10 ou 12, dia entre 1 e 31, se for 4, 6, 9 ou 11, dia entre 1 e 30, se for 2, dia entre 1 e 28
}

export default function CashFlowPage() {
  const cashflow = useParams().flow === "entrada" ? "inflow" : "outflow";
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const { userData } = useContext(UserContext);

  async function sendForm() {
    // Date is validated
    if (!dateCheck(form.date)) {
      alert("Por favor, digite uma data válida no formato DD/MM");
      return;
    }

    const config = {
      headers: { Authorization: `Bearer ${userData.token}` },
    };
    const body = { ...form, flowType: cashflow };
    try {
      await postCashFlow(body, config);
      navigate("/mywallet");
    } catch (error) {
      console.error(error);
    }
  }

  function handleForm({ value, name }) {
    setForm({
      ...form,
      [name]: value,
    });
  }

  return (
    <Wrapper type={cashflow}>
      <Header>
        <h1>{cashflow === "inflow" ? "Nova entrada" : "Nova saída"}</h1>
        <ion-icon
          onClick={() => navigate("/mywallet")}
          name="arrow-back-circle-outline"
        ></ion-icon>
      </Header>
      <FormWrapper>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendForm();
          }}
        >
          <TextInputMask
            kind={"money"}
            placeholder="Valor"
            name={cashflow}
            required={cashflow}
            onChangeText={(e) => {
              handleForm({ name: "amount", value: e });
            }}
          />
          <input
            placeholder="Descrição"
            name="description"
            type="text"
            required
            onChange={(e) => {
              handleForm({ name: e.target.name, value: e.target.value });
            }}
          />
          <TextInputMask
            kind={"datetime"}
            placeholder="Data (dia/mês)"
            name="date"
            required={cashflow}
            options={{ format: "DD/MM" }}
            onChangeText={(e) => {
              handleForm({ name: "date", value: e });
            }}
          />
          <button>Salvar {cashflow === "inflow" ? "entrada" : "saída"}</button>
        </form>
      </FormWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  input:nth-child(1) {
    color: ${(props) => (props.type === "inflow" ? "#03AC00" : "#C70000")};
  }
`;

const Header = styled.div`
  margin: 20px 0 40px 0;
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

export { Header, dateCheck };
