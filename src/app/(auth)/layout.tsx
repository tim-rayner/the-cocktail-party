//authenticated layout
import React, { ReactNode } from "react";

// import { useRouter } from "next/router";

// import { useAuth } from "@/lib/auth";

export default function AuthLayout({ children }: { children: ReactNode }) {
  //   const auth = useAuth();
  //   const router = useRouter();

  //   if (!auth.user) {
  //     router.push("/login");
  //     return null;
  //   }

  return (
    <div>
      <div className="bg-green-300">
        <span> Authenticated layout </span>
      </div>
      {children}
    </div>
  );
}
