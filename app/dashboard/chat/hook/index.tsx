import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
const textDecorder = new TextDecoder();
const controller = new AbortController();
import { useImmer } from 'use-immer'

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

export const useChatMessageList = () => {
  const [messages, updateMessages] = useImmer<MessageProp[]>([]);

  const patchMessages = (message: MessageProp) => {
    console.log("=====");

    updateMessages((prev) => {
      const index = prev.findIndex((item) => item.id === message.id);
      if (index > -1) {
        prev[index].text = prev[index]?.text + message?.text;
      } else {
        prev.push(message)
      }
    });
  };

  const { mutate } = useReadableData(
    (data) => {
      const message = {
        ...A,
        text: data,
      };
      patchMessages(message);
    },
    () => {
      A.id = nanoid();
      A.text = "";
    }
  );

  const send = (data: string) => {
    Q.id = nanoid();
    Q.text = data;
    updateMessages([...messages, { ...Q }]);
    mutate();
  };

  return { messages, send };
};

export const useReadableData = (
  onRead: (message: string) => void,
  onComplete?: () => void
) => {
  const fetchData = () => {
    fetch("http://localhost:3000/api/chat", { signal: controller.signal }).then(
      async (response) => {
        const reader = response.body?.getReader();
        while (1) {
          try {
            const segemnt = await reader?.read();
            if (segemnt) {
              const value = textDecorder.decode(segemnt.value);
              onRead(value);
            }
            if (segemnt?.done) {
              onComplete && onComplete();
              break;
            }
          } catch (error) {
            controller.abort();
          }
        }
      }
    );
  };

  return { mutate: fetchData };
};
