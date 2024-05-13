import React, { useEffect, useState } from "react";
import "./App.css";
import axios, { all } from "axios";
import logo from "./swin.png";
import ipad from "./Appleipad.png";

import {
  Button,
  Input,
  Layout,
  Typography,
  Space,
  Image,
} from "antd";

const { Header, Content } = Layout;
const { Title } = Typography;

function App() {
  const [messages, setMessages] = useState([
    {
      user: "Chatbot",
      text: "Welcome to Swinburne Chatbot, How can I help you?",
    },
  ]);
  const [inputText, setInputText] = useState("");

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    if (inputText.trim() !== "") {
      const newMessage = { user: "You", text: inputText };
      setMessages([...messages, newMessage]);
      setInputText("");

      try {
        const response = await axios.post("http://localhost:5000/get-answer", {
          question: inputText,
        });
        const data = await response.data.response;
        const botResponse = { user: "Chatbot", text: data };
        setTimeout(() => {
          setMessages((prevMessages) => [...prevMessages, botResponse]);
        }, 1000);
      } catch (error) {
        console.error("Error:", error);
        const botResponse = {
          user: "Chatbot",
          text: "Sorry, it seems I can't answer this.",
        };
        setTimeout(() => {
          setMessages((prevMessages) => [...prevMessages, botResponse]);
        }, 1000);
      }
    }
  };

  return (
    <Layout>
      <Header style={{ backgroundColor: "#333" }}>
        <Space>
          <Image src={logo} width={50} />
          <Title style={{ color: "white" }} level={2}>
            Swinburne FAQ
          </Title>
        </Space>
      </Header>
      <Content
        style={{
          padding: "0px 50px 50px 50px",
          textAlign: "center",
          background: "linear-gradient(to right, #ece9e6, #ffffff)",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "70vw",
            height: "90vh",
            margin: "auto",
          }}
        >
          <img
            src={ipad}
            style={{
              height: "100%",
              width: "100%",
              objectFit: "contain",
            }}
          ></img>
          <div
            style={{
              top: "90px",
              left: "50%",
              height: "76%",
              padding: "5px",
              transform: "translateX(-50%)",
              position: "absolute",
            }}
          >
            <div
              style={{
                width: "350px",
                height: "450px",
                display: "flex",
                flexDirection: "column",
                overflowY: "scroll",
              }}
            >
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`message ${
                    message.user === "You" ? "user-message" : "bot-message"
                  }`}
                >
                  <strong>{message.user}: </strong>
                  {message.text}
                </div>
              ))}
            </div>
            <div
              style={{
                marginTop: "7px",
                textAlign: "left",
                padding: "5px 10px 5px 5px",
                position: "relative",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <p
                style={{
                  margin: "0",
                  height: "100%",
                  width: "100%",
                  overflowY: "auto",
                  padding: "0",
                }}
              >
                <form
                  onSubmit={handleMessageSubmit}
                  className="input-form"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <input
                    type="text"
                    value={inputText}
                    style={{ width: "70%" }}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Type your message..."
                  />
                  <button
                    type="submit"
                    style={{ height: "100%", width: "20%" }}
                  >
                    Send
                  </button>
                </form>
              </p>
            </div>
          </div>
        </div>
      </Content>
    </Layout>
  );
}

export default App;
