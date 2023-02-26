import Image from "next/image";
import Alert from "../Alert";
import bg from "../../public/landing.png";
import Signup from "../Signup";

const RegisterHero = () => {
  return (
    <div className="font-mono flex flex-col self-center p-20 md:pt-16  h-screen  items-center">
      <Alert />
      <Signup />
    </div>
  );
};
RegisterHero.propTypes = {};
export default RegisterHero;
