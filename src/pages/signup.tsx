import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignUp = () => {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    mobile: "",
    password: "",
  });

  const handleChange = (e) =>
    setFormValues({ ...formValues, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.values(formValues).some((v) => !v)) {
      toast.error("Fill all fields");
      return;
    }

    toast.success("Account created 🚀");
    navigate("/login");
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#020617] via-[#020617] to-[#020617] px-4">

      {/* Neon blobs */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-blue-600/30 blur-[160px] rounded-full animate-pulse" />
      <div className="absolute bottom-0 -right-40 w-[500px] h-[500px] bg-cyan-500/30 blur-[160px] rounded-full animate-pulse delay-1000" />

      {/* Card */}
      <div className="relative z-10 w-full max-w-sm rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl px-8 py-10 shadow-[0_40px_120px_rgba(0,255,255,0.15)]">

        {/* Title */}
        <h2 className="text-center text-4xl font-extrabold bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-300 bg-clip-text text-transparent">
          Create Account
        </h2>

        <p className="text-center text-sm text-gray-400 mt-2 mb-10">
          Start your journey with our platform
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Input Field */}
          {[
            { label: "Username", name: "username" },
            { label: "Email", name: "email", type: "email" },
            { label: "Mobile", name: "mobile" },
            { label: "Password", name: "password", type: "password" },
          ].map((field) => (
            <div key={field.name} className="relative">
              <input
                type={field.type || "text"}
                name={field.name}
                onChange={handleChange}
                required
                placeholder={field.label}
                className="
                  peer w-full bg-transparent border-b border-white/20
                  py-3 text-sm text-white
                  placeholder-transparent
                  focus:outline-none focus:border-cyan-400
                  transition-all duration-300
                "
              />
              <label
                className="
                  absolute left-0 -top-3.5 text-xs text-gray-400
                  peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm
                  peer-focus:-top-3.5 peer-focus:text-xs
                  peer-focus:text-cyan-400
                  transition-all
                "
              >
                {field.label}
              </label>

              {/* Glow line */}
              <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-gradient-to-r from-cyan-400 to-blue-500 peer-focus:w-full transition-all duration-500" />
            </div>
          ))}

          {/* Button */}
          <button
            className="
              group relative w-full py-3 rounded-full
              bg-gradient-to-r from-cyan-400 to-blue-500
              text-black font-semibold
              shadow-[0_0_40px_rgba(0,255,255,0.45)]
              hover:shadow-[0_0_70px_rgba(0,255,255,0.7)]
              hover:scale-[1.03]
              active:scale-[0.97]
              transition-all duration-300
            "
          >
            <span className="relative z-10">Sign Up</span>
            <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition" />
          </button>
        </form>

        {/* Footer */}
        <p className="text-center mt-8 text-xs text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-cyan-400 hover:text-cyan-300 transition"
          >
            Login
          </Link>
        </p>
      </div>
    </main>
  );
};

export default SignUp;
