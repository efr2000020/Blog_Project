import LoginCard from "@components/LoginCard";
import RegisterCard from "@components/RegisterCard";

export default function LoginReg(props) {
  return (
    <div className="flex justify-around p-[5%]">
      <LoginCard
        userList={props.userList}
        handleLogin={props.handleLogin}
        checkLoginCredentials={props.checkLoginCredentials}
        links={props.links}
      />
      <div className="divider divider-horizontal">Or</div>
      <RegisterCard handleRegister={props.handleRegister} links={props.links} />
    </div>
  );
}
