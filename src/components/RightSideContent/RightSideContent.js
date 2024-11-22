import React from "react";
import { MdOutlineArrowLeft, MdOutlineArrowRight } from "react-icons/md";
import MessageInput from "../MessageInput/MessageInput";
import ChatMessage from "../ChatMessage/ChatMessage";

const RightSideContent = ({
  isShowSidebar = false,
  toggleSidebar = () => {},
  message = "",
  setMessage = "",
  file = null,
  setFile = null,
  onSendMessage = [],
  setOnSendMessage = [],
  setCheckUser,
}) => {
  return (
    <section className="main ">
      <div className="empty-chat-container">
        {/* <img
                // src='images/chatgpt-logo.svg'
                  src='bot.png'
                width={45}
                height={45}
                alt='ChatGPT'
              /> */}
        <div className="chatNAme">
          <h1 className="logo-nam">JARVIS AI</h1>{" "}
        </div>
        {onSendMessage.length === 0 && (
          <h2 className="welcomemsg">Hello,How can I help you today?</h2>
        )}
      </div>

      {isShowSidebar ? (
        <div className="tooltip-container">
          <MdOutlineArrowRight
            className="burger"
            size={40}
            onClick={toggleSidebar}
          />
          <div className="tooltip"> Open Sidebar</div>
        </div>
      ) : (
        <div className="tooltip-container">
          <MdOutlineArrowLeft
            className="burger"
            size={40}
            onClick={toggleSidebar}
          />
          <div className="tooltip">Close Sidebar</div>
        </div>
      )}

      <ChatMessage onSendMessage={onSendMessage} />

      <div className="main-bottom">
        <MessageInput
          message={message}
          setMessage={setMessage}
          file={file}
          setFile={setFile}
          onSendMessage={onSendMessage}
          setOnSendMessage={setOnSendMessage}
          setCheckUser={setCheckUser}
        />
        <p style={{ color: "#7D7D7D" }}>
          JARVIS AI may display inaccurate info, including about people, so
          double-check its responses
        </p>
      </div>
    </section>
  );
};

export default RightSideContent;
