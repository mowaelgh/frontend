import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../hooks/auth";

const Signin = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [userName, setUserName] = useState('');
  const [passWord, setPassWord] = useState('');
  const [isLoad, setIsLoad] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (isLoad) return;
    setIsLoad(true);

    const data = {
      userName: userName,
      password: passWord
    };
    try {
      const response = await axios.post("http://localhost:8080/auth/login", data);
      console.log("Response received", response.data);
      signIn(data); // Update authentication state
      navigate('/', { state: { UserInfo: data } });
    } catch (error) {
      console.error("Error during request", error);
    } finally {
      setIsLoad(false);
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="border rounded bg-gray-100 p-5">
        <div className="flex justify-center">
          <img src="/assets/img/logo1.png" alt="" className="w-52" />
        </div>
        {
          isLoad ?
            <div>
              Sign In ...
            </div>
            : <div className="mt-8">
              <form className="flex flex-col gap-3 w-80" onSubmit={handleSignIn}>
                <div className="flex flex-col gap-1">
                  <label htmlFor="email" className="text-xs font-bold">Adresse email:</label>
                  <input
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    type="text"
                    className="px-3 py-2 border-2 border-gray-400 rounded-lg"
                    id="email"
                    name="username"
                    placeholder="exemple@gmail.com"
                    autoComplete="off"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="password" className="text-xs font-bold">Mot de passe:</label>
                  <input
                    value={passWord}
                    onChange={(e) => setPassWord(e.target.value)}
                    type="password"
                    name="password"
                    id="password"
                    className="px-3 py-2 border-2 border-gray-400 rounded-lg"
                    placeholder="mot de passe"
                    autoComplete="off"
                    required
                  />
                </div>
                <button type="submit" className="p-4 bg-blue-600 font-bold uppercase text-white text-sm rounded-lg mt-3">
                  Sign in
                </button>
              </form>
            </div>
        }
      </div>
    </div>
  );
};

export default Signin;
