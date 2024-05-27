import React, { ReactNode } from "react";

const Pill = ({ children }: { children: ReactNode }) => {
  return (
    <div className="px-4 py-2 rounded-full border border-neutral-30 w-max text-neutral-40">
      {children}
    </div>
  );
};

export default Pill;
