import { Link } from "@/i18n/navigation";
import { cn } from "@/libs/utils";
import { Spinner } from "./loading";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

export type ButtonVariant = "primary" | "secondary";

type ButtonSharedProps = {
  variant?: ButtonVariant;
  loading?: boolean;
  className?: string;
  children: ReactNode;
};

type ButtonAsButtonProps = ButtonSharedProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonSharedProps> & {
    href?: undefined;
  };

type ButtonAsLinkProps = ButtonSharedProps &
  Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    keyof ButtonSharedProps | "href"
  > & {
    href: string;
  };

export type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50";

const primaryClasses = "text-white";
const primaryDefaultBackground = "bg-[#104722] hover:bg-[#0b461b]";

const secondaryClasses =
  "border border-[#104722] bg-transparent text-[#104722] hover:bg-[#104722]/10";

const isButtonProps = (props: ButtonProps): props is ButtonAsButtonProps =>
  props.href === undefined;

export const Button = (props: ButtonProps) => {
  const { variant = "primary", loading = false, className, children } = props;
  const hasCustomBackground = Boolean(className?.includes("bg-"));

  const classes = cn(
    baseClasses,
    variant === "primary" && primaryClasses,
    variant === "primary" && !hasCustomBackground && primaryDefaultBackground,
    variant === "secondary" && secondaryClasses,
    loading && "cursor-wait",
    className,
  );

  if (!isButtonProps(props)) {
    const { href, variant: _variant, loading: _loading, ...rest } = props;

    return (
      <Link className={classes} href={href} {...rest}>
        {loading && <Spinner className="size-4 border-2" />}
        {children}
      </Link>
    );
  }

  const {
    variant: _variant,
    loading: _loading,
    disabled,
    type = "button",
    ...rest
  } = props;

  return (
    <button
      className={classes}
      disabled={disabled || loading}
      type={type}
      {...rest}
    >
      {loading && <Spinner className="size-4 border-2" />}
      {children}
    </button>
  );
};
