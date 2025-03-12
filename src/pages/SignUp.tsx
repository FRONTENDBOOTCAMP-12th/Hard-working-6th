import SignUpList from '../components/Molecule/SignUpList';
import Logo from '/src/assets/logo.png';
import CommonHeader from '../components/Atom/CommonHeader';

function SignUp() {
  return (
    <div className="flex flex-col items-center p-5">
      <CommonHeader></CommonHeader>
      <h1 className="sr-only">Sign Up</h1>
      <img src={Logo} alt="tAIro" className="w-33 mb-10" />
      <SignUpList></SignUpList>
    </div>
  );
}

export default SignUp;
