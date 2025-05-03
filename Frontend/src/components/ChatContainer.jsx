import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore.js'
import { useAuthStore } from '../store/useAuthStore.js'
import TextInput from './TextInput.jsx'
import ChatHeader from './ChatHeader.jsx'
import TextSkeleton from './skeletons/TextSkeleton.jsx'


function ChatContainer() {

  const { texts, getTexts, isTextsLoading, selectedUser} = useChatStore();

  const { authUser } = useAuthStore();

  useEffect(()=>{
    getTexts(selectedUser._id);
  },[selectedUser._id, getTexts]);

  if (isTextsLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <TextSkeleton />
        <TextInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
    <ChatHeader />
    <div>messagesssss</div>
    <TextInput />
  </div>
  )
}

export default ChatContainer