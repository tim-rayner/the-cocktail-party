//authenticated layout
import React, { ReactNode } from "react";

// import { useRouter } from "next/router";

// import { useAuth } from "@/lib/auth";

export default function UnAuthLayout({ children }: { children: ReactNode }) {
  //   const auth = useAuth();
  //   const router = useRouter();

  //   if (!auth.user) {
  //     router.push("/login");
  //     return null;
  //   }

  return (
    <div>
      <div className="bg-red-300">
        <span> Unauthenticated layout </span>
      </div>

      {children}
    </div>
  );
}
