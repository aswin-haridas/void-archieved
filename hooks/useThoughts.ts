import { useEffect, useState } from "react";
import useWebsocket from "./useWebsocket";

export default function useThoughts(query) {
  const { sendMessage, lastMessage } = useWebsocket();
  const [thoughts, setThoughts] = useState([]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (query?.trim()) {
        sendMessage(query);
      } else {
        setThoughts([]);
      }
    }, 300); // Match WebSocket delay to prevent rapid updates

    return () => clearTimeout(handler);
  }, [query, sendMessage]);

  useEffect(() => {
    if (lastMessage) {
      const thoughtsArray = lastMessage
        .split(",")
        .map((thought) => thought.trim())
        .filter((thought) => thought.length > 0);

      setThoughts(thoughtsArray);
    }
  }, [lastMessage]);

  return thoughts;
}
