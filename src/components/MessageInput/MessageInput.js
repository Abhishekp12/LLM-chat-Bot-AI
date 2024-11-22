import React from "react";
import { IconButton, InputAdornment, TextField, Tooltip } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import GetFilIcon from "../../customcomponents/GetFilIcon";
import { responses } from "../../constants/BotResponse";

const MessageInput = ({
  message = "",
  setMessage = "",
  file = null,
  setFile = null,
  onSendMessage = null,
  setOnSendMessage = null,
  setCheckUser,
}) => {
  // console.log(onSendMessage, "ONSENDMESSAGE");

  //   try {
  //     // Handle new message
  //     const newMessage = { type: "text", content: message };
  //     const newFile = file
  //       ? { type: "file", content: URL.createObjectURL(file), name: file.name }
  //       : null;

  //     // Initialize onSendMessage as an array if it's not already one
  //     const updatedMessages = onSendMessage ? [...onSendMessage] : [];

  //     // Add the new message and file
  //     updatedMessages.push({ messages: newMessage, file: newFile, isUser: true });

  //     // Update the state
  //     await setOnSendMessage(updatedMessages);

  //     // Clear the fields after sending the message
  //     setCheckUser(true);
  //     setMessage("");
  //     setFile(null);
  //   } catch (error) {
  //     console.error("Error sending message:", error);
  //   }
  // };
  const handleSendMessage = () => {
    // Create the new message and file objects
    const newMessage = { type: "text", content: message };
    const newFile = file
      ? { type: "file", content: URL.createObjectURL(file), name: file.name }
      : null;

    // Initialize onSendMessage as an array if it's not already one
    const updatedMessages = [...onSendMessage];
    updatedMessages.push({ messages: newMessage, file: newFile, isUser: true });
    // Update the state with the new message and file
    setOnSendMessage(updatedMessages);
  

    setTimeout(() => {
      
      // Process bot responses
      const content = newMessage?.content?.trim()?.toLowerCase();
      const fileName = newFile ? newFile.name.toLowerCase() : "";

      let botResponse = null;
    
      if (responses[content]) {
        botResponse = { ...responses[content], isUser: false };
      } else if (
        responses[content]?.includes("document") &&
        responses["document"]
      ) {
        botResponse = { ...responses["document"], isUser: false };
      } else if (responses[content]?.includes("image") && responses["image"]) {
        botResponse = { ...responses["image"], isUser: false };
      } else if (responses[content]?.includes("video") && responses["video"]) {
        botResponse = { ...responses["video"], isUser: false };
      } else if (responses[content]?.includes("html") && responses["html"]) {
        botResponse = { ...responses["html"], isUser: false };
      }else if (responses[content] && responses["website"]) {
        botResponse = { ...responses["website"], isUser: false };
      }else {
        botResponse = { ...responses["no answer"], isUser: false };
      }

      if (botResponse) {
        setOnSendMessage((prevMessages) => [
          ...prevMessages,
          { messages: botResponse },
        ]);
      }
    }, 700);

    // Clear the input fields
    setCheckUser(true);
    setMessage("");
    setFile(null);
  };


  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };


  return (
    <>
      <TextField
        variant="outlined"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        multiline
        maxRows={4} // Maximum rows limit
        onKeyDown={handleKeyDown}
        sx={{
          width: "100% !important", // Set width to 90% of its container
          borderRadius: "16px",
          "& .MuiOutlinedInput-root": {
            borderRadius: "16px",
            "& fieldset": {
              borderColor: "rgba(0, 0, 0, 0.23)", // Default border color
            },
            "&:hover fieldset": {
              borderColor: "rgba(0, 0, 0, 0.23)", // Border color on hover
            },
            "&.Mui-focused fieldset": {
              borderColor: '#b8b8b8', // Slightly lighter border color on focus
            boxShadow: `0 0 0 1px #b8b8b8`, // Thin shadow on focus
            },
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Tooltip title="Attach file">
                <label htmlFor="file-upload">
                  <IconButton component="span">
                    <AttachFileIcon />
                  </IconButton>
                  <input
                    id="file-upload"
                    type="file"
                    style={{ display: "none" }}
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </label>
              </Tooltip>
            </InputAdornment>
          ),
          endAdornment: (
            <>
              <GetFilIcon file={file} setFile={setFile} />
              <InputAdornment position="end">
                <Tooltip title="Send message">
                  <IconButton onClick={handleSendMessage}>
                    <SendIcon />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            </>
          ),
        }}
      />
    </>
  );
};

export default MessageInput;
