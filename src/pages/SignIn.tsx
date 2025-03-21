import Logo from '/assets/logo-login.svg';
import LoginList from '@/components/Molecule/LoginList';

function SignIn() {
  return (
    <div className="flex flex-col items-center p-5 bg-light-gray h-screen">
      <h1 className="sr-only">Sign In</h1>
      <img
        src={Logo}
        alt="tAIro"
        className="my-20"
        width={132}
        height={94}
        fetchPriority="high"
      />
      <LoginList></LoginList>
    </div>
  );
}

export default SignIn;
