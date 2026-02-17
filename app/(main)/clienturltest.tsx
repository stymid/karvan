"use client";
import { addToast } from "@heroui/toast";
import React, { useEffect } from "react";

const Clienturltest = ({ url }: { url: string }) => {
  console.log(url);
  useEffect(() => {
    addToast({ description: url });
  }, []);
  return <div>Clienturltest</div>;
};

export default Clienturltest;
