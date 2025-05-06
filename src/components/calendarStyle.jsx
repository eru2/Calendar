import styled from 'styled-components';

export const CalendarContainer = styled.div`
  width: 100%;
  margin: 40px auto;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
`;

export const CalendarHeader = styled.h2`
  font-size: 28px;
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

export const AddButton = styled.button`
  padding: 10px 20px;
  font-size: 15px;
  font-weight: bold;
  background-color: #4b89dc;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  float: right;
  margin-bottom: 20px;

  &:hover {
    background-color: #3a74c5;
  }
`;

export const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

export const SearchInput = styled.input`
  padding: 10px;
  width: 100%;
  max-width: 400px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  margin-right: 10px;
  background-color: #5a7686;
  color: #2c3e50;

  &:focus {
    outline: none;
    border-color: #5586a7;
  }
`;