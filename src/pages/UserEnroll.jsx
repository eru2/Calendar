import React, { useState } from 'react';
import styled from 'styled-components';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const schema = yup.object().shape({
  userId: yup.string().min(3, '아이디는 3자 이상이어야 합니다.').required('아이디를 입력하세요.'),
  name: yup.string().required('이름을 입력하세요.'),
  password: yup.string().min(8, '비밀번호는 8자 이상이어야 합니다.').max(16, '비밀번호는 16자 이하여야 합니다.').required('비밀번호를 입력하세요.'),
  nickName: yup.string().required('닉네임을 입력하세요.'),
  
});

const UserEnroll = () => {
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    clearErrors,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      reason: []
    }
  });

  const navigate = useNavigate();
  const [selectedReasons, setSelectedReasons] = useState([]);
  const reasons = ['일정 관리', '팀 프로젝트', '개인 목표', '공부 계획', '기타'];

  const toggleReason = (reason) => {
    const updated = selectedReasons.includes(reason)
      ? selectedReasons.filter(r => r !== reason)
      : [...selectedReasons, reason];
    setSelectedReasons(updated);
    setValue('reason', updated);
  };

  const checkDuplicateId = async () => {
    const id = getValues('userId');

    if (!id || id.length < 3) {
      setError('userId', { message: '3자 이상 입력 후 중복확인을 눌러주세요.' });
      return;
    }

    try {
      const res = await fetch(`http://localhost:8080/api/members/${id}`);
      const data = await res.json();

      if (data.length > 0) {
        setError('userId', { message: '이미 사용 중인 아이디입니다.' });
      } else {
        clearErrors('userId');
        alert('사용 가능한 아이디입니다!');
      }
    } catch (err) {
      setError('userId', { message: '서버 요청 실패' });
    }
  };

  const onSubmit = async (data) => {
  const formattedData = {
  userId: data.userId,      
  password: data.password,
  name: data.name,
  nickName: data.nickName,
  reason: data.reason,
};


  try {
    const res = await axios.post('http://localhost:8080/api/members/Enroll', formattedData);

    if (res.status === 201 || res.status === 200) {
      toast.success('회원가입 완료!');
      navigate('/');
    } else {
      toast.error('회원가입 실패');
    }
  } catch (error) {
    toast.error('서버 오류로 회원가입에 실패했습니다.');
    console.error(error);
  }
  };
  

  return (
    <EnrollWrapper>
      <EnrollBox>
        <EnrollTitle>회원가입</EnrollTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label>아이디</Label>
            <RowFlex>
              <Input type="text" placeholder="ID 입력" {...register('userId')} />
              <SmallButton type="button" onClick={checkDuplicateId}>중복확인</SmallButton>
            </RowFlex>
            {errors.userId && <ErrorText>{errors.userId.message}</ErrorText>}
          </FormGroup>

          <FormGroup>
            <Label>비밀번호</Label>
            <Input type="password" placeholder="비밀번호 입력" {...register('password')} />
            {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
          </FormGroup>

          <FormGroup>
            <Label>이름</Label>
            <Input type="text" placeholder="이름 입력" {...register('name')} />
            {errors.name && <ErrorText>{errors.name.message}</ErrorText>}
          </FormGroup>

          <FormGroup>
            <Label>닉네임</Label>
            <Input type="text" placeholder="닉네임 입력" {...register('nickName')} />
            {errors.nickName && <ErrorText>{errors.nickName.message}</ErrorText>}
          </FormGroup>

          <FormGroup>
            <Label>캘린더 사용 이유</Label>
            <TagGroup>
              {reasons.map((reason) => (
                <TagButton
                  key={reason}
                  type="button"
                  className={selectedReasons.includes(reason) ? 'active' : ''}
                  onClick={() => toggleReason(reason)}
                >
                  {reason}
                </TagButton>
              ))}
            </TagGroup>
            {errors.reason && <ErrorText>{errors.reason.message}</ErrorText>}
          </FormGroup>

          <SubmitButton type="submit">가입하기</SubmitButton>
        </form>
      </EnrollBox>
    </EnrollWrapper>
  );
};

export default UserEnroll;


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

  &:focus {
    border-color: #4b89dc;
    outline: none;
  }
`;

const RowFlex = styled.div`
  display: flex;
  gap: 10px;
`;

const SmallButton = styled.button`
  padding: 12px 16px;
  background: #4b89dc;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: bold;
  white-space: nowrap;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #3a74c5;
  }
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

const TagGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
`;

const TagButton = styled.button`
  padding: 10px 16px;
  border: 1px solid #4b89dc;
  background-color: white;
  color: #4b89dc;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;

  &.active {
    background-color: #4b89dc;
    color: white;
  }

  &:hover {
    background-color: #3a74c5;
    color: white;
  }
`;

const ErrorText = styled.p`
  color: red;
  font-size: 12px;
  margin-top: 6px;
`;
