import Link from "next/link";
import { FormEventHandler, useRef } from "react";
import { toast } from "react-toastify";

const Login = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    let response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
      }),
    });
    let json = await response.json();
    if (json.success) {
      toast.success("Logged in successfully!");
      window.location.href = "/dashboard";
    } else {
      toast.error(json.error);
    }
  };
  return (
    <section className="min-h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input type="email" ref={emailRef} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" ref={passwordRef} />
        </div>
      </form>
      <p>
        Want to{" "}
        <Link className="text-amber-500 hover:text-amber-600" href="/register">
          Sign up?
        </Link>
      </p>
    </section>
  );
};
export default Login;
