import { IconProps, Template } from "./template";

export function BulletIcon({ size = 20, className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 10 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...{ className, ...props }}
    >
      <circle cx="5" cy="5.5" r="5" fill="#BDBDBD" />
    </svg>
  );
}
