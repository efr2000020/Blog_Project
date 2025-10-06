import { Link } from "react-router";

export default function HomeButton(props) {
  return (
    <Link to={props.links.home}>
      <button className="btn btn-soft">Home</button>
    </Link>
  );
}
