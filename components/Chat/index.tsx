import { MessageList } from "react-chat-elements";
import "react-chat-elements/dist/main.css";

interface ChatProps {
    dataSource: any;
}

export default function Chat({dataSource}: ChatProps) {
  return (
    <>
      <MessageList
        className="message-list"
        lockable={true}
        toBottomHeight={"100%"}
        dataSource={dataSource}
      />
    </>
  );
}
