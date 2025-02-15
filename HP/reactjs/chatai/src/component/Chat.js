import "./Chat.css";
import React, { useRef, useState, useEffect } from "react";
import { LuSendHorizontal } from "react-icons/lu";
import { TailSpin } from "react-loading-icons";
import OpenAI from "openai";

const Chat = () => {
  const inputRef = useRef(null); //入力メッセージ格納変数
  const [messageList, setMessageList] = useState([]); // メッセージリスト格納変数
  const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY, // OpenAI APIキー
    dangerouslyAllowBrowser: true,
  });
  const [isLoading, setIsLoading] = useState(false); // ローディング中かどうかの状態変数
  const scrollRef = useRef(null); // チャットエリアのスクロール位置を管理するための変数

  // メッセージリストが更新された際にチャットエリアを一番下までスクロールする
  useEffect(() => {
    if (scrollRef.current) {
      const element = scrollRef.current;
      element.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messageList]);

  // inputRef の値が変更されたときに処理を実行する
  useEffect(() => {
    const currentInput = inputRef.current;
    if (currentInput) {
      currentInput.addEventListener("input", handleInput);
    }
    return () => {
      if (currentInput) {
        currentInput.removeEventListener("input", handleInput);
      }
    };
  }, []);

  // 送信ボタンクリック時の処理
  const handleClick = async () => {
    const inputValue = inputRef.current.value.trim();

    // 入力値が空の場合は処理を中断
    if (inputValue === "") {
      console.log("入力してください");
      return;
    }

    // 入力値をメッセージリストに追加
    setMessageList((prevList) => [
      ...prevList,
      { sender: "user", text: inputValue },
    ]);

    // テキストエリアをリセット
    inputRef.current.value = "";
    inputRef.current.style.height = "auto"; // テキストエリアの高さをリセット


    setIsLoading(true);

    // openaiからの返答を取得
    const gptResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: inputValue }],
    });

    setIsLoading(false);

    // APIの戻り値をメッセージリストに追加
    setMessageList((prevList) => [
      ...prevList,
      { sender: "bot", text: gptResponse.choices[0].message.content },
    ]);

    // console.log(inputValue);
    inputRef.current.style.lineHeight = "1px"; // 初期は1行分の高さに設定
  };

  // 入力欄にてエンターキー押下時の処理
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // デフォルトのEnterキーの動作を防ぐ
      handleClick(); // 送信ボタンクリック時の処理を実行
    }
  };

  // テキストエリアの高さを自動調整する処理
  const handleInput = () => {
    inputRef.current.style.height = "auto"; // 初期高さにリセット
    inputRef.current.style.height = `${inputRef.current.scrollHeight}px`; // 内容に応じて高さを調整

    if (inputRef.current.value.includes("\n")) {
      inputRef.current.style.lineHeight = "normal"; // 改行が入ったら行の高さをnormalに設定
    } else {
      inputRef.current.style.lineHeight = "1px"; // 初期は1行分の高さに設定
    }
  };

  return (
    <div className="chat">
      <h1>AI Chat Assistant</h1>
      <div className="chat_area" ref={scrollRef}>
        {messageList.map((message, index) => (
          <div
            key={index}
            className={
              message.sender === "user"
                ? "chat_message_send"
                : "chat_message_receive"
            }
          >
            <div
              className={
                message.sender === "user" ? "chat_sender" : "chat_receiver"
              }
            >
              <p>{message.text}</p>
            </div>
          </div>
        ))}
        {isLoading && <TailSpin />}
      </div>
      <div className="send_area">
        <textarea
          className="input_message"
          placeholder="Type a message"
          ref={inputRef}
          onKeyDown={handleKeyDown}
          onKeyUp={handleInput}
        />
        <button className="send_button" onClick={handleClick}>
          <LuSendHorizontal />
        </button>
      </div>
    </div>
  );
};

export default Chat;
