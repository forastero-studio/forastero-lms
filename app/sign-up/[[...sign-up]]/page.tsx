import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-[#f7f5ef] flex flex-col items-center justify-center">
      <div className="mb-8 text-center">
        <p className="font-sans font-light text-sm text-[#111111]" style={{ letterSpacing: "0.05em" }}>forastero</p>
        <p className="font-mono text-[9px] tracking-widest uppercase text-[#888] mt-0.5">
          LMS
        </p>
      </div>
      <SignUp />
    </div>
  );
}
