import { Link } from "react-router-dom";
import { FaInstagram, FaFacebookF } from "react-icons/fa";
function Footer() {
  return (
    <footer className="bg-dark flex flex-col gap-[5rem] justify-center items-center py-[5rem]">
      <figure className="w-[16rem]">
        <Link to="/">
          <img src="/images/LogoGreen.png" alt="logo" />
        </Link>
      </figure>
      <nav className="navbar text-[1.6rem] font-semibold text-white">
        <ul className="navbar-list flex justify-between  gap-[3.5rem]">
          <li>
            <Link to="/about">About us</Link>
          </li>
          <li>
            <Link to="">Find a pet</Link>
          </li>
          <li>
            <Link to="">Get involved</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
      <div className="flex gap-[3rem] items-center">
        <Link>
          <FaFacebookF className="footer-icon text-[1.6rem] text-white hover:text-green" />
        </Link>
        <Link>
          <FaInstagram className="footer-icon text-[2.4rem] text-white  hover:text-green" />
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
