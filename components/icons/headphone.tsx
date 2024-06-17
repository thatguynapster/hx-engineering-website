import { IconProps, Template } from "./template";

export function HeadPhoneIcon({ size = 20, className, ...props }: IconProps) {
  return (
    <svg
      viewBox={`0 0 40 40`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...{ className, ...props }}
    >
      <path
        d="M7.73734 32.1688V26.6937C7.73734 24.875 9.16234 23.2437 11.1873 23.2437C13.0061 23.2437 14.6373 24.6687 14.6373 26.6937V31.9625C14.6373 35.6187 11.5998 38.6563 7.94359 38.6563C4.28734 38.6563 1.24984 35.6 1.24984 31.9625V20.4125C1.04359 9.875 9.36859 1.34375 19.9061 1.34375C30.4436 1.34375 38.7498 9.875 38.7498 20.2062V31.7563C38.7498 35.4125 35.7123 38.45 32.0561 38.45C28.3998 38.45 25.3623 35.4125 25.3623 31.7563V26.4875C25.3623 24.6687 26.7873 23.0375 28.8123 23.0375C30.6311 23.0375 32.2623 24.4625 32.2623 26.4875V32.1688"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
