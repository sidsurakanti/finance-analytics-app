import LoginForm from "@components/login/LoginForm";

export default function Login() {
  return (
    <main className="min-h-screen w-4/5 mx-auto flex flex-col items-center space-y-4">
      <p className="text-3xl p-4">Sign up</p>
      <LoginForm />
    </main>
  );
}
