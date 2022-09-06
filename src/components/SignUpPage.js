import styled from "styled-components";
import { Wrapper, FormWrapper } from "./LoginPage";
import logo from "../assets/img/mywallet_logo.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUpPage() {
  const navigate = useNavigate();
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
    <Wrapper>
      <Logo src={logo} alt="My Wallet Logo" />
      <FormWrapper>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendForm();
          }}
        >
          <input
            placeholder="Nome"
            name="name"
            type="text"
            required
            onChange={(e) => {
              handleForm({ name: e.target.name, value: e.target.value });
            }}
          />
          <input
            placeholder="E-mail"
            name="email"
            type="email"
            required
            onChange={(e) => {
              handleForm({ name: e.target.name, value: e.target.value });
            }}
          />
          <input
            placeholder="Senha"
            name="password"
            type="password"
            required
            onChange={(e) => {
              handleForm({ name: e.target.name, value: e.target.value });
            }}
          />
          <input
            placeholder="Confirme a senha"
            name="confirmedPassword"
            type="password"
            required
            onChange={(e) => {
              handleForm({ name: e.target.name, value: e.target.value });
            }}
          />
          <button>Cadastrar-se</button>
          <p onClick={() => navigate("/")}>Já tem uma conta? Entre agora!</p>
        </form>
      </FormWrapper>
    </Wrapper>
  );
}

const Logo = styled.img`
  margin-top: 100px;
  margin-bottom: 40px;
`;
