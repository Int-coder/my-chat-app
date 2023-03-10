import { useState } from "react";
import { supabase } from "../lib/Store";

const Home = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("testuser123@gmail.com");
  const [password, setPassword] = useState("123456");
  const [openTab, setOpenTab] = useState(1);
  const handleLogin = async (type) => {
    if ((!username || !password || !email) && type === "SIGNUP") {
      alert("All fields are required.");
      return;
    } else if (!email || !password) {
      alert("All fields are required.");
      return;
    }
    try {
      const {
        error,
        data: { user },
      } =
        type === "LOGIN"
          ? await supabase.auth.signInWithPassword({
              email: email,
              password,
            })
          : await supabase.auth.signUp({
              email: email,
              password,
              options: {
                data: {
                  username,
                },
              },
            });
      console.log(user?.user_metadata);
      // If the user doesn't exist here and an error hasn't been raised yet,
      // that must mean that a confirmation email has been sent.
      // NOTE: Confirming your email address is required by default.
      if (error) {
        alert("Error with auth: " + error.message);
      } else if (!user)
        alert("Signup successful, confirmation mail should be sent soon!");
    } catch (error) {
      alert(error.error_description || error);
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center p-4 bg-gray-300">
      <div className="w-full sm:w-1/2 xl:w-1/3">
        <div className="border-teal p-8 border-t-12 bg-white mb-6 rounded-lg shadow-lg bg-white">
          <ul className="flex space-x-2 justify-center ">
            <li>
              <a
                href="#"
                onClick={() => setOpenTab(1)}
                className={
                  "inline-block px-4 py-2 text-gray-600 rounded shadow" +
                  (openTab === 1 ? " bg-gray-400" : "")
                }
              >
                Login
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={() => setOpenTab(2)}
                className={
                  "inline-block px-4 py-2 text-gray-600 rounded shadow" +
                  (openTab === 2 ? " bg-gray-400" : "")
                }
              >
                Signup
              </a>
            </li>
          </ul>
          {openTab === 2 && (
            <div className="mb-4">
              <label className="font-bold text-grey-darker block mb-2">
                User Name
              </label>
              <input
                type="text"
                className="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow"
                placeholder="Your Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          )}
          <div className="mb-4">
            <label className="font-bold text-grey-darker block mb-2">
              Email
            </label>
            <input
              type="text"
              className="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="font-bold text-grey-darker block mb-2">
              Password
            </label>
            <input
              type="password"
              className="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            {openTab === 2 ? (
              <a
                onClick={(e) => {
                  e.preventDefault();
                  handleLogin("SIGNUP");
                }}
                href={"/channels"}
                className="bg-indigo-700 hover:bg-teal text-white py-2 px-4 rounded text-center transition duration-150 hover:bg-indigo-600 hover:text-white"
              >
                Sign up
              </a>
            ) : (
              <a
                onClick={(e) => {
                  e.preventDefault();
                  handleLogin("LOGIN");
                }}
                href={"/channels"}
                className="border border-indigo-700 text-indigo-700 py-2 px-4 rounded w-full text-center transition duration-150 hover:bg-indigo-700 hover:text-white"
              >
                Login
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
