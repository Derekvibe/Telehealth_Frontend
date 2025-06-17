import React, { useEffect, useState } from "react";
import { StreamVideoClient } from "@stream-io/video-client";
import { StreamVideo, StreamCall } from "@stream-io/video-react-sdk";
import { useNavigate } from "react-router-dom";


import { useStream } from "./StreamContext";
import { MyUILayout } from "./MyUILayout";


const apiKey = import.meta.env.VITE_STREAM_API_KEY;

function VideoStream() {

  const [client, setClient] = useState(null);
    const [call, setCall] = useState(null);
  const { user, token } = useStream();
  const navigate = useNavigate();
  
  useEffect(() => {
      
    let clientInstance;
    let callInstance;


    const setup = async () => {
      if (!apiKey || !user || !token) return;
  
      clientInstance = new StreamVideoClient({ apiKey, user, token });
        
      callInstance = clientInstance.call("default", user.id); // Use user.id as callId

  
      await callInstance.join({ create: true });
  
      setClient(clientInstance);
      setCall(callInstance);
    };
  
    setup();
    
    return () => {
      if (callInstance) callInstance.leave();
      if (clientInstance) clientInstance.disconnectUser();

    };
  }, [user, token]);

  const handleLeaveCall = async () => {
    if (call) await call.leave();
    if (client) await client.disconnectUser();

    setCall(null);
    setClient(null);

    navigate("/dashboard"); // or any other route
  };
  
  if (!apiKey) return <div>Missing Stream API Key</div>;
  
  if (!client || !call)
    return (
  <div className="flex items-center justify-center h-screen text-xl font-semibold">
    Connecting to the video call...
  </div>
    );
  
  return (
    <div className="relative h-screen w-full p-2 sm:p-4 bg-gray-50">
      <StreamVideo client={client}>
        <StreamCall call={call}>
          <MyUILayout />
        </StreamCall>
      </StreamVideo>

      <button
        onClick={handleLeaveCall}
        className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-red-600 text-white text-sm sm:text-base px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg shadow hover:bg-red-700 transition"
      >
        Leave Call
      </button>
    </div>
    );
  }

export default VideoStream;