import React, { useEffect, useState } from "react";
import { StreamVideoClient } from "@stream-io/video-client";
import { StreamVideo, StreamCall } from "@stream-io/video-react-sdk";


import { useStream } from "./StreamContext";
import { MyUILayout } from "./MyUILayout";

const apiKey = import.meta.env.VITE_STREAM_API_KEY;

function VideoStream() {

  const [client, setClient] = useState(null);
    const [call, setCall] = useState(null);
    const { user, token } = useStream();
  
    useEffect(() => {
      const setup = async () => {
        if (!user || !token) return;
  
        const clientInstance = new StreamVideoClient({ apiKey, user, token });
        const callInstance = clientInstance.call("default", user.id); // Use user.id as callId

  
        await callInstance.join({ create: true });
  
        setClient(clientInstance);
        setCall(callInstance);
      };
  
      setup();
    }, [user, token]);
  
    if (!client || !call) return <div>Loading video call...</div>;
  
    return (
      <StreamVideo client={client}>
        <StreamCall call={call}>
          <MyUILayout />
        </StreamCall>
      </StreamVideo>
    );
  }

export default VideoStream;