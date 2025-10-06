import NewPostCard from "@components/NewPostCard";

export default function NewPost(props) {
  return (
    <div>
      <NewPostCard handleNewPost={props.handleNewPost} links={props.links} />
    </div>
  );
}
