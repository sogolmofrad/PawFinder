import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="header flex justify-between  px-[4rem] py-10 items-center">
      <figure className="logo w-[16rem]">
        <Link to="/">
          <img src="/images/LogoBlack.png" alt="logo" />
        </Link>
      </figure>
      <nav className="navbar text-[1.6rem] font-semibold">
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
      <div className="flex justify-between gap-[3.5rem] text-[1.6rem] font-semibold items-center">
        <Link to="/login" className="login">
          Login
        </Link>
        <Link
          to="/register"
          className="btn signup bg-dark px-[3rem] py-[5px] text-white rounded-[2.5rem]"
        >
          Sign up
        </Link>
      </div>
    </header>
  );
}

export default Navbar;
