import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const NavigationBar = () => {
  const { pathname } = useLocation();

  return (
    <div className="navbar bg-transparent shadow-sm ">
      <div className="max-w-7xl w-screen mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <Link
              to="/"
              className="btn btn-ghost text-xl text-bold text-green-600"
            >
              Car Park App
            </Link>
          </div>
          <ul className=" flex items-center gap-2 md:gap-2">
            <li
              className={`${
                pathname === "/" ? "text-green-500" : "t"
              } text-md font-semibold hover:text-green-700`}
            >
              <Link to="/">Denah Parkir</Link>
            </li>
            <li
              className={`${
                pathname === "/rincian" ? "text-green-500" : "t"
              } text-md font-semibold hover:text-green-700`}
            >
              <Link to="/rincian">Rincian</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
