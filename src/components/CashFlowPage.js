import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { FormWrapper } from "./LoginPage";
import { useState } from "react";
import TextInputMask from "react-masked-text";

export default function CashFlowPage() {
  const cashflow = useParams().flow;
  const navigate = useNavigate();
  console.log(cashflow);
  const [form, setForm] = useState({});

  function sendForm() {}

  function handleForm({ value, name }) {
    console.log([name], value);
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
            onChangeText={(e) => {
              console.log(e);
              handleForm({ name: cashflow, value: e });
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
