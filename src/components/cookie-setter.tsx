"use client";

import { getCookie, setCookie } from "@/lib/cookie";
import useApiKeyStore from "@/lib/zustand-states/apikey-store";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const CookieSetter = () => {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const { updateApiKey } = useApiKeyStore();

  useEffect(() => {
    const key = params.get("key");

    if (key) {
      setCookie("apiKey", key);
      updateApiKey(key);
      router.push(pathname);
    } else {
      const key = getCookie("apiKey");
      if (key) {
        updateApiKey(key);
      }
    }
  }, [params, pathname]);

  return <div></div>;
};

export default CookieSetter;
