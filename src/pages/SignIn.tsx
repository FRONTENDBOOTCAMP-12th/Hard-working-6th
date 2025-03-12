import Logo from '/src/assets/logo.png';
import LoginList from '@/components/Molecule/LoginList';

function SignIn() {
  return (
    <div className="flex flex-col items-center p-5 bg-light-gray h-screen">
      <h1 className="sr-only">Sign In</h1>
      <img src={Logo} alt="tAIro" className="w-33 my-18" />
      <LoginList></LoginList>
    </div>
  );
}

export default SignIn;
