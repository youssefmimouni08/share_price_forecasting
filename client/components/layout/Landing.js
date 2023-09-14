import Image from "next/image";
import Alert from "../Alert";
import bg from "../../public/landing.png";
import Rectangle from "../svg/Rectangle";
import heroImage from "../../public/hero.svg";
import Home from "../Home";
import Form from "../Form";
import Textfield from "../ui/Textfield";

/*    */
const Landing = () => {
  return (
    <div className="   h-[350px] sm:h-[400px] lg:h-[500px]  xl:h-[600px]  2xl:h-[800px] ">
      <div className="flex flex-col justify-center pt-5 md:pt-20 items-center space-y-10  pb-10">
        <h2 className=" text-center text-2xl md:text-4xl leading-snug font-forum w-full md:w-1/2 ">
          Discover the Impact of Your
          <span className="bg-blob bg-cover bg-no-repeat  "> Events </span> on
          Oil Prices with Our Revolutionary Event Impact Calculator
        </h2>
        <Textfield />
      </div>
    </div>
  );
};
Landing.propTypes = {};
export default Landing;
