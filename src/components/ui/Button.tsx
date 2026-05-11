"use client";

import { forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost";
  href?: string;
  target?: string;
  rel?: string;
}

const base =
  "inline-flex items-center justify-center gap-2 rounded-pill px-6 py-3 text-sm font-semibold font-body transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2";

const variants = {
  primary:
    "bg-transparent border border-accent text-white hover:bg-accent hover:shadow-glow-accent",
  ghost:
    "bg-transparent border border-white/10 text-white/80 hover:border-white/25 hover:text-white",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", href, className = "", children, ...props }, ref) => {
    const cls = `${base} ${variants[variant]} ${className}`;
    if (href) {
      return (
        <a href={href} className={cls} target={props.target} rel={props.rel}>
          {children}
        </a>
      );
    }
    return (
      <button ref={ref} className={cls} {...props}>
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
export default Button;
