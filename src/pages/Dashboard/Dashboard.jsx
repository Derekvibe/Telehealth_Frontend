import React, { useState, useEffect } from "react";
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

//Video


const apiKey = import.meta.env.VITE_STREAM_API_KEY;

const API_URL = import.meta.env.VITE_API_URL || 'https://telehealth-backend-2m1f.onrender.com/api/v1';

function App() {
  // const [user, setUser] = useState(null);
  // const [token, setToken] = useState(null);
  const [channel, setChannel] = useState(null);
  const [clientReady, setClientReady] = useState(false);
  const navigate = useNavigate();

  // const ChatComponent = () => {
    const { user, token, Logout } = useStream();
  
    // if (!user) return <div>Page Not Available</div>;
    // console.log(user);

    // Always call the hook
    const chatClient = useCreateChatClient({
      apiKey,
      tokenOrProvider: token,
      userData: { id: user?.id },
    });

    // Connect user to Stream
    useEffect(() => {
      const connectUser = async () => {
        if (!chatClient || !user || !token || !user.id) return;

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

  if (!clientReady || !channel) return <div>Loading chat...</div>;
  
  
  return (
    <div>
      <Chat client={chatClient} theme="str-chat__theme-light">
        <Channel channel={channel}>
          <Window>
            <div>
            <button
              onClick={handleVideoCallClick}
              className="text-white p-2 m-4 text-lg"
          >
            Video Call
              </button>
              
              <button
                onClick={handleLogout}
                className="p-2 m-2 bg-red-600 text-white border-none cursor-pointer"
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
