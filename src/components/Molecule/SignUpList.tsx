import { useId, useState } from 'react';
import ChipButtonSignup from '../Atom/ChipButtonSignup';
import InputSignup from '../Atom/InputSignup';
import CommonButton from '../Atom/CommonButton';
import supabaseClient from '@/utils/SupabaseClient';
import SelectBox from '../Atom/SelectBox';
import RadioButtonGroup from '../Atom/RadioButtonGroup';
import { Female, Male } from '@mynaui/icons-react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from 'react-router';

function SignUpList() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [userName, setUserName] = useState('');

  const [selected, setSelected] = useState('');

  const navigate = useNavigate();

  const options = [
    { value: 'M', label: '남성', icon: <Male /> },
    { value: 'F', label: '여성', icon: <Female /> },
  ];

  /* ---------------------------------- 여기서부터 --------------------------------- */
  const MySwal = withReactContent(Swal);

  const nowYear = new Date().getFullYear();
  const [form, setForm] = useState({
    year: nowYear,
    month: '01',
    day: '01',
  });

  const now = new Date();
  let years = [];
  for (let y = now.getFullYear(); y >= 1960; y -= 1) {
    years.push(y);
  }

  let month = [];
  for (let m = 1; m <= 12; m += 1) {
    if (m < 10) {
      // 날짜가 2자리로 나타나야 했기 때문에 1자리 월에 0을 붙혀준다
      month.push('0' + m.toString());
    } else {
      month.push(m.toString());
    }
  }
  let days = [];
  let date = new Date(form.year, parseInt(form.month), 0).getDate();
  for (let d = 1; d <= date; d += 1) {
    if (d < 10) {
      // 날짜가 2자리로 나타나야 했기 때문에 1자리 일에 0을 붙혀준다
      days.push('0' + d.toString());
    } else {
      days.push(d.toString());
    }
  }

  const id = useId();

  const handleChangeName = (e: any) => {
    setUserName(e.target.value);
    console.log('이름:', e.target.value);
  };

  const handleChangeYear = (value: number) => {
    setForm({ ...form, year: value });
    console.log('선택된 값:', value);
  };

  const handleChangeMonth = (value: number) => {
    const monthValue = value < 10 ? '0' + value.toString() : value.toString();
    setForm({ ...form, month: monthValue });
    console.log('선택된 값:', monthValue);
  };

  const handleChangeDay = (value: number) => {
    const dayValue = value < 10 ? '0' + value.toString() : value.toString();
    setForm({ ...form, day: dayValue });
    console.log('선택된 값:', dayValue);
  };

  /* ---------------------------------- 여기까지 ---------------------------------- */

  // 유효성 검사 함수
  const validateEmail = (value: string) => {
    if (!value) return '이메일을 입력하세요.';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return '올바른 이메일 형식이 아닙니다.';
    return '';
  };

  const validatePassword = (value: string) => {
    if (!value) return '비밀번호를 입력하세요.';
    if (value.length < 6) return '비밀번호는 6자 이상이어야 합니다.';
    return '';
  };

  const validatePasswordConfirm = (value: string) => {
    if (!value) return '비밀번호 확인을 입력하세요.';
    if (value !== password) return '비밀번호가 일치하지 않습니다.';
    return '';
  };

  // 입력 값 변경 시 즉시 유효성 검사
  const handleChange = (e: { target: { id: string; value: string } }) => {
    const { id, value } = e.target;

    if (id === 'email') {
      setEmail(value);
      setEmailMessage(validateEmail(value));
    }
    if (id === 'password') {
      setPassword(value);
      setPasswordMessage(validatePassword(value));
    }
    if (id === 'passwordConfirm') {
      setPasswordConfirm(value);
      setPasswordConfirmMessage(validatePasswordConfirm(value));
    }

    console.log(`${id} 입력:`, value);
  };

  // 회원가입 버튼 클릭 시 최종 유효성 검사 및 회원가입 요청
  const handleSignUp = async () => {
    setIsSuccess(true);

    const { data, error } = await supabaseClient.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: `${userName}`,
          avatar_url:
            'https://i.namu.wiki/i/K3QgYrz4Ts2hb4b0-IPf_3hXbhImQR2ICzBIUPrF63c5OhqxOq2KEYKgZe2BbL92c_Omo4gjpNmKWtHnrSRWBg.webp',
          birthday: `${form.year}-${form.month}-${form.day}`,
          gender: `${selected}`,
          zodiac_sign: '사수자리',
          email: `${email}`,
        },
      },
    });

    if (error) {
      console.error('회원가입 실패:', error);
    } else {
      console.log('회원가입 성공:', data);
    }

    if (error) {
      MySwal.fire({
        title: <p>문제가 생겼습니다 🥲</p>,
        icon: 'error',
      });
    } else {
      MySwal.fire({
        title: <p>회원가입 성공!</p>,
        icon: 'success',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/');
        }
      });
    }
  };

  return (
    <>
      <div className="space-y-8 mb-5 w-full">
        <div className="flex gap-4 items-center justify-between">
          <div className="w-full relative">
            <InputSignup
              id="email"
              type="email"
              placeholder="ID를 입력해 주세요"
              onChange={handleChange}
            />
            {emailMessage && (
              <p className="absolute -bottom-6 text-red text-sm">
                {emailMessage}
              </p>
            )}
          </div>
          <ChipButtonSignup>중복확인</ChipButtonSignup>
        </div>

        <div className="relative">
          <InputSignup
            id="password"
            type="password"
            placeholder="비밀번호를 입력해 주세요"
            onChange={handleChange}
          />
          {passwordMessage && (
            <p className="absolute -bottom-6 text-red text-sm">
              {passwordMessage}
            </p>
          )}
        </div>

        <div className="relative">
          <InputSignup
            id="passwordConfirm"
            type="password"
            placeholder="비밀번호를 한번 더 입력해 주세요"
            onChange={handleChange}
          />
          {passwordConfirmMessage && (
            <p className="absolute -bottom-6 text-red text-sm">
              {passwordConfirmMessage}
            </p>
          )}
        </div>

        <InputSignup
          id="name"
          type="text"
          placeholder="이름을 입력해 주세요"
          onChange={handleChangeName}
        />

        <div className="flex gap-4 justify-center">
          <SelectBox
            id={id}
            label="년도"
            options={years}
            value={3}
            onChange={handleChangeYear}
          ></SelectBox>

          <SelectBox
            id={id}
            label="월"
            options={month}
            value={3}
            onChange={handleChangeMonth}
          ></SelectBox>

          <SelectBox
            id={id}
            label="일"
            options={days}
            value={3}
            onChange={handleChangeDay}
          ></SelectBox>
        </div>

        <RadioButtonGroup
          options={options}
          selectedValue={selected}
          onChange={setSelected}
        ></RadioButtonGroup>
      </div>

      <CommonButton onClick={handleSignUp}>회원가입</CommonButton>
    </>
  );
}

export default SignUpList;
