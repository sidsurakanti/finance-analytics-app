"use client";

export default function LoginForm() {
  
  return (
    <form
      className=""
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="text"
        placeholder="Username"
      ></input>
      <input
        type="text"
        placeholder="Email address"
      ></input>
      <input
        type="text"
        placeholder="Password"
      ></input>
      <input
        type="submit"
        value="Continue"
      ></input>
    </form>
  );
}
