import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore.js'
import { useAuthStore } from '../store/useAuthStore.js'
import TextInput from './TextInput.jsx'
import ChatHeader from './ChatHeader.jsx'
import TextSkeleton from './skeletons/TextSkeleton.jsx'
import { formatMessageTime } from '../lib/utils.js'

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
      
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {texts.map((text) => (
              <div key={text._id} className={`chat ${text.senderId === authUser._id ? "chat-end" : "chat-start"}`}>
                <div className=" chat-image avatar">
                  <div className="size-10 rounded-full border">
                    <img
                      src={text.senderId === authUser._id ? authUser.profilePic || "/avatar.png" : selectedUser.profilePic || "/avatar.png"}
                      alt="No Picture"
                    />
                  </div>
                </div>
                <div className="chat-header mb-1">
                  <time className="text-xs opacity-50 ml-1">
                    {formatMessageTime(text.createdAt)}
                  </time>
                </div>
                <div className="chat-bubble flex flex-col">
                  {text.image && (
                    <img src={text.image} alt="Attachment" className="sm:max-w-[200px] rounded-md mb-2"/>
                  )}
                  {text.text && <p>{text.text}</p>}
                </div>
              </div>
            ))}
        </div>


      <TextInput />
    </div>
  )
}

export default ChatContainer