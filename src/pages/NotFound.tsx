// import { useLocation } from "react-router-dom";
// import { useEffect } from "react";
// import { Link } from "lucide-react";
// const NotFound = () => {
//   const location = useLocation();

//   useEffect(() => {
//     console.error("404 Error: User attempted to access non-existent route:", location.pathname);
//   }, [location.pathname]);

//   return (
//     // <div className="flex min-h-screen items-center justify-center bg-muted">
//     //   <div className="text-center">
//     //     <h1 className="mb-4 text-4xl font-bold">404</h1>
//     //     <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
//     //     <a href="/" className="text-primary underline hover:text-primary/90">
//     //       Return to Home
//     //     </a>
//     //   </div>
//     // </div>
//         <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#eef7fb] to-[#f6fbff]">

//       <div className="w-full max-w-sm bg-white rounded-2xl px-8 py-9 shadow-[0_18px_60px_rgba(0,0,0,0.12)]">

//         <h2 className="text-2xl font-semibold text-center text-blue-700 mb-1">
//           Welcome Back
//         </h2>

//         <p className="text-center text-gray-500 text-sm mb-6">
//           Login to your healthcare account
//         </p>

//         <form onSubmit={handleSubmit} className="space-y-6">

//           {/* Email */}
//           <div>
//             <label className="block text-xs text-gray-400 mb-1">
//               Email Address
//             </label>
//             <input
//               onChange={(e) => setEmail(e.target.value)}
//               className="
//                 w-full bg-transparent
//                 border-b border-gray-300
//                 py-1.5 text-sm text-gray-800
//                 focus:outline-none focus:border-blue-500
//                 transition-all
//               "
//             />
//           </div>

//           {/* Password */}
//           <div>
//             <label className="block text-xs text-gray-400 mb-1">
//               Password
//             </label>
//             <input
//               type="password"
//               onChange={(e) => setPassword(e.target.value)}
//               className="
//                 w-full bg-transparent
//                 border-b border-gray-300
//                 py-1.5 text-sm text-gray-800
//                 focus:outline-none focus:border-blue-500
//                 transition-all
//               "
//             />
//           </div>

//           {/* Button */}
//           <button
//             className="
//               w-full mt-4 py-2.5 rounded-full
//               text-white font-semibold text-sm
//               bg-gradient-to-r from-blue-500 to-teal-400
//               hover:opacity-95
//               transition-all duration-300
//             "
//           >
//             Login
//           </button>
//         </form>

//         <p className="text-center mt-6 text-xs text-gray-500">
//           New here?{" "}
//           <Link href="/signup" className="text-blue-600 font-medium hover:underline">
//             Sign up
//           </Link>
//         </p>

//       </div>
//     </main>
//   );
// };

// export default NotFound;


//         </h2>

//         <p className="text-center text-gray-500 text-sm mb-6">
//           login to your healthcare account
//         </p>

//         <form onSubmit={handleSubmit} className="space-y-6">

//           <div>
//             <label className="block text-xs text-gray-400 mb-1">
//               Email Address
//             </label>
//             <input
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full border-b border-gray-300 py-1.5"
//             />
//           </div>

//           <div>
//             <label className="block text-xs text-gray-400 mb-1">
//               Password
//             </label>
//             <input
//               type="password"
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full border-b border-gray-300 py-1.5"
//             />
//           </div>

//           <button className="w-full py-2.5 rounded-full bg-blue-500 text-white">
//             Login
//           </button>
//         </form>

//         <p className="text-center mt-6 text-xs text-gray-500">
//           New here?{" "}
//           <Link to="/signup" className="text-blue-600 hover:underline">
//             Sign up
//           </Link>
//         </p>
//       </div>
//     </main>
//   );
// };

// export default Login;
// import { useState } from "react";
// import { Link } from "react-router-dom";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(email, password);
//   };

//   return (
//     <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#eef7fb] to-[#f6fbff]">
//       <div className="w-full max-w-sm bg-white rounded-2xl px-8 py-9 shadow-[0_18px_60px_rgba(0,0,0,0.12)]">

//         <h2 className="text-2xl font-semibold text-center text-blue-700 mb-1">
//           Welcome Back
//         </h2>

//         <p className="text-center text-gray-500 text-sm mb-6">
//           Login to your healthcare account
//         </p>

//         <form onSubmit={handleSubmit} className="space-y-6">

//           <div>
//             <label className="block text-xs text-gray-400 mb-1">
//               Email Address
//             </label>
//             <input
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full border-b border-gray-300 py-1.5"
//             />
//           </div>

//           <div>
//             <label className="block text-xs text-gray-400 mb-1">
//               Password
//             </label>
//             <input
//               type="password"
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full border-b border-gray-300 py-1.5"
//             />
//           </div>

//           <button className="w-full py-2.5 rounded-full bg-blue-500 text-white">
//             Login
//           </button>
//         </form>

//         <p className="text-center mt-6 text-xs text-gray-500">
//           New here?{" "}
//           <Link to="/signup" className="text-blue-600 hover:underline">
//             Sign up
//           </Link>
//         </p>
//       </div>
//     </main>
//   );
// };

// export default Login;
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 overflow-hidden">

      {/* Background glow blobs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 -right-24 w-96 h-96 bg-cyan-300/30 rounded-full blur-3xl" />

      {/* Card */}
      <div className="relative w-full max-w-sm backdrop-blur-xl bg-white/80 border border-white/40 rounded-3xl px-8 py-10 shadow-[0_30px_80px_rgba(0,0,0,0.18)]">

        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
          Welcome Back
        </h2>

        <p className="text-center text-gray-500 text-sm mt-1 mb-8">
          Login to your healthcare account
        </p>

        <form onSubmit={handleSubmit} className="space-y-7">

          {/* Email */}
          <div className="relative group">
            <input
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              className="peer w-full bg-transparent border-b-2 border-gray-300 py-2 text-sm text-gray-800 placeholder-transparent focus:outline-none focus:border-blue-500 transition-all"
              placeholder="Email Address"
            />
            <label className="absolute left-0 -top-3.5 text-xs text-gray-400 peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 transition-all peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-blue-500">
              Email Address
            </label>
          </div>

          {/* Password */}
          <div className="relative group">
            <input
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
              className="peer w-full bg-transparent border-b-2 border-gray-300 py-2 text-sm text-gray-800 placeholder-transparent focus:outline-none focus:border-blue-500 transition-all"
              placeholder="Password"
            />
            <label className="absolute left-0 -top-3.5 text-xs text-gray-400 peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 transition-all peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-blue-500">
              Password
            </label>
          </div>

          {/* Button */}
          <button className="relative w-full py-3 rounded-full font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 shadow-lg shadow-blue-500/30 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300">
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-center mt-7 text-xs text-gray-500">
          New here?{" "}
          <Link
            to="/signup"
            className="font-semibold text-blue-600 hover:text-cyan-600 transition"
          >
            Create an account
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
