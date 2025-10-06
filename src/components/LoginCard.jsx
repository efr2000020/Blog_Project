import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

export default function LoginCard(props) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { email: "", password: "" } });
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (props.checkLoginCredentials(data.email, data.password)) {
        props.handleLogin(
          props.checkLoginCredentials(data.email, data.password)
        );
        navigate(props.links.home, { replace: true });
      } else {
        setError("email", {
          type: "manual",
          message: "Invalid email or password",
        });
      }
    } catch (error) {
      setError("root", {
        type: "manual",
        message: error.message,
      });
    }
  };

  return (
    <div className="p-[2.5%] shadow-2xl w-[40%] h-fit rounded-2xl">
      <h2 className="form-input-item text-xl font-bold text-center">
        Already Have an Account ?
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {errors.email && (
          <span className="text-red-600">{errors.email.message}</span>
        )}
        <h3>Email Adress:</h3>
        <input
          type="text"
          name="email"
          placeholder="Email"
          className="input form-input-item"
          {...register("email", {
            required: "Enter Your Email",
            validate: (value) => {
              const regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
              return regex.test(value) || "* Invalid email address";
            },
          })}
        />
        <div>
          <h3>Password:</h3>
          {errors.password ? (
            <span className="text-red-600">{errors.password.message}</span>
          ) : null}
          <input
            className="input form-input-item"
            type="password"
            name="password"
            placeholder="Your Password"
            {...register("password", {
              required: "*Please enter your password",
              minLength: {
                value: 8,
                message: "*Password is atleast 8 characters",
              },
            })}
          />
        </div>
        <div className="flex justify-center">
          <button className="submit-button" disabled={isSubmitting}>
            {isSubmitting ? "Logging you in..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
}
