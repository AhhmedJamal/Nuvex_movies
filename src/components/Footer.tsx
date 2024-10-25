import { FaPhone } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
const Footer = () => {
  return (
    <div className="bg-neutral-300 dark:bg-neutral-900 flex gap-2  justify-evenly items-center px-6 pt-5 md:pt-0 md:flex-row flex-col mt-4 rounded-md">
     <div className="grid grid-cols-2  justify-center gap-7 items-start ">
          <div>
            <p className="font-bold ">About Us</p>
            <ul className="text-[14px] hover:cursor-pointer ">
              <li>Pricing</li>
              <li>Services</li>
            
            </ul>
          </div>
          <div>
            <p className="font-bold ">Media</p>
            <ul className="text-[14px] hover:cursor-pointer ">
              <li>Privacy Police</li>
              <li>Development</li>
              <li>Teams & Services</li>
            </ul>
          </div>
        </div>
        <div className="flex justify-evenly items-center flex-col gap-3">
        <div>
            <h1 className="font-bold text-[22px] text-center dark:text-white">
              Contact Us
            </h1>
          </div>
          
          <div className="flex justify-center gap-3">
          <div className="flex gap-3 cursor-pointer hover:text-primary">
              <FaPhone size={22} />
              <span className="text-[14px]">+1 234 567 890</span>
            </div>
            <div className="flex gap-3 cursor-pointer hover:text-primary">
              <IoMdMail size={22} />
              <span className="text-[14px]">nuvex@example.com</span>
            </div>
          </div>
        </div>
      <div className="flex justify-between gap-4  py-4 shadow-[0_0px_1px_-1px_rgb(0,0,0,0.1)]">
     
          <div className="flex items-center flex-row md:flex-col gap-3">
            <FaFacebook size={22} className="cursor-pointer hover:text-primary" />
            <FaTwitter size={22} className="cursor-pointer hover:text-primary"/>
            <RiInstagramFill size={22} className="cursor-pointer hover:text-primary" />
          </div>
      </div>  

    </div>
  );
};

export default Footer;