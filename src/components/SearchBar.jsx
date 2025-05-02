import styled from "styled-components";

export const Input = styled.input`
width: 100%;
padding: 12px;
border: 1px solid #e0e0e0;
border-radius: 8px;
font-size: 16px;
transition: all 0.3s ease;

&:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
}

&::placeholder {
  color: #95a5a6;
}
`;

export const SearchInput = styled(Input)`
padding: 12px 16px 12px 48px;
width: 100%;
`;

export const Checkbox = styled.input`
margin-right: 12px;
width: 18px;
height: 18px;
cursor: pointer;
`; 