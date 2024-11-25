import { useState, useEffect } from "react";
import Logo from "../../assets/LOGO.png";
import bg from "../../assets/children.png";
import "./style.css";

export const Navbar = ({ handleSignInClick }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div>
            <img
                src={bg}
                alt='background'
                className='absolute w-full z-[-1]'
                style={{ filter: "blur(2px)" }}
            />
            <nav
                className={`fixed w-full flex flex-col md:flex-row items-center justify-between p-4 text-white transition-opacity pt-2 pr-10 pb-4 duration-300 ${
                    isVisible ? "opacity-100" : "hidden"
                } ${
                    isScrolled
                        ? "bg-white text-black"
                        : "bg-[rgba(22,36,68,0.24)] text-white"
                }`}>
                <div className='flex items-center gap-3'>
                    <a href={"/"}>
                        <img
                            src={Logo}
                            alt='logo'
                            width={"300px"}
                            className='absolute -translate-y-[80px] object-cover'
                        />
                    </a>
                </div>

                <ul className='flex flex-col md:flex-row gap-4 text-lg mt-4 md:mt-0'>
                    <li>
                        <a href='/intranet' className='hover:underline'>
                            Intranet
                        </a>
                    </li>
                    <li>
                        <a href='/lms' className='hover:underline'>
                            LMS
                        </a>
                    </li>
                    <li>
                        <a href='/srs' className='hover:underline'>
                            SRS
                        </a>
                    </li>
                    <li>
                        <a href='/mail' className='hover:underline'>
                            Mail
                        </a>
                    </li>
                    <li>
                        <a href='/timetable' className='hover:underline'>
                            Timetable
                        </a>
                    </li>
                </ul>

                <div className='flex gap-3 mt-4 md:mt-0'>
                    <button
                        onClick={handleSignInClick} 
                        className='h-[40px] px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'>
                        Sign In
                    </button>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
