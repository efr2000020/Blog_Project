import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

export default function RegisterCard(props) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { email: "", username: "", password: "", age: "" },
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    let regeError = "root";
    try {
      let newUser = {
        email: data.email,
        username: data.username,
        password: data.password,
        age: data.age,
        id: "",
      };
      regeError = await props.handleRegister(newUser);
      if (regeError == false) {
        navigate(props.links.home, { replace: true });
      } else {
        if (
          regeError.errorField != "email" &&
          regeError.errorField != "username"
        ) {
          regeError = {
            errorField: "root",
            message: "Unkown error occoured, please try again.",
          };
        }
        throw new Error(regeError.message);
      }
    } catch (error) {
      setError(regeError.errorField, {
        type: "manual",
        message: error.message,
      });
    }
  };
  return (
    <div className="flex flex-col p-[2.5%] shadow-2xl w-[40%] rounded-2xl">
      <h2 className="form-input-item text-xl font-bold text-center">
        New Here ?
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Email Input */}
        <div>
          <h3>Email Adress:</h3>
          {errors.email ? (
            <span className="text-red-600">{errors.email.message}</span>
          ) : null}
          <input
            className="input form-input-item"
            type="text"
            placeholder="Email"
            {...register("email", {
              required: "* Email is required",
              validate: (value) => {
                const regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
                return regex.test(value) || "* Invalid email address";
              },
            })}
          />
        </div>
        <div>
          <h3>Username:</h3>
          {errors.username ? (
            <span className="text-red-600">{errors.username.message}</span>
          ) : null}
          <input
            type="text"
            name="username"
            placeholder="Pick a unique User Name"
            className="input form-input-item"
            {...register("username", {
              required: "*A User Name is required",
              minLength: {
                value: 3,
                message: "* User Name must be atleast 3 characters",
              },
            })}
          />
        </div>
        {/* Password Input */}
        <div>
          <h3>Password:</h3>
          {errors.password ? (
            <span className="text-red-600">{errors.password.message}</span>
          ) : null}
          <input
            type="password"
            placeholder="Password"
            className="input form-input-item"
            {...register("password", {
              required: "*Password is required",
              minLength: {
                value: 8,
                message: "*Password must be at least 8 characters long",
              },
            })}
          />
        </div>
        {/* Age Input */}
        <div>
          <h3>Age:</h3>
          {errors.age ? (
            <span className="text-red-600">{errors.age.message}</span>
          ) : null}
          <input
            type="text"
            placeholder="Age"
            className="input form-input-item"
            {...register("age", {
              required: "*Age is required",
              validate: (value) =>
                (value === "100" && "Wow! A century old!") ||
                (value >= 13 && value <= 99) ||
                "*Age must be a number between 13 and 99",
            })}
          />
        </div>
        {/* Submit Button */}
        {errors.root && (
          <div className="text-red-600">{errors.root.message}</div>
        )}
        <div className="flex justify-center">
          <button
            type="submit"
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
