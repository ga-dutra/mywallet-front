import GlobalStyle from "../styles/globalStyles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import WalletPage from "./WalletPage";
import CashFlowPage from "./CashFlowPage";
import { UserStorage } from "../contexts/UserContext";

export default function App() {
  return (
    <>
      <GlobalStyle />
      <UserStorage>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/mywallet" element={<WalletPage />} />
            <Route path="/mywallet/:flow" element={<CashFlowPage />} />
          </Routes>
        </BrowserRouter>
      </UserStorage>
    </>
  );
}
