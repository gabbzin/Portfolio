import { useId } from "react";

import { Input } from "@/components/ui/input";

interface InputAnimationProps {
  label: string;
  type?: string;
}

export default function InputAnimation({
  label,
  type = "text",
  ...props
}: InputAnimationProps) {
  const id = useId();
  return (
    <div className="group relative">
      <label
        className="absolute top-1/2 block origin-start -translate-y-1/2 cursor-text px-1 text-muted-foreground/70 text-sm transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:font-medium group-focus-within:text-foreground group-focus-within:text-xs has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:font-medium has-[+input:not(:placeholder-shown)]:text-foreground has-[+input:not(:placeholder-shown)]:text-xs"
        htmlFor={id}
      >
        <span className="inline-flex bg-card px-2">{label}</span>
      </label>
      <Input id={id} placeholder=" " type={type} className="py-6" {...props} />
    </div>
  );
}
