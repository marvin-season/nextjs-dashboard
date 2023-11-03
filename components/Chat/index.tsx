import { useState } from "react";
import { Button, Input, MessageList } from "react-chat-elements";
import "react-chat-elements/dist/main.css";

interface ChatProps {
  dataSource: any;
  onSend: (text: string) => void
}

export default function Chat({ dataSource, onSend }: ChatProps) {
  const [text, setText] = useState("");

  return (
    <>
      <div className="bg-gradient-to-r from-indigo-200">
        <div className="flex flex-col">
          <MessageList
            referance={null}
            className="message-list h-96"
            lockable={true}
            toBottomHeight={"100%"}
            dataSource={dataSource}
          />
          <div className="flex gap-4">
            <Input
              maxHeight={50}
              placeholder="Type here..."
              value={text}
              onChange={(e: any) => {
                setText(e.target.value);
              }}
              multiline={true}
            />
            <Button
              text={"Send"}
              onClick={() => onSend(text)}
              title="Send"
            />
            ;
          </div>
        </div>
      </div>
    </>
  );
}
