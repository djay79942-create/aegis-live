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
//     <main className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 overflow-hidden">

//       {/* Background glow blobs */}
//       <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl" />
//       <div className="absolute bottom-0 -right-24 w-96 h-96 bg-cyan-300/30 rounded-full blur-3xl" />

//       {/* Card */}
//       <div className="relative w-full max-w-sm backdrop-blur-xl bg-white/80 border border-white/40 rounded-3xl px-8 py-10 shadow-[0_30px_80px_rgba(0,0,0,0.18)]">

//         <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
//           Welcome Back
//         </h2>

//         <p className="text-center text-gray-500 text-sm mt-1 mb-8">
//           Login to your intelligence platform  account
//         </p>

//         <form onSubmit={handleSubmit} className="space-y-7">

//           {/* Email */}
//           <div className="relative group">
//             <input
//               type="email"
//               required
//               onChange={(e) => setEmail(e.target.value)}
//               className="peer w-full bg-transparent border-b-2 border-gray-300 py-2 text-sm text-gray-800 placeholder-transparent focus:outline-none focus:border-blue-500 transition-all"
//               placeholder="Email Address"
//             />
//             <label className="absolute left-0 -top-3.5 text-xs text-gray-400 peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 transition-all peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-blue-500">
//               Email Address
//             </label>
//           </div>

//           {/* Password */}
//           <div className="relative group">
//             <input
//               type="password"
//               required
//               onChange={(e) => setPassword(e.target.value)}
//               className="peer w-full bg-transparent border-b-2 border-gray-300 py-2 text-sm text-gray-800 placeholder-transparent focus:outline-none focus:border-blue-500 transition-all"
//               placeholder="Password"
//             />
//             <label className="absolute left-0 -top-3.5 text-xs text-gray-400 peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 transition-all peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-blue-500">
//               Password
//             </label>
//           </div>

//           {/* Button */}
//           <button className="relative w-full py-3 rounded-full font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 shadow-lg shadow-blue-500/30 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300">
//             Login
//           </button>
//         </form>

//         {/* Footer */}
//         <p className="text-center mt-7 text-xs text-gray-500">
//           New here?{" "}
//           <Link
//             to="/signup"
//             className="font-semibold text-blue-600 hover:text-cyan-600 transition"
//           >
//             Create an account
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
//   const [show, setShow] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(email, password);
//   };

//   return (
//     <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#020617] px-4">

//       {/* Neon background blobs */}
//       <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-blue-600/30 blur-[160px] rounded-full animate-pulse" />
//       <div className="absolute bottom-0 -right-40 w-[500px] h-[500px] bg-cyan-500/30 blur-[160px] rounded-full animate-pulse delay-1000" />

//       {/* Card */}
//       <div className="relative z-10 w-full max-w-sm rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl px-8 py-10 shadow-[0_40px_120px_rgba(0,255,255,0.18)]">

//         {/* Heading */}
//         <h2 className="text-center text-4xl font-extrabold bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-300 bg-clip-text text-transparent">
//           Welcome Back
//         </h2>

//         <p className="text-center text-sm text-gray-400 mt-2 mb-10">
//           Login to your intelligence platform
//         </p>

//         <form onSubmit={handleSubmit} className="space-y-8">

//           {/* Email */}
//           <div className="relative">
//             <input
//               type="email"
//               required
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Email"
//               className="
//                 peer w-full bg-transparent border-b border-white/20
//                 py-3 text-sm text-white
//                 placeholder-transparent
//                 focus:outline-none focus:border-cyan-400
//                 transition-all duration-300
//               "
//             />
//             <label
//               className="
//                 absolute left-0 -top-3.5 text-xs text-gray-400
//                 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm
//                 peer-focus:-top-3.5 peer-focus:text-xs
//                 peer-focus:text-cyan-400
//                 transition-all
//               "
//             >
//               Email Address
//             </label>
//             <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-gradient-to-r from-cyan-400 to-blue-500 peer-focus:w-full transition-all duration-500" />
//           </div>

//           {/* Password */}
//           <div className="relative">
//             <input
//               type={show ? "text" : "password"}
//               required
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Password"
//               className="
//                 peer w-full bg-transparent border-b border-white/20
//                 py-3 text-sm text-white
//                 placeholder-transparent
//                 focus:outline-none focus:border-cyan-400
//                 transition-all duration-300
//               "
//             />
//             <label
//               className="
//                 absolute left-0 -top-3.5 text-xs text-gray-400
//                 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm
//                 peer-focus:-top-3.5 peer-focus:text-xs
//                 peer-focus:text-cyan-400
//                 transition-all
//               "
//             >
//               Password
//             </label>

