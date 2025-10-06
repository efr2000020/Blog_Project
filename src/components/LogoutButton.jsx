export default function LogoutButton(props) {
  return (
    <div>
      <button onClick={() => props.handleLogout()} className="btn btn-soft">
        Logout
      </button>
    </div>
  );
}
