import Image from "next/image";
import Alert from "../Alert";
import bg from "../../public/landing.png";
import Signup from "../Signup";

const RegisterHero = () => {
  return (
    <div className="font-mono flex flex-col p-12 md:pt-20 bg-gray-200 h-screen items-center justify-center">
      <Alert />
      <Signup />
    </div>
  );
};
RegisterHero.propTypes = {};
export default RegisterHero;
