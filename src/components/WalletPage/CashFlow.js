import styled from "styled-components";

export default function CashFlow({ date, description, amount, flowType }) {
  return (
    <Wrapper>
      <div>
        <Date>{date}</Date> <Description>{description}</Description>
      </div>
      <div>
        <Amount flowType={flowType}>{amount}</Amount>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: calc(100% - 16px);
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  font-size: 16px;
  font-weight: 500;
  div {
    display: flex;
  }
`;

const Date = styled.span`
  color: #c6c6c6;
  padding-right: 12px;
`;

const Description = styled.span`
  color: #000000;
  line-height: 20px;
`;

const Amount = styled.span`
  color: ${(props) => (props.flowType === "inflow" ? "#03AC00" : "#C70000")};
`;