//             {/* Show/Hide */}
//             <button
//               type="button"
//               onClick={() => setShow(!show)}
//               className="absolute right-0 top-3 text-xs text-gray-400 hover:text-cyan-400 transition"
//             >
//               {show ? "HIDE" : "SHOW"}
//             </button>

//             <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-gradient-to-r from-cyan-400 to-blue-500 peer-focus:w-full transition-all duration-500" />
//           </div>

//           {/* Button */}
//           <button
//             className="
//               group relative w-full py-3 rounded-full
//               bg-gradient-to-r from-cyan-400 to-blue-500
//               text-black font-semibold
//               shadow-[0_0_40px_rgba(0,255,255,0.45)]
//               hover:shadow-[0_0_70px_rgba(0,255,255,0.7)]
//               hover:scale-[1.03]
//               active:scale-[0.97]
//               transition-all duration-300
//             "
//           >
//             <span className="relative z-10">Login</span>
//             <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition" />
//           </button>
//         </form>

//         {/* Footer */}
//         <p className="text-center mt-8 text-xs text-gray-400">
//           New here?{" "}
//           <Link
//             to="/signup"
//             className="font-semibold text-cyan-400 hover:text-cyan-300 transition"
//           >
//             Create an account
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
  const [show, setShow] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#030712] px-4">

      {/* Aurora background */}
      <div className="absolute inset-0">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-600/30 rounded-full blur-[200px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-cyan-500/30 rounded-full blur-[200px] animate-pulse delay-1000" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black" />
      </div>

      {/* Glass Card */}
      <div className="relative z-10 w-full max-w-md rounded-[28px] border border-white/15 bg-white/[0.06] backdrop-blur-2xl px-9 py-11 shadow-[0_50px_160px_rgba(0,255,255,0.25)]">

        {/* Gradient ring */}
        <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-white/20" />

        {/* Title */}
        <h2 className="text-center text-[42px] font-black tracking-tight bg-gradient-to-r from-purple-400 via-cyan-400 to-teal-300 bg-clip-text text-transparent">
          Welcome Back
        </h2>

        <p className="text-center text-sm text-gray-400 mt-3 mb-12">
          Secure access to your intelligence platform
        </p>

        <form onSubmit={handleSubmit} className="space-y-10">

          {/* Email */}
          <div className="relative">
            <input
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="
                peer w-full bg-transparent
                border-b border-white/25
                py-4 text-sm text-white
                placeholder-transparent
                focus:outline-none focus:border-cyan-400
                transition-all duration-300
              "
            />
            <label className="
              absolute left-0 -top-4 text-xs text-gray-400
              peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm
              peer-focus:-top-4 peer-focus:text-xs
              peer-focus:text-cyan-400
              transition-all
            ">
              Email Address
            </label>
            <span className="absolute left-0 bottom-0 h-[3px] w-0 bg-gradient-to-r from-purple-400 via-cyan-400 to-teal-300 peer-focus:w-full transition-all duration-700" />
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              required
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="
                peer w-full bg-transparent
                border-b border-white/25
                py-4 text-sm text-white
                placeholder-transparent
                focus:outline-none focus:border-cyan-400
                transition-all duration-300
              "
            />
            <label className="
              absolute left-0 -top-4 text-xs text-gray-400
              peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm
              peer-focus:-top-4 peer-focus:text-xs
              peer-focus:text-cyan-400
              transition-all
            ">
              Password
            </label>

            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-0 top-4 text-xs tracking-widest text-gray-400 hover:text-cyan-400 transition"
            >
              {show ? "HIDE" : "SHOW"}
            </button>

            <span className="absolute left-0 bottom-0 h-[3px] w-0 bg-gradient-to-r from-purple-400 via-cyan-400 to-teal-300 peer-focus:w-full transition-all duration-700" />
          </div>

          {/* CTA */}
          <button
            className="
              relative w-full py-4 rounded-full
              bg-gradient-to-r from-purple-500 via-cyan-400 to-teal-300
              text-black font-bold tracking-wide
              shadow-[0_0_60px_rgba(0,255,255,0.6)]
              hover:shadow-[0_0_100px_rgba(0,255,255,0.9)]
              hover:scale-[1.04]
              active:scale-[0.96]
              transition-all duration-300
            "
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-center mt-10 text-xs text-gray-400">
          New here?{" "}
          <Link
            to="/signup"
            className="font-semibold text-cyan-400 hover:text-teal-300 transition"
          >
            Create an account
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
