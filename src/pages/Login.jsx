import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {

  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [loginCheck, setLoginCheck] = useState(false); 
  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.get('http://localhost:3001/users', {
        params: {
          userId,
          password,
        },
      });
  
      const users = response.data;
  
      if (users.length > 0) {
        const user = users[0];
  
        sessionStorage.setItem("userId", user.userId);
        sessionStorage.setItem("password", user.password);
        sessionStorage.setItem("nickName", user.nickName);
        sessionStorage.setItem("name", user.name);
        sessionStorage.setItem("id", user.id);
        sessionStorage.setItem("loginUser", JSON.stringify(user)); // 전체 저장
  
        setLoginCheck(false);
        navigate("/calendar");
      } else {
        setLoginCheck(true);
      }
    } catch (err) {
      console.error("로그인 오류:", err);
      setLoginCheck(true);
    }
  };

  return (
    <LoginWrapper>
      <LoginBox>
        <LoginTitle>로그인</LoginTitle>
        <form>
        <Input type="text" placeholder="아이디" id="userId" onChange={(e) => setUserId(e.target.value)} />
        <Input type="password" placeholder="비밀번호" id="password" onChange={(e) => setPassword(e.target.value)} />
        {loginCheck && (<label style={{color:"red"}}> 아이디 혹은 비밀번호가 틀렸습니다.</label> )}
        <LoginButton onClick={handleLogin}>로그인</LoginButton>
        </form>
        <LinkText>
          계정이 없으신가요? <Link to='/Enroll'>회원가입</Link>
        </LinkText>
      </LoginBox>
    </LoginWrapper>
    
  );
};

export default LoginPage;


const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  background-color: #f0f2f5;
  width: 100%;
`;

const LoginBox = styled.div`
  width: 380px;
  padding: 40px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
`;

const LoginTitle = styled.h2`
  font-size: 24px;
  text-align: center;
  margin-bottom: 30px;
`;

const Input = styled.input`
  width: 90%;
  padding: 14px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;

  &:focus {
    border-color: #4b89dc;
    outline: none;
  }
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 14px;
  background-color: #4b89dc;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #3a74c5;
  }
`;

const LinkText = styled.p`
  text-align: center;
  margin-top: 16px;

  a {
    color: #4b89dc;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

