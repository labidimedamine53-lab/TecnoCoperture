import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative isolate inline-flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-xl border text-sm font-semibold transition-all duration-300 before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(120deg,transparent_20%,rgba(255,255,255,0.45)_50%,transparent_80%)] before:translate-x-[-140%] before:transition-transform before:duration-700 hover:before:translate-x-[140%] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ring-offset-white",
  {
    variants: {
      variant: {
        default:
          "border-sky-400/40 bg-[linear-gradient(135deg,#0ea5e9_0%,#06b6d4_45%,#0ea5e9_100%)] text-white shadow-[0_16px_35px_-14px_rgba(14,165,233,0.95)] hover:brightness-110 focus-visible:ring-sky-400",
        secondary:
          "border-slate-700 bg-[linear-gradient(135deg,#0f172a_0%,#1e293b_55%,#334155_100%)] text-white shadow-[0_12px_28px_-14px_rgba(15,23,42,0.9)] hover:brightness-110 focus-visible:ring-slate-500",
        outline:
          "border-slate-300 bg-white/90 text-slate-900 backdrop-blur-sm hover:bg-white focus-visible:ring-slate-400",
        ghost: "border-transparent bg-transparent text-slate-900 hover:bg-slate-100/80 focus-visible:ring-slate-400",
        destructive:
          "border-red-500/40 bg-[linear-gradient(135deg,#dc2626_0%,#ef4444_55%,#f87171_100%)] text-white shadow-[0_16px_32px_-14px_rgba(220,38,38,0.95)] hover:brightness-110 focus-visible:ring-red-400",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  ),
);
Button.displayName = "Button";

export { Button, buttonVariants };
