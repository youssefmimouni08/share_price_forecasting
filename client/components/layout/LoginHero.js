import Image from "next/image";
import Alert from "../Alert";
import bg from "../../public/landing.png";
import Signup from "../Signup";
import Signin from "../Signin";

const LoginHero = () => {
  return (
    <div className="flex flex-col self-center p-12 md:pt-20 bg-gray-200 h-screen  items-center justify-center">
      <Alert />
      <Signin />
    </div>
  );
};
LoginHero.propTypes = {};
export default LoginHero;
