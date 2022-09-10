import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FormWrapper } from "../LoginPage/LoginPage";
import { Header, dateCheck } from "./CreateCashFlowPage";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import TextInputMask from "react-masked-text";
import { editCashFlow } from "../../services/requests";

export default function EditCashFlowPage() {
  const navigate = useNavigate();
  const { userData, editingCashFlow } = useContext(UserContext);
  const [form, setForm] = useState({
    date: editingCashFlow.date,
    description: editingCashFlow.description,
    amount: editingCashFlow.amount,
    flowType: editingCashFlow.flowType,
  });

  async function sendForm() {
    // Date is validated
    if (!dateCheck(form.date)) {
      alert("Por favor, digite uma data válida no formato DD/MM");
      return;
    }

    const config = {
      headers: { Authorization: `Bearer ${userData.token}` },
    };
    const body = { ...form };

    try {
      const result = await editCashFlow(editingCashFlow.id, config, body);
      if (result) navigate("/mywallet");
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
    <Wrapper type={editingCashFlow.flowType}>
      <Header>
        <h1>
          Editar {editingCashFlow.flowType === "inflow" ? "entrada" : "saída"}
        </h1>
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
            placeholder={editingCashFlow.amount}
            name={editingCashFlow.flowType}
            required={editingCashFlow.flowType}
            onChangeText={(e) => {
              handleForm({ name: "amount", value: e });
            }}
          />
          <input
            placeholder={editingCashFlow.description}
            name="description"
            type="text"
            required
            onChange={(e) => {
              handleForm({ name: e.target.name, value: e.target.value });
            }}
          />
          <TextInputMask
            kind={"datetime"}
            placeholder={editingCashFlow.date}
            name="date"
            options={{ format: "DD/MM" }}
            onChangeText={(e) => {
              handleForm({ name: "date", value: e });
            }}
          />
          <button>
            Atualizar{" "}
            {editingCashFlow.flowType === "inflow" ? "entrada" : "saída"}
          </button>
        </form>
      </FormWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  div form input:nth-child(1) {
    color: ${(props) => (props.type === "inflow" ? "#03AC00" : "#C70000")};
  }

  div form input::placeholder {
    color: gray;
    font-style: italic;
  }
`;
