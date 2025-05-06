import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { IoIosReturnLeft } from "react-icons/io";
import axios from 'axios';

const UserInfo = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const user = JSON.parse(sessionStorage.getItem('loginUser')); //로컬 스토리지를 통해 사용자 정보 로드

  const userId = searchParams.get('userId'); //userId 추출

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) {
        alert('userId가 없습니다.');
        navigate('/');
        return;
      }

      const res = await fetch(`http://localhost:3001/users?userId=${userId}`);
      const data = await res.json();
      if (data.length > 0) {
        setUserInfo(data[0]);
      } else {
        alert('해당 사용자를 찾을 수 없습니다.');
        navigate('/');
      }
    };

    fetchUser();
  }, [userId, navigate]);



  if (!userInfo) return <div style={{ textAlign: 'center', marginTop: '50px' }}>불러오는 중...</div>;

  return (
    <EnrollWrapper>
      <EnrollBox>
        <EnrollTitle>{userInfo.nickName}님의 정보 조회</EnrollTitle>
        <FormGroup>
          <Label>아이디</Label>
          <Input type="text" value={userInfo.userId} readOnly />
        </FormGroup>

        <FormGroup>
          <Label>비밀번호</Label>
          <Input type="password" value={userInfo.password} readOnly />
        </FormGroup>

        <FormGroup>
          <Label>이름</Label>
          <Input type="text" value={userInfo.name} readOnly />
        </FormGroup>

        <FormGroup>
          <Label>닉네임</Label>
          <Input type="text" value={userInfo.nickName} readOnly />
        </FormGroup>

        <FormGroup>
          <Label>캘린더 사용 이유</Label>
          <TagGroup>
            {(userInfo.reason || []).map((reason, idx) => (
              <TagButton key={idx} className="active">{reason}</TagButton>
            ))}
          </TagGroup>
          <SubmitButton onClick={() => navigate(-1)}> <IoIosReturnLeft />이전으로</SubmitButton>
        </FormGroup>
      </EnrollBox>
    </EnrollWrapper>
  );
};

export default UserInfo;

const EnrollWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  background-color: #f9f9f9;
`;

const EnrollBox = styled.div`
  width: 500px;
  padding: 40px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
`;

const EnrollTitle = styled.h2`
  text-align: center;
  font-size: 26px;
  margin-bottom: 30px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 6px;
  font-weight: 600;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  background-color: #f1f1f1;
  color: #333;
`;

const TagGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
`;

const TagButton = styled.div`
  padding: 10px 16px;
  border: 1px solid #4b89dc;
  background-color: #4b89dc;
  color: white;
  border-radius: 20px;
  font-size: 14px;
`;


const SubmitButton = styled.button`
  width: 100%;
  padding: 14px;
  background-color: #4b89dc;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #3a74c5;
  }
`;