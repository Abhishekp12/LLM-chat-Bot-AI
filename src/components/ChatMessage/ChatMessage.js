import React, { useEffect, useRef, useState } from "react";
import { BiSolidUserCircle } from "react-icons/bi";
import { FaRobot, FaFileImage } from "react-icons/fa";
import {
  AiOutlineFile,
  AiOutlineVideoCamera,
  AiOutlineAudio,
  AiOutlineFilePdf,
  AiOutlineFileText,
} from "react-icons/ai";
import { SiSvg } from "react-icons/si";
import "./ChatMessage.css";
import FilePreview from "../../customcomponents/FilePreview";

const ChatMessage = ({ onSendMessage = [] }) => {
  const pageRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [fileType, setFileType] = useState(null);
  const [previewPosition, setPreviewPosition] = useState({ top: 0, left: 0 });
  const [urlPreviewPermission, setUrlPreviewPermission] = useState(true);

  const scrollToBottom = () => {
    pageRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  },[onSendMessage] )

  const renderFileIcon = (fileType) => {
    switch (fileType) {
      case "image":
      case "png":
      case "jpg":
        return <FaFileImage size={20} />;
      case "video":
      case "mp4":
        return <AiOutlineVideoCamera size={20} />;
      case "audio":
      case "mp3":
        return <AiOutlineAudio size={20} />;
      case "pdf":
        return <AiOutlineFilePdf size={20} />;
      case "svg":
        return <SiSvg size={20} />;
      case "text":
      case "txt":
        return <AiOutlineFileText size={20} />;
      default:
        return <AiOutlineFile size={20} />;
    }
  };

  const checkURL = async (url) => {
    try {
      const response = await fetch(url, { method: "HEAD" }); // Using HEAD to check if the URL exists
      return response.ok;
    } catch (error) {
      console.error("Error checking URL:", error);
      return false;
    }
  };

  const handleMouseEnter = (e, url, type) => {
    const rect = e.target.getBoundingClientRect();
    setPreviewUrl(url);
    setFileType(type);
    setPreviewPosition({ top: rect.top - 250, left: rect.left });

    checkURL(url).then((isAccessible) => {
      if (isAccessible) {
        setUrlPreviewPermission(true);
      } else {
        setUrlPreviewPermission(false);
      }
    });
  };


  return (
    <>
      <ul className="chat-messages-list verticalScroll" >
        {onSendMessage?.map((chatMsg, idx) => {
          const isUser = chatMsg.isUser;
          const messageClass = isUser ? "user-message" : "bot-message";

          return (
            <li key={idx} className={messageClass}>
              <div className="message-icon">
                {isUser ? (
                  <BiSolidUserCircle size={25} />
                ) : (
                  <FaRobot size={25} />
                )}
              </div>
              <div className="message-content">
                <p className="role-title">{isUser ? "You" : "JARVIS"}</p>

                {chatMsg?.messages?.content && (
                  <p className="message-text">{chatMsg.messages.content}</p>
                )}

                {chatMsg?.messages?.name && (
                  <p className="message-text">
                    <a
                      href={chatMsg.messages.name}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="linkstlyle"
                      onMouseEnter={(e) =>
                        handleMouseEnter(
                          e,
                          chatMsg.messages.name,
                          chatMsg.messages.type
                        )
                      } // Adjust fileType if necessary
                      onMouseLeave={() => {
                        setPreviewUrl(null);
                        setFileType(null);
                      }}
                    >
                      {chatMsg.messages.name}
                    </a>
                  </p>
                )}

{/* 
               {chatMsg?.messages?.name && (
                  <p className="message-text">
                    <a
                      href={chatMsg.messages.name}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="linkstlyle"
                      onMouseEnter={(e) =>
                        handleMouseEnter(
                          e,
                          chatMsg.messages.name,
                          chatMsg.messages.type
                        )
                      } // Adjust fileType if necessary
                      onMouseLeave={() => {
                        setPreviewUrl(null);
                        setFileType(null);
                      }}
                    >
                      {chatMsg.messages.name}
                    </a>
                  </p>
                )} */}
                {chatMsg.file && (
                  <div className="file-message">
                    {renderFileIcon(chatMsg.file.type)}
                    <a
                      href={chatMsg.file.content || chatMsg.name}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="linkstlyle"
                      onMouseEnter={(e) =>
                        handleMouseEnter(
                          e,
                          chatMsg.file.content,
                          chatMsg.file.type
                        )
                      }
                      onMouseLeave={() => {
                        setPreviewUrl(null);
                        setFileType(null);
                      }}
                    >
                      {chatMsg.file.name}
                    </a>
                  </div>
                )}
              </div>
              {previewUrl && (
                <div
                  className="preview-container"
                  style={{
                    position: "absolute",
                    top: previewPosition.top,
                    left: previewPosition.left,
                  }}
                >
                  {/* <FilePreview
                    previewUrl={
                      urlPreviewPermission
                        ? previewUrl
                        : "https://www.insticc.org/node/TechnicalProgram/56e7352809eb881d8c5546a9bbf8406e.png"
                    }
                    fileType={fileType}
                  /> */}
                  <FilePreview previewUrl={previewUrl} fileType={fileType} />
                </div>
              )}
            </li>
          );
        })}
        <div ref={pageRef} />
      </ul>
      
    </>
  );
};

export default ChatMessage;
