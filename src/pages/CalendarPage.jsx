import React, { useEffect, useState, useRef } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SearchBar from '../components/SearchBar';
import { AiOutlineClose } from "react-icons/ai";
import { DotLoader } from 'react-spinners';
import Button from '../components/common/Button';
import { CiEdit } from "react-icons/ci";

const CalendarContainer = styled.div`
  width: 100%;
  max-width: 1100px;
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

// (중략) import 및 styled-components는 동일

// (중략) import 및 styled-components는 동일

const CalendarPage = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const member = JSON.parse(localStorage.getItem('loginUser'));
  const nickName = member?.nickName;
  const navigate = useNavigate();
  const [deletingNo, setDeletingNo] = useState(null);
  const fetched = useRef(false);

  useEffect(() => {
    if (!member || !member.userId) {
      alert("로그인 세션이 만료되었습니다. 다시 로그인해주세요.");
      navigate('/login');
      return;
    }

    if (!fetched.current) {
      fetched.current = true;
      fetch(`http://localhost:8080/api/events?userId=${member.userId}`)
        .then(res => res.json())
        .then(data => {
          setEvents(data);
        });
    }
  }, [member, navigate]);

  const handleDayClick = (date) => {
    const dateStr = date.toISOString().slice(0, 10);
    navigate(`/add?date=${dateStr}`);
  };

  const handleUserInfo = () => {
    if (!member) return;
    navigate(`/user?userId=${member.userId}`);
  };

  const handleAddSchedule = () => {
    const dateStr = selectedDate.toISOString().slice(0, 10);
    navigate(`/add?date=${dateStr}`);
  };

  const handleDelete = async (event_No) => {
    setDeletingNo(event_No);
    await fetch(`http://localhost:8080/api/events/${event_No}`, { method: 'DELETE' });
    setEvents(prev => prev.filter(e => e.eventNo !== event_No));
    setDeletingNo(null);
  };

  const filteredEvents = events.filter(e =>
    new Date(e.date).toDateString() === selectedDate.toDateString()
  );

  const fallbackEvents = [...events]
    .filter(e => new Date(e.date) >= new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <CalendarContainer>
      <ButtonGroup>
        <Button onClick={handleUserInfo}>마이페이지</Button>
        <Button onClick={handleAddSchedule}>+ 새 일정 추가</Button>
      </ButtonGroup>
      <CalendarHeader>{nickName ? `${nickName}님의 일정 관리` : '나의 일정 관리'}</CalendarHeader>

      <div style={{ display: 'flex', gap: '30px' }}>
        <div style={{ flex: 1 }}>
          <Calendar
            value={selectedDate}
            onChange={setSelectedDate}
            onClickDay={handleDayClick}
            tileContent={({ date }) => {
              const dateStr = date.toISOString().slice(0, 10);
              const matchedEvents = events.filter(e => e.date === dateStr);
              const isToday = date.toDateString() === new Date().toDateString();
              return matchedEvents.map(e => (
                <div
                  key={e.eventNo}
                  style={{
                    fontSize: '10px',
                    color: isToday ? '#ffffff' : '#280B0B',
                    background: isToday ? 'default' : '#A5C4EE',
                    borderRadius: '6px',
                    fontWeight: 'bold',
                    marginBottom: '2px'
                  }}
                >
                  {e.title}
                </div>
              ));
            }}
          />
        </div>

        <div style={{ flex: 1.5 }}>
          <h3>남은 일정</h3>
          {(filteredEvents.length > 0 ? filteredEvents : fallbackEvents).map(event => {
            const isDeleting = deletingNo === event.event_No;

            return (
              <div key={event.eventNo} style={{
                position: 'relative',
                padding: '12px',
                marginBottom: '10px',
                border: '1px solid #ccc',
                borderRadius: '8px',
                backgroundColor: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                textAlign: 'left',
                overflow: 'hidden'
              }}>
                <div style={{
                  flex: 1,
                  filter: isDeleting ? 'blur(1px)' : 'none',
                  opacity: 1,
                  transition: 'all 0.3s'
                }}>
                  <span>{event.date} - {event.title}</span>
                </div>
                <button
                  onClick={() => navigate(`/edit/${event.event_No}`)}
                  style={{
                    border: '1px solid #eee',
                    borderRadius: '6px',
                    padding: '4px 10px',
                    cursor: 'pointer',
                    marginLeft: '10px',
                    backgroundColor: 'transparent',
                    boxShadow: '2px 2px 0 0 rgba(140, 140, 140, 0.3)'
                  }}
                >
                  <CiEdit />
                </button>
                <button
                  onClick={() => handleDelete(event.eventNo)}
                  style={{
                    border: '1px solid #eee',
                    borderRadius: '6px',
                    padding: '4px 10px',
                    cursor: 'pointer',
                    marginLeft: '10px',
                    backgroundColor: 'transparent',
                    boxShadow: '2px 2px 0 0 rgba(140, 140, 140, 0.3)'
                  }}
                >
                  <AiOutlineClose />
                </button>
                {isDeleting && (
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 10
                  }}>
                    <DotLoader size={30} color="#4b89dc" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </CalendarContainer>
  );
};

export default CalendarPage;


const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 16px;
`;
