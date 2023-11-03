"use client";

import { useEffect, useState } from "react";
import { useChatMessageList, useReadableData } from "./hook";
import Chat from "@/components/Chat";
import { ColorPicker, Input } from "antd";

export default function Page() {
  const { messages, send } = useChatMessageList();

  return (
    <>
      <Chat dataSource={messages} onSend={send} />
    </>
  );
}
