import Image from "next/image";
import Alert from "../Alert";
import bg from "../../public/landing.png";
import Signup from "../Signup";
import Signin from "../Signin";

const LoginHero = () => {
  return (
    <div className=" font-mono flex flex-col self-center p-20 md:pt-32  h-screen  items-center ">
      <Alert />
      <Signin />
    </div>
  );
};
LoginHero.propTypes = {};
export default LoginHero;
