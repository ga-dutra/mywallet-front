import styled from "styled-components";
import logo from "../../assets/img/mywallet_logo.svg";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { postLogin } from "../../services/requests";
import { UserContext } from "../../contexts/UserContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const { setUserData } = useContext(UserContext);

  async function sendForm() {
    const body = { ...form };
    try {
      const result = await postLogin(body);
      const token = result.data.token;
      setUserData({ token: token, name: result.data.name });
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
          <button>Entrar</button>
        </form>
        <p onClick={() => navigate("/sign-up")}>Primeira vez? Cadastre-se!</p>
      </FormWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Logo = styled.img`
  margin-top: 120px;
  margin-bottom: 40px;
`;

const FormWrapper = styled.div`
  width: 100vw;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: calc(100% - 50px);
    text-align: center;
  }

  input {
    width: 100%;
    height: 58px;
    margin-bottom: 12px;
    background-color: #ffffff;
    border: solid #ffffff;
    border-radius: 5px;
    padding-left: 12px;
    font-family: "Raleway", sans-serif;
    font-weight: 500;
    font-size: 20px;
    color: #000000;
    word-wrap: break-word;
  }

  input::placeholder {
    font-weight: 400;
    color: #000000;
  }

  input:focus {
    outline: none;
  }

  button {
    cursor: pointer;
    width: 100%;
    height: 48px;
    margin-bottom: 32px;
    border-radius: 5px;
    background-color: #a328d6;
    border: 10px solid #a328d6;
    font-size: 20px;
    font-weight: 700;
    color: #ffffff;
  }

  p {
    cursor: pointer;
    color: #ffffff;
    font-weight: 700;
    font-size: 16px;
  }
`;

export { Wrapper, FormWrapper };
