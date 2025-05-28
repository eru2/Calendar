import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/common/Button';

const UpdateSchedule = () => {
  const [eventDate, setEventDate] = useState(new Date());
  const [eventTitle, setEventTitle] = useState('');
  const [eventContent, setEventContent] = useState('');
  const navigate = useNavigate();
  const { eventId } = useParams();
  const user = JSON.parse(sessionStorage.getItem('loginUser'));

  useEffect(() => {
    const fetchEvent = async () => {
      const res = await fetch(`http://localhost:8080/api/events/${eventId}`);
      const data = await res.json();
      setEventTitle(data.eventTitle);
      setEventContent(data.eventContent || '');
      setEventDate(new Date(data.eventDate));
    };
    fetchEvent();
  }, [eventId]);

  const handleSubmit = async () => {
    if (!eventTitle.trim()) {
      alert('일정 제목을 입력하세요.');
      return;
    }

    const updatedEvent = {
      eventNo: parseInt(eventId),
      userId: user.userId,
      eventTitle,
      eventContent,
      eventDate: eventDate.toLocaleDateString('sv-SE'),
    };

    await fetch(`http://localhost:8080/api/events/${eventId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedEvent),
    });

    navigate('/calendar');
  };

  const handleBack = () => {
    navigate('/calendar');
  };

  return (
    <PageWrapper>
      <ContentBox>
        <Section>
          <Calendar value={eventDate} onChange={setEventDate} />
          <p>선택한 날짜: {eventDate.toLocaleDateString('ko-KR')}</p>
        </Section>

        <Section>
          <h2>일정 수정</h2>
          <Input
            type="text"
            placeholder="제목을 입력하세요"
            value={eventTitle}
            onChange={e => setEventTitle(e.target.value)}
          />
          <Textarea
            placeholder="설명을 입력하세요 (선택)"
            value={eventContent}
            onChange={e => setEventContent(e.target.value)}
          />
          <ButtonGroup>
            <Button onClick={handleBack}>취소</Button>
            <Button onClick={handleSubmit}>수정</Button>
          </ButtonGroup>
        </Section>
      </ContentBox>
    </PageWrapper>
  );
};

export default UpdateSchedule;

// 스타일 컴포넌트
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
