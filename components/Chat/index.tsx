"use client";

import { Button, Input } from "antd";
import { KeyboardEventHandler, useState } from "react";
import { MessageList } from "react-chat-elements";
import "react-chat-elements/dist/main.css";

interface ChatProps {
  dataSource: any;
  onSend: (text: string) => string;
}

export default function Chat({ dataSource, onSend }: ChatProps) {
  const [text, setText] = useState("");
  const handleKeyUp: KeyboardEventHandler<HTMLInputElement> = (e) => {
    e.key === "Enter" && onSend(text) && setText("");
  };

  return (
    <>
      <div className="">
        <div className="flex flex-col gap-4">
          <MessageList
            referance={null}
            className="message-list h-96 bg-gradient-to-r from-indigo-200 rounded-md p-2"
            lockable={true}
            toBottomHeight={"100%"}
            dataSource={dataSource}
          />
          <div className="flex flex-row gap-10 justify-between">
            <Input
              value={text}
              placeholder="Type here..."
              onChange={(e: any) => {
                setText(e.target.value);
              }}
              onKeyUp={handleKeyUp}
            />

            <Button
              onClick={() => {
                onSend(text);
                setText("");
              }}
              title="Send"
            >
              send
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
