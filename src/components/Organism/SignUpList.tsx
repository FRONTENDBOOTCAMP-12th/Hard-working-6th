import { useState } from 'react';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import supabaseClient from '@/utils/SupabaseClient';
import InputSignup from '../Atom/InputSignup';
import CommonButton from '../Atom/CommonButton';
import RadioButtonGroup from '../Atom/RadioButtonGroup';
import CheckEmail from '../Molecule/CheckEmail';
import CheckPassword from '../Molecule/CheckPassword';
import SelectBirthdate from '../Molecule/SelectBirthdate';
import { Female, Male } from '@mynaui/icons-react';

const MySwal = withReactContent(Swal);

function SignUpList() {
  const [isEmailChecked, setIsEmailChecked] = useState(false); // 중복 확인 상태

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    name: '',
  });

  const [birthdate, setBirthdate] = useState({
    year: '',
    month: '',
    day: '',
  });

  const [selected, setSelected] = useState('M'); // 기본값 설정

  // 상태 업데이트 핸들러
  const handleBirthdateChange = (
    field: 'year' | 'month' | 'day',
    value: string
  ) => {
    setBirthdate((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const navigate = useNavigate();

  const options = [
    { value: 'M', label: '남성', icon: <Male /> },
    { value: 'F', label: '여성', icon: <Female /> },
  ];

  // 회원가입 버튼 클릭 시 최종 유효성 검사 및 회원가입 요청
  const handleSignUp = async () => {
    if (!isEmailChecked) {
      Swal.fire('알림', '이메일 중복 확인을 해주세요.', 'warning');
      return;
    }
    const birthday = `${birthdate.year}-${birthdate.month}-${birthdate.day}`;

    const { data, error } = await supabaseClient.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          full_name: formData.name,
          avatar_url:
            'https://i.namu.wiki/i/K3QgYrz4Ts2hb4b0-IPf_3hXbhImQR2ICzBIUPrF63c5OhqxOq2KEYKgZe2BbL92c_Omo4gjpNmKWtHnrSRWBg.webp',
          birthday,
          gender: selected,
          zodiac_sign: '사수자리',
          email: formData.email,
        },
      },
    });

    if (error) {
      console.error('회원가입 실패:', error);
      MySwal.fire({
        title: <p>문제가 생겼습니다 🥲</p>,
        icon: 'error',
      });
    } else {
      console.log('회원가입 성공:', data);
      MySwal.fire({
        title: <p>회원가입 성공!</p>,
        text: '이메일을 확인해주세요!',
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
        <CheckEmail
          email={formData.email}
          onChange={handleChange}
          onEmailCheck={setIsEmailChecked}
        />
        <CheckPassword
          password={formData.password}
          passwordConfirm={formData.passwordConfirm}
          onChange={handleChange}
        />
        <InputSignup
          id="name"
          type="text"
          value={formData.name}
          placeholder="이름을 입력해 주세요"
          onChange={(e) => handleChange('name', e.target.value)}
        />
        <SelectBirthdate
          birthdate={birthdate}
          onChange={handleBirthdateChange}
        />
        <RadioButtonGroup
          options={options}
          selectedValue={selected}
          onChange={setSelected}
        />
      </div>

      <CommonButton type="submit" onClick={handleSignUp}>
        회원가입
      </CommonButton>
    </>
  );
}

export default SignUpList;
