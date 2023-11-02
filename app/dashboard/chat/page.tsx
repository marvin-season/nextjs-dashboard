"use client";

import { useEffect, useState } from "react";
import { useChatMessageList, useReadableData } from "./hook";
import Chat from "@/components/Chat";

export default function Page() {
  const { messages, send } = useChatMessageList();

  return (
    <>
      <button
        onClick={() => {
          send("你好");
        }}
      >
        Fetch
      </button>
      <Chat dataSource={messages} />
    </>
  );
}
