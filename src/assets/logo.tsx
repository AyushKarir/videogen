import * as React from "react";
import { SVGProps } from "react";
const Logo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 30 30"
  >
    <rect width={30} height={30} fill="#fff" rx={6} />
    <path
      fill="#191918"
      d="M16 9v12h-2.15v-7.197L11.873 21h-1.736L8.15 13.786V21H6V9h2.54l2.479 8.308L13.472 9H16Z"
    />
    <path fill="#005CF0" d="M20.598 18.744H24V21h-6V9h2.598v9.744Z" />
  </svg>
);
export default Logo;
