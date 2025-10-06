import { Link } from "react-router";

export default function LoginRegButton(props) {
  return (
    <Link to={props.links.loginReg}>
      <button className="btn btn-soft">Login / Register</button>
    </Link>
  );
}
