import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  return (
    <main className="h-screen w-full flex items-center justify-center">
      <SignIn />
    </main>
  );
};

export default SignInPage;
