"use client";

import { useState } from "react";
import BrandButton from "../atoms/BrandButton";
import BrandTextInput from "../atoms/BrandTextInput";
import { useRouter } from "next/navigation";

function LoginForm() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleUsernameChange(value: string) {
    setUsername(value);
  }

  function handlePasswordChange(value: string) {
    setPassword(value);
  }

  function handleLogin() {
    router.push("/home");
  }
  return (
    <div>
      <h1 className="text-center">Login </h1>
      <div className="form-container flex flex-col border w-fit p-20 mx-auto items-center">
        <BrandTextInput
          label="Username"
          value={username}
          placeholder="Username"
          onChange={handleUsernameChange}
        />
        <BrandTextInput
          label="Password"
          value={password}
          placeholder="Password"
          onChange={handlePasswordChange}
          type="password"
        />
        <div className="mt-6 w-full">
          <BrandButton label="login" onPress={handleLogin} />
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
