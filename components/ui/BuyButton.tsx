"use client";

import { useUser } from "@clerk/nextjs";

type BuyButtonProps = {
  checkoutUrl: string;
  children: React.ReactNode;
  className?: string;
};

export default function BuyButton({ checkoutUrl, children, className = "" }: BuyButtonProps) {
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress;

  const href = email
    ? `${checkoutUrl}?checkout[email]=${encodeURIComponent(email)}`
    : checkoutUrl;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}
