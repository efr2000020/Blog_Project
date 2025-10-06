import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

export default function NewPostCard(props) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { title: "", desc: "", image: "" } });
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      let post = {
        desc: data.desc,
        image: data.image,
        title: data.title,
        authorId: null,
      };
      props.handleNewPost(post);
      navigate(props.links.home);
    } catch (error) {
      setError("root", {
        type: "manual",
        message: error.message,
      });
    }
  };
  return (
    <div className="p-[2.5%] mx-[12.5%] my-[2.5%] shadow-2xl rounded-2xl justify-center">
      <h2 className="form-input-item text-xl font-bold text-center">
        Create New Post
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h3>Title:</h3>
          {errors.title ? (
            <span className="text-red-500">{errors.title.message}</span>
          ) : null}
          <input
            type="text"
            name="title"
            placeholder="Put an intresting title!"
            className="input form-input-item"
            {...register("title", {
              required: "*Your post must have a title.",
            })}
          />
        </div>
        <div>
          <h3>Description:</h3>
          {errors.desc ? (
            <span className="text-red-500">{errors.desc.message}</span>
          ) : null}
          <textarea
            type="text"
            name="desc"
            placeholder="Waht is on your mind ?"
            className="textarea form-input-item"
            {...register("desc", {
              required: "*Your post must body",
              validate: (value) => {
                if (value.length > 150) {
                  return (
                    "*Max character count is 150. You now have " +
                    value.length +
                    " characters."
                  );
                }
              },
            })}
          />
        </div>
        <div>
          <h3>Image link:</h3>
          {errors.image ? (
            <span className="text-red-500">{errors.image.message}</span>
          ) : null}
          <input
            type="text"
            name="title"
            placeholder="Url for the image"
            className="input form-input-item"
            {...register("image", {
              required: "*Your must provide a URL for the image",
            })}
          />
        </div>
        <div className="flex justify-center">
          <button className="submit-button" disabled={isSubmitting}>
            {isSubmitting ? "Sharing with the world..." : "Post"}
          </button>
        </div>
        {errors.root && (
          <div className="text-red-600">{errors.root.message}</div>
        )}
      </form>
    </div>
  );
}
