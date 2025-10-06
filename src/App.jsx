import Navbar from "@components/Navbar";
import HomePage from "@pages/HomePage";
import LoginReg from "@pages/LoginReg";
import NewPost from "@pages/NewPost";
import NotFound from "@pages/NotFound";
import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";

function App() {
  const [userList, setUserList] = useState([]);
  const links = {
    home: "/",
    newPost: "/NewPost",
    loginReg: "/LoginReg",
  };
  const [posts, setPosts] = useState([]);
  const [dataReceived, setDataReceived] = useState(false);

  let [currentUser, setCurrentUser] = useState();

  const rootUrl = "http://localhost:3000";
  useEffect(() => {
    Promise.all([axios.get(`${rootUrl}/posts`), axios.get(`${rootUrl}/users`)])
      .then(([postsRes, usersRes]) => {
        setPosts(postsRes.data.reverse()); // newest first
        setUserList(usersRes.data);

        axios
          .get(`${rootUrl}/session`)
          .then((listRes) => {
            if (listRes.data.length > 0) {
              axios
                .get(`${rootUrl}/session/1`)
                .then((sessionRes) => {
                  const savedId = sessionRes.data.currentUserId;
                  if (savedId) {
                    const savedUser = usersRes.data.find(
                      (u) => u.id === savedId
                    );
                    if (savedUser) {
                      setCurrentUser(savedUser);
                    } else {
                      setCurrentUser(null);
                    }
                  } else {
                    setCurrentUser(null);
                  }
                  setDataReceived(true);
                })
                .catch((err) => {
                  console.error("session/1:", err);
                  setCurrentUser(null);
                  setDataReceived(true);
                });
            } else {
              axios
                .post(`${rootUrl}/session`, { id: 1, currentUserId: null })
                .catch((err) => console.error("create session:", err))
                .finally(() => {
                  setCurrentUser(null);
                  setDataReceived(true);
                });
            }
          })
          .catch((err) => {
            console.error("session list:", err);
            setCurrentUser(null);
            setDataReceived(true);
          });
      })
      .catch((err) => {
        console.error("loading posts/users:", err);
      });
  }, []);

  const checkLoginCredentials = (email, password) => {
    let user = userList.find(
      (user) => user.email === email && user.password === password
    );
    if (user) {
      return user.id;
    } else return null;
  };

  const handleLogin = async (id) => {
    setUserList(
      userList.map((user) =>
        user.id === id
          ? { ...user, isLoggedIn: true }
          : { ...user, isLoggedIn: false }
      )
    );
    setCurrentUser(userList.find((user) => user.id === id));

    await axios.patch(`${rootUrl}/session/1`, {
      currentUserId: id,
    });
  };

  const handleLogout = () => {
    setUserList(
      userList.map((user) => {
        user.isLoggedIn = false;
        return user;
      })
    );
    setCurrentUser(null);
    axios
      .patch(`${rootUrl}/session/1`, {
        currentUserId: null,
      })
      .catch((err) => console.error("logout session:", err));
  };

  const handleRegister = async (newUser) => {
    if (userList.find((user) => user.email == newUser.email)) {
      return { errorField: "email", message: "Email is already registerd" };
    }
    if (userList.find((user) => user.username == newUser.username)) {
      return { errorField: "username", message: "Uner name is already taken" };
    }

    let propposedId = userList.length + 1;
    while (
      userList.filter((user) => (user.id === propposedId ? true : false))
        .length > 0
    ) {
      propposedId += 1;
    }
    newUser.id = propposedId;
    newUser.isLoggedIn = true;
    handleLogout(); // Log all other users out - just ins case.
    setUserList([...userList, newUser]);
    setCurrentUser(newUser);
    const previousUser = userList.find(
      (user) => user.isLoggedIn && user.id !== propposedId
    );
    if (previousUser) {
      await axios.patch(`${rootUrl}/users/${previousUser.id}`, {
        isLoggedIn: false,
      });
    }
    const { data: created } = await axios.post(`${rootUrl}/users`, {
      ...newUser,
      isLoggedIn: true,
    });

    await axios.patch(`${rootUrl}/session/1`, {
      currentUserId: propposedId,
    });

    return false;
  };

  const handleNewPost = async (post) => {
    post.authorId = currentUser.id;
    let propposedId = posts.length + 1;
    while (
      posts.filter((post) => (post.id === propposedId ? true : false)).length >
      0
    ) {
      propposedId += 1;
    }
    post.id = propposedId;
    setPosts([post, ...posts]);
    await axios.post(`${rootUrl}/posts`, post);
  };
  return (
    <BrowserRouter>
      <Navbar
        links={links}
        currentUser={currentUser}
        handleLogout={handleLogout}
        dataReceived={dataReceived}
      />
      <Routes>
        <Route
          path={links.home}
          element={
            <HomePage
              posts={posts}
              userList={userList}
              links={links}
              currentUser={currentUser}
              dataReceived={dataReceived}
            />
          }
        />
        <Route
          path={links.newPost}
          element={
            <NewPost
              userList={userList}
              handleNewPost={handleNewPost}
              links={links}
            />
          }
        />
        <Route
          path={links.loginReg}
          element={
            <LoginReg
              userList={userList}
              handleLogin={handleLogin}
              checkLoginCredentials={checkLoginCredentials}
              handleRegister={handleRegister}
              links={links}
            />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
