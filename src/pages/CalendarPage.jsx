import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';

const CalendarPage = () => {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const user = JSON.parse(localStorage.getItem('loginUser'));
  const nickName = sessionStorage.getItem("nickName");


  useEffect(() => {
    if (user) {
      fetch(`http://localhost:3001/events?userId=${user.userId}`)
        .then(res => res.json())
        .then(setEvents);
    }
  }, [user]);


  return (
    
    <CalendarContainer>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="일정 검색..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </SearchContainer>
      <AddButton onClick={() => alert('일정 추가 페이지로 이동')}>+ 새 일정 추가</AddButton>
      <CalendarHeader>  {nickName ? `${nickName}님의 일정 관리` : '나의 일정 관리'}</CalendarHeader>
      <Calendar />
    </CalendarContainer>
  );
};

export default CalendarPage;

const CalendarContainer = styled.div`
  width: 100%;
  margin: 40px auto;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
`;

const CalendarHeader = styled.h2`
  font-size: 28px;
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

const AddButton = styled.button`
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

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
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