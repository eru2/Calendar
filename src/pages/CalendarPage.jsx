import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SearchBar from '../components/SearchBar';
import { AiOutlineClose } from "react-icons/ai";
import { DotLoader } from 'react-spinners';
import Button from '../components/common/Button'
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



const CalendarPage = () => {
  const [events, setEvents] = useState([]); //일정 목록
  const [searchTerm, setSearchTerm] = useState(''); //검색어 상태
  const [selectedDate, setSelectedDate] = useState(new Date()); //선택한 날자
  const user = JSON.parse(sessionStorage.getItem('loginUser')); //로컬 스토리지를 통해 사용자 정보 로드
  const nickName = sessionStorage.getItem("nickName"); //userId로 유저 맞춤 일정 호출출
  const navigate = useNavigate();
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => { //일정 데이터 로딩userId로 필터링된 일정만 로딩딩
    if (user) { //의존성 배열에 user만 있어 해당 유저가 바뀔 때만 동작
      // console.log('현재 로그인된 userId:', user.userId);
      fetch(`http://localhost:3001/events?userId=${user.userId}`)
        .then(res => res.json())
        .then(data => {
          // console.log('불러온 이벤트:', data);
          setEvents(data);
        });
    }
  }, [user]);

  const handleDayClick = (date) => { //선택한 날짜의 상세 페이지로 이동
    const dateStr = date.toLocaleDateString('sv-SE'); //스웨덴의 지역 코드로 날짜를 스웨덴 형식(YYYY-MM-DD)으로 포맷해 준다.
    //sv-SE를 사용하는 이유 toLocalDateString()의 기본은 브라우저/OS의 로케일 설정을 따른다.
    // sv-SE의 yyyy-mm-dd 형식을 제공하는 대표적ㅇ인 로케일 중 하나이다. 스웨덴은 ISO 형식에 가장 근접하여 프로그래밍에 적합
    navigate(`/add?date=${dateStr}`);
  };

  const handleUserInfo = () => {
    if (!user) return;
    navigate(`/user?userId=${user.userId}`);
  };

  const handleAddSchedule = () => { //선택한 날짜 기준으로 add 페이지로 이동
    const dateStr = selectedDate.toLocaleDateString('sv-SE');
    navigate(`/add?date=${dateStr}`);
  };

  const handleDelete = async (id) => { //삭제 후 로컬 상태를 직접 갱신신
    setDeletingId(id); // 삭제 시작 표시
    await fetch(`http://localhost:3001/events/${id}`, { method: 'DELETE' });
    setEvents(prev => prev.filter(e => e.id !== id));
    setDeletingId(null); // 삭제 완료
  };

  const LoaderDemo = () => {
    const [loading, setLoading] = useState(true);
  }

  const selectedDateStr = selectedDate.toLocaleDateString('sv-SE'); // 선택한 날짜
  const filteredEvents = events.filter(e => e.date === selectedDateStr); //events 배열에서 각 이벤트 e의 날짜가 selectedDateStr와 정확히 같은 것만 필터링한다. 
  //선택한 날짜와 같은 날의 이벤트만 추출출
  const fallbackEvents = [...events] //선택한 날짜에 이벤트가 없으면 fallback
    .filter(e => new Date(e.date) >= new Date()) //이벤트 날짜가 오늘 이거나 이후인것만 필터링 과거 제외
    .sort((a, b) => new Date(a.date) - new Date(b.date)); //미래 이벤트 가까운 순으로 정렬렬

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
            tileContent={({ date }) => { //캘린더 날짜마다 간단한 일정 표시
              const dateStr = date.toLocaleDateString('sv-SE');
              const matchedEvents = events.filter(e => e.date === dateStr);
              const isToday = date.toDateString() === new Date().toDateString();
              return matchedEvents.map(e => (
                <div
                key={e.id}
                style={{
                  fontSize: '10px',
                  color: isToday ? '#ffffff' : '#280B0B',
                  background: isToday ? 'default' : '#A5C4EE',
                  borderRadius: '6px',
                  fontWeight: 'bold'
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
                const isDeleting = deletingId === event.id;

                return (
                  <div key={event.id} style={{
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
                      onClick={() => navigate(`/edit/${event.id}`)} //상태 변경만
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
                      onClick={() => setDeletingId(event.id)} //상태 변경만
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
