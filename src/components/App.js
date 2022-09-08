import GlobalStyle from "../styles/globalStyles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage/LoginPage";
import SignUpPage from "./SignUpPage/SignUpPage";
import WalletPage from "./WalletPage/WalletPage";
import CashFlowPage from "./CashFlowPage/CreateCashFlowPage";
import EditCashFlowPage from "./CashFlowPage/EditCashFlowPage";
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
            <Route
              path="/mywallet/editar/:description"
              element={<EditCashFlowPage />}
            />
          </Routes>
        </BrowserRouter>
      </UserStorage>
    </>
  );
}
