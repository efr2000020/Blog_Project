import { Link } from "react-router";
import HomeButton from "./HomeButton";
import LoginRegButton from "./LoginRegButton";
import LogoutButton from "./LogoutButton";

export default function Navbar(props) {
  return (
    <div className="flex justify-between navbar bg-sky-700 shadow-sm p-4 fixed-top">
      <div className="w-[30%]">
        <HomeButton links={props.links} />
      </div>
      <div className="w-[30%] flex justify-center">
        <Link to={props.links.home}>
          <h1 className="text-3xl text-white font-bold">Blue Ocean Blog</h1>
        </Link>
      </div>
      <div className="w-[30%] flex justify-end">
        {props.dataReceived ? (
          props.currentUser && props.currentUser.id !== 0 ? (
            <div className="flex justify-end items-center gap-2">
              Hello {props.currentUser.username}
              <LogoutButton handleLogout={props.handleLogout} />
            </div>
          ) : (
            <LoginRegButton links={props.links} />
          )
        ) : null}
      </div>
    </div>
  );
}
