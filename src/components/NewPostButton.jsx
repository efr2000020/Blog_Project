import { Link } from "react-router";

export default function NewPostButton(props) {
  return (
    <Link
      to={
        props.currentUser && props.currentUser.id !== 0
          ? props.links.newPost
          : props.links.loginReg
      }
    >
      <button className="btn btn-soft fixed right-[40px] bottom-[40px] w-[50px] h-[50px] bg-blue-400 text-3xl rounded-full">
        +
      </button>
    </Link>
  );
}
