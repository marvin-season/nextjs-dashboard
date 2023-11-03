import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
const textDecorder = new TextDecoder();
const controller = new AbortController();
import { useImmer } from "use-immer";

type MessageProp = {
  id: string;
  position: "left" | "right";
  type: "text";
  title?: string;
  text: string;
};

const Q: MessageProp = {
  id: nanoid(),
  position: "right",
  type: "text",
  title: "Q",
  text: "",
};

const A: MessageProp = {
  id: nanoid(),
  position: "left",
  type: "text",
  title: "A",
  text: "",
};

const handleReset = (message: MessageProp) => {
  message.id = nanoid();
  message.title = '';
  message.text = '';
}

export const useChatMessage = (
  url = "/api/chat",
  onRead?: (data: string) => void,
  onComplete?: (data?: string) => void
) => {
  const [message, updateMessage] = useImmer<string[]>([]);

  const fetchData = async (chatMessage: MessageProp) => {
    try {
      const response = await fetch(url, {
        signal: controller.signal,
        method: "POST",
        body: JSON.stringify(chatMessage),
      });

      const reader = response.body?.getReader();
      while (true) {
        try {
          const segemnt = await reader?.read();

          if (segemnt?.done) {
            onComplete && onComplete();
            break;
          }

          if (segemnt?.value) {
            const value = textDecorder.decode(segemnt.value);

            updateMessage((prev) => {
              if (value) {
                prev.push(value);
              }
            });

            onRead && onRead(value);
          }
        } catch (error) {
          controller.abort();
          throw new Error("数据解码失败");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { data: message, mutate: fetchData };
};

export const useChatMessageList = () => {
  const [messages, updateMessages] = useImmer<MessageProp[]>([]);

  const patchMessages = (message: MessageProp) => {
    updateMessages((prev) => {
      const index = prev.findIndex((item) => item.id === message.id);
      if (index > -1) {
        prev[index].text = prev[index]?.text + message?.text;
      } else {
        prev.push(message);
      }
      console.log("prev", prev);
    });
  };

  const { mutate: chatFunc } = useChatMessage(
    "/api/chat",
    (data) => {
      const message = {
        ...A,
        text: data,
      };
      patchMessages(message);
    },
    () => {
      handleReset(A);
    }
  );

  const send = (data: string) => {
    handleReset(Q);
    Q.text = data;
    chatFunc(Q);
    updateMessages([...messages, { ...Q }]);

    return data;
  };

  return { messages, send };
};
