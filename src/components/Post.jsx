import UserIcon from "./UserIcon";

export default function Post(props) {
  return (
    <div className="p-[2.5%] m-[5%] flex gap-[5%] shadow-2xl rounded-2xl">
      <div className="w-[35%]">
        <img src={props.image} alt={props.alt} />
      </div>
      <div className="w-[55%]">
        <h1 className="text-3xl">{props.title}</h1>
        <div className="divider"></div>
        <div className="text-justify">{props.desc}</div>
        <br />
        <div className="flex items-center gap-1 text-lg text-gray-500">
          By:
          <UserIcon /> {props.author}
        </div>
      </div>
    </div>
  );
}
