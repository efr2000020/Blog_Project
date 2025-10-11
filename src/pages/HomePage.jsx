import NewPostButton from "@components/NewPostButton";
import Post from "@components/Post";

export default function HomePage(props) {
  return (
    <div>
      {props.posts.length === 0 ? (
        <div>
          <h1 className="text-5xl text-center mt-[20%]">
            A blank page is a world of possibilities
          </h1>
          <h3 className="text-2xl text-center mt-5">Be the first to POST</h3>
          <br />
          <h3 className="text-2xl text-center mt-5">
            Or if you did not run the json server, please run <br /> "npx
            json-server --watch db.json --port 3000"
          </h3>
        </div>
      ) : (
        props.posts.map((post) => (
          <Post
            id={post.id}
            key={post.id}
            title={post.title}
            desc={post.desc}
            image={post.image}
            author={
              props.userList.filter((user) =>
                user.id === post.authorId ? true : false
              )[0].username
            }
            alt={post.alt}
          />
        ))
      )}
      {props.dataReceived === true ? (
        <NewPostButton links={props.links} currentUser={props.currentUser} />
      ) : null}
    </div>
  );
}
