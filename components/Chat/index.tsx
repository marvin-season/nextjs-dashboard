"use client";

import { Button, Input, InputRef, message } from "antd";
import { KeyboardEventHandler, useEffect, useRef, useState } from "react";
import { MessageList } from "react-chat-elements";
import "react-chat-elements/dist/main.css";

interface ChatProps {
  dataSource: any[];
  onSend: (text: string) => string;
}

export default function Chat({ dataSource, onSend }: ChatProps) {
  const [messageApi, contextHolder] = message.useMessage();
  const [text, setText] = useState("");
  const messageListRef = useRef<HTMLElement>(null);
  const inputRef = useRef<InputRef>(null);


  const handleSendMessage = () => {
    if (!text) {
      messageApi.open({
        type: "warning",
        content: "input empty!",
      });
      inputRef.current?.focus();
      return;
    }

    onSend(text);
    setText("");
  };

  useEffect(() => {
    if (dataSource.length > 0) {
      messageListRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [dataSource.length]);

  return (
    <>
      {contextHolder}
      <div className="">
        <div className="flex flex-col gap-4">
          <MessageList
            referance={messageListRef}
            className="message-list h-96 bg-gradient-to-r from-indigo-200 rounded-md p-2"
            lockable={true}
            toBottomHeight={"100%"}
            dataSource={dataSource}
          />
          <div className="flex flex-row gap-10 justify-between">
            <Input
              ref={inputRef}
              value={text}
              placeholder="Type here..."
              onChange={(e: any) => {
                setText(e.target.value);
              }}
              onKeyUp={(e) => {
                e.key === "Enter" && handleSendMessage();
              }}
            />

            <Button onClick={handleSendMessage} title="Send">
              send
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
