import Logo from '/assets/logo-login.svg';
import SignUpList from '@/components/Organism/SignUpList';

function SignUp() {
  return (
    <div className="flex flex-col items-center p-5">
      <h1 className="sr-only">Sign Up</h1>
      <img
        src={Logo}
        alt="tAIro"
        className="my-20"
        width={132}
        height={94}
        fetchPriority="high"
      />
      <SignUpList></SignUpList>
    </div>
  );
}

export default SignUp;
