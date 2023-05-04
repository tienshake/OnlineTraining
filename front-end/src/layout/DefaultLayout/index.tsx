import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "./DefaultLayout.module.scss";
import InnerBanner from "../../components/InnerBanner";
import "./DefaultLayout.css"
import ChatBot from "../../components/chatBot/ChatBot";
import { ChatBotContext } from '../../context/Context';

type Props = {
  children: React.ReactNode;
  onlyHome?: boolean;
  onlyNotFound?: boolean;
  onlyCourseDetail?: boolean;
};

const DefaultLayout = ({
  children,
  onlyHome = false,
  onlyNotFound,
  onlyCourseDetail,
}: Props) => {
  const styleHome =
    onlyNotFound || onlyHome ? { maxWidth: "100%", background: "#fff" } : {};


    useEffect(() => {

    },[])


  const { showChatBox, handleShowChatBot } = useContext(ChatBotContext);

  return (
    <>
      <Header />
      {
        !showChatBox ? <div style={{ marginRight: '50px', position: "fixed", bottom: 0, right: 0, width: '300px', height: '', background: '#fff', zIndex: 10, cursor: 'pointer' }} onClick={handleShowChatBot}>show</div> : null
      }

      {
        showChatBox ? <ChatBot /> : null
      }

      {onlyCourseDetail && <InnerBanner />}
      <div className={styles.content} style={styleHome}>
        {children}
      </div>
      <Footer />
    </>
  );
};

export default DefaultLayout;
