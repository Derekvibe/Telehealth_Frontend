import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Chat,
  Channel,
  ChannelHeader,
  MessageInput,
  MessageList,
  Thread,
  Window,
  useCreateChatClient,
} from "stream-chat-react";
import "stream-chat-react/dist/css/v2/index.css";
import { useStream } from "../../components/StreamContext";
import VideoStream from "../../components/VideoStream";
import { useNavigate } from "react-router-dom";
import { StreamClient } from "getstream";



const apiKey = import.meta.env.VITE_STREAM_API_KEY;

const API_URL = import.meta.env.VITE_API_URL || 'https://telehealth-backend-2m1f.onrender.com/api/v1';

function App() {
  const [channel, setChannel] = useState(null);
  const [clientReady, setClientReady] = useState(false);
  const navigate = useNavigate();
  const connectedRef = useRef(false)

  // const ChatComponent = () => {
    const { user, token, Logout } = useStream();

    // Always call the hook
    const chatClient = useCreateChatClient({
      apiKey,
      tokenOrProvider: token,
      userData: user?.id ? { id: user.id } : undefined,
    });
  
  // Debug: See when user/token is ready
  useEffect(() => {
    console.log("Stream user:", user);
    console.log("Stream token:", token);
  }, [user, token]);

    // Connect user to Stream
    useEffect(() => {
      const connectUser = async () => {
        if (connectedRef.current) return; // prevent multiple calls

        if (!chatClient || !user || !token || !user?.id) {
          console.warn("Missing chat setup data:", { chatClient, token, user });
          return;
        }
      

        try {
          await chatClient.connectUser(
            {
              id: user.id,
              name: user.name || "Anonymous",
              image:
                user.image ||
                `https://getstream.io/random_png/?name=${user.name || "user"}`,
            },
            token
          );

          const newChannel = chatClient.channel("messaging", "my_general_chat", {
            name: "General Chat",
            members: [user.id],
          });

          await newChannel.watch();
          setChannel(newChannel);
          setClientReady(true);
        } catch (err) {
          console.error("Error connecting user:", err);
        }
      };

      connectUser();
    }, [chatClient, user, token]);
  
    const handleVideoCallClick = () => {
      navigate("/videoCall");
  };
  
  const handleLogout = async () => {
    await Logout();
    navigate("/login");
  }

  if (!user || !token) {
    return <div className="text-red-600">User or token not ready.</div>;
  }

  if (!clientReady || !channel) return <div>Loading chat...</div>;
  
  
  return (
    <div className="w-full min-h-screen p-2 sm:p-4 bg-gray-100">
      <Chat client={chatClient} theme="str-chat__theme-light">
        <Channel channel={channel}>
          <Window>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 p-2">
          <button
            onClick={handleVideoCallClick}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm sm:text-base"
          >
            Video Call
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm sm:text-base"
          >
            Logout
          </button>
        </div>
 
            <ChannelHeader />
            <MessageList />
            <MessageInput />
          </Window>
          <Thread />
        </Channel>
      </Chat>
      
     
      </div>
      
    );
  }

export default App;
