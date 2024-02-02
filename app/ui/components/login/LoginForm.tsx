"use client";

export default function LoginForm() {
  // TODO: add form state
  return (
    <form
      className="flex flex-col justify-between items-center space-y-4"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="text"
        className="outline-none border-2 border-cyan-800 rounded-lg p-4 bg-black placeholder:text-[#CBCBCB]"
        placeholder="Username"
      ></input>
      <input
        type="text"
        className="outline-none border-2 border-cyan-800 rounded-lg p-4 bg-black placeholder:text-[#CBCBCB]"
        placeholder="Email address"
      ></input>
      <input
        type="text"
        className="outline-none border-2 border-cyan-800 rounded-lg p-4 bg-black placeholder:text-[#CBCBCB]"
        placeholder="Password"
      ></input>
      <input
        type="submit"
        value="Continue"
        className="bg-[#2B79D4] rounded-xl py-4 px-6 font-semibold"
      ></input>
    </form>
  );
}
