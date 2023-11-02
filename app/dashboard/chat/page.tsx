"use client";

import { useEffect, useState } from "react";
import { useReadableData } from "./hook";

export default function Page() {
  const [streamData, updateStreamData] = useState("");

  const { mutate: fetchData } = useReadableData((data) => {
    updateStreamData((prev) => prev + data + "\n");
  });

  return (
    <>
      <button className="font-bold" onClick={() => updateStreamData("")}>
        Reset
      </button>
      <button onClick={() => fetchData()}>Fetch</button>
      <div dangerouslySetInnerHTML={{ __html: streamData }}></div>
    </>
  );
}
