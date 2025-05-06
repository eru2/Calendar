import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/common/Button'

const AddSchedule = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem('loginUser'));

  const handleSubmit = async () => {
    if (!title.trim()) {
      alert('일정 제목을 입력하세요.');
      return;
    }

    const newEvent = {
      userId: user.userId,
      title,
      description,
      date: selectedDate.toLocaleDateString('sv-SE'),
    };

    await fetch('http://localhost:3001/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEvent),
    });

    navigate('/calendar');
  };

  
  const handleback = async () => {
    navigate("/calendar");
  }
  
  return (
    <PageWrapper>
      <ContentBox>
        <Section>
          <Calendar
            value={selectedDate}
            onChange={setSelectedDate}
          />
          <p>선택한 날짜: {selectedDate.toLocaleDateString('ko-KR')}</p>
        </Section>
  
        <Section>
          <h2>일정 추가</h2>
          <Input
            type="text"
            placeholder="제목을 입력하세요"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <Textarea
            placeholder="설명을 입력하세요 (선택)"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <ButtonGroup>
            <Button onClick={handleback}>취소</Button>
            <Button onClick={handleSubmit}>추가</Button>
          </ButtonGroup>
        </Section>
      </ContentBox>
    </PageWrapper>
  );
  
};

export default AddSchedule;

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 90vh;
  background-color: #f9f9f9;
  padding: 60px 20px;
`;

const ContentBox = styled.div`
  display: flex;
  gap: 40px;
  width: 100%;
  max-width: 1100px;
  padding: 40px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
`;


const Container = styled.div`
  max-width: 1100px;
  margin: 40px auto;
  display: flex;
  gap: 40px;
`;

const Section = styled.div`
  flex: 1;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 16px;
`;
