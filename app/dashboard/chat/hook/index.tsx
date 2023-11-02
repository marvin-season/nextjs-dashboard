import { useState } from "react";

const textDecorder = new TextDecoder();
const controller = new AbortController();

export const useReadableData = (onRead: (message: string) => void) => {

  const fetchData = () => {
    fetch("http://localhost:3000/api/chat", { signal: controller.signal }).then(
      async (response) => {
        const reader = response.body?.getReader();
        while (1) {
          try {
            const segemnt = await reader?.read();
            if (segemnt) {
              const value = textDecorder.decode(segemnt.value);
              onRead(value)
            }
            if (segemnt?.done) {
              break;
            }
          } catch (error) {
            controller.abort()
          }
        }
      }
    );
  };

  return { mutate: fetchData };
};
