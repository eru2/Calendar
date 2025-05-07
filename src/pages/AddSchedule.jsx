import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/common/Button';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddSchedule = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem('loginUser'));

  const handleSubmit = async () => {
    if (!title.trim()) {
      toast.error('일정 제목을 입력하세요.');
      return;
    }

    const newEvent = {
      userId: user.userId,
      title,
      description,
      date: selectedDate.toLocaleDateString('sv-SE'), // ISO 포맷 (yyyy-mm-dd)
    };

    try {
      const res = await axios.post('http://localhost:3001/events', newEvent);
      if (res.status === 201 || res.status === 200) {
        toast.success('일정이 추가되었습니다.');
        navigate('/calendar');
      } else {
        toast.error('일정 추가에 실패했습니다.');
      }
    } catch (error) {
      toast.error('서버 오류로 실패했습니다.');
      console.error(error);
    }
  };

  const handleback = () => {
    navigate('/calendar');
  };

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

// ------------------------ 스타일 ------------------------

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
