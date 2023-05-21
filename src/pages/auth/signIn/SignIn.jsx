import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, googleProvider } from "../../../config/firebase";
import { Icon } from "@iconify/react";

import "./style.scss";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    console.log({ user: auth.currentUser });
  }, []);

  console.log(auth?.currentUser?.email);
  const signIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error(error);
    }
  };

  const googleSignIn = async () => {
    await signInWithPopup(auth, googleProvider);
  };

  const exit = async () => {
    await signOut(auth);
  };

  return (
    <div className="pt-20 flex flex-col justify-center items-center">
      <h2 className="mb-8 text-5xl text-white">Войти</h2>
      <form className="w-96 mb-6">
        <div className="flex flex-col gap-2 mb-6">
          <span className="text-white">Адрес электронной почты</span>
          <input
            className=" p-4 rounded-md bg-inherit outline-none border-neutral-500 border text-white"
            type="email"
            placeholder="email@index.html"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2 mb-8">
          <span className="text-white">Пароль</span>
          <input
            className=" p-4 rounded-md bg-inherit outline-none border-neutral-500 border text-white"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div>
          <button
            className="w-full p-4 flex justify-center items-center bg-green-600 rounded-md text-white cursor-pointer"
            onClick={signIn}
            type="submit"
          >
            Войти
          </button>
        </div>
      </form>

      <button
        onClick={googleSignIn}
        className="p-4 rounded-full border-white border"
      >
        <Icon width={32} icon="flat-color-icons:google" />
      </button>

      <div className="w-96 flex gap-1">
        <p className="text-white">New to iMovie?</p>{" "}
        <Link to="/sign-up" className="text-white hover:text-purple-500">
          Sign up
        </Link>
      </div>
      <button className=" bg-slate-700 mt-3 w-96 p-4" onClick={exit}>
        Выйти
      </button>
    </div>
  );
};

export default SignIn;
