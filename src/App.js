
import "./App.css";
import LeftSideBar from "./components/LeftSideContent/LeftSideBar";
import RightSideContent from "./components/RightSideContent/RightSideContent";
import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useLayoutEffect,
} from "react";
import { debounce } from "lodash";
//import ResizeObserver from "resize-observer-polyfill";

function App() {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [onSendMessage, setOnSendMessage] = useState([]);
  const [checkUser, setCheckUser] = useState(false);
  const [text, setText] = useState("");
  const [localChats, setLocalChats] = useState([]);
  const [currentTitle, setCurrentTitle] = useState(null);
  const [isShowSidebar, setIsShowSidebar] = useState(false);
  const scrollToLastItem = useRef(null);

  const createNewChat = () => {
    setOnSendMessage([]);
    setMessage(null);
    setText("");
    setCurrentTitle(null);
  };

  //   setCurrentTitle(uniqueTitle);
  //   setMessage(null);
  //   setText("");
  // };

  const toggleSidebar = useCallback(() => {
    setIsShowSidebar((prev) => !prev);
  }, []);

  //   e.preventDefault();
  //   return setErrorText("My billing plan is gone because of many requests.");
  //   if (!text) return;

  //   setIsResponseLoading(true);
  //   setErrorText("");

  //   const options = {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: import.meta.env.VITE_AUTH_TOKEN,
  //     },
  //     body: JSON.stringify({
  //       message: text,
  //     }),
  //   };

  //   try {
  //     const response = await fetch(
  //       `${import.meta.env.VITE_API_URL}/api/completions`,
  //       options
  //     );

  //     if (response.status === 429) {
  //       return setErrorText("Too many requests, please try again later.");
  //     }

  //     const data = await response.json();

  //     if (data.error) {
  //       setErrorText(data.error.message);
  //       setText("");
  //     } else {
  //       setErrorText(false);
  //     }

  //     if (!data.error) {
  //       setErrorText("");
  //       setMessage(data.choices[0].message);
  //       setTimeout(() => {
  //         scrollToLastItem.current?.lastElementChild?.scrollIntoView({
  //           behavior: "smooth",
  //         });
  //       }, 1);
  //       setTimeout(() => {
  //         setText("");
  //       }, 2);
  //     }
  //   } catch (e) {
  //     setErrorText(e.message);
  //     console.error(e);
  //   } finally {
  //     setIsResponseLoading(false);
  //   }
  // };

  useLayoutEffect(() => {
    const handleResize = debounce(() => {
      setIsShowSidebar(window.innerWidth <= 640);
    }, 100); // Adjust the debounce delay as necessary

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const storedChats = localStorage.getItem("previousChats");

    if (storedChats) {
      setLocalChats(JSON.parse(storedChats));
    }
  }, []);

  //   if (!currentTitle && text && message) {
  //     setCurrentTitle(text);
  //   }

  //   if (currentTitle && text && message) {
  //     const newChat = {
  //       title: currentTitle,
  //       role: "user",
  //       content: text,
  //     };

  //     const responseMessage = {
  //       title: currentTitle,
  //       role: message.role,
  //       content: message.content,
  //     };

  //     setPreviousChats((prevChats) => [...prevChats, newChat, responseMessage]);
  //     setLocalChats((prevChats) => [...prevChats, newChat, responseMessage]);

  //     const updatedChats = [...localChats, newChat, responseMessage];
  //     localStorage.setItem("previousChats", JSON.stringify(updatedChats));
  //   }
  // }, [message, currentTitle]);

  // const currentChat = (localChats || previousChats).filter(
  //   (prevChat) => prevChat.title === currentTitle
  // );

  // const uniqueTitles = Array.from(
  //   new Set(previousChats.map((prevChat) => prevChat.title).reverse())
  // );

  // const localUniqueTitles = Array.from(
  //   new Set(localChats.map((prevChat) => prevChat.title).reverse())
  // ).filter((title) => !uniqueTitles.includes(title));

  return (
    <div className="container">
      <LeftSideBar
        isShowSidebar={isShowSidebar}
        createNewChat={createNewChat}
        localChats={localChats}
        toggleSidebar={toggleSidebar}
        setOnSendMessage={setOnSendMessage}
      />
      <RightSideContent
        isShowSidebar={isShowSidebar}
        createNewChat={createNewChat}
        localChats={localChats}
        currentTitle={currentTitle}
        toggleSidebar={toggleSidebar}
        scrollToLastItem={scrollToLastItem}
        text={text}
        setText={setText}
        message={message}
        setMessage={setMessage}
        file={file}
        setFile={setFile}
        onSendMessage={onSendMessage}
        setOnSendMessage={setOnSendMessage}
        checkUser={checkUser}
        setCheckUser={setCheckUser}
      />
    </div>
  );
}

export default App;
