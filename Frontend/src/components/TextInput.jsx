import React, { useState, useRef } from 'react';
import { useChatStore } from '../store/useChatStore.js';
import toast from 'react-hot-toast';
import { Image, Send, X } from "lucide-react";

function TextInput() {

  const [text, setText] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const { sendText } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file.');
      setImagePreview(null); // Clear the preview if the file is not an image
      return;
    }

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  const removeImage = () => {
    setImagePreview(null);
    fileInputRef.current.value = null; // Clear the file input value
  }

  const handleSendText = async (e) => {
    e.preventDefault();
    if (text.trim() === '' && !imagePreview) return; // Don't send empty messages

    try {
      await sendText({
        text: text.trim(),
        image: imagePreview,
      });

      // Clear form
      setText("");
      setImagePreview(null);

      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
      toast.error("Failed to send message. Please try again.");
      // Clear form
      setText("");
      setImagePreview(null);
    }
  }

  return (
    <div className="p-4 w-full">
    {imagePreview && (
      <div className="mb-3 flex items-center gap-2">
        <div className="relative">
          <img src={imagePreview} alt="Preview" className="w-20 h-20 object-cover rounded-lg border border-zinc-700"/>
          <button onClick={removeImage} className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300 flex items-center justify-center" type="button">
            <X className="size-3" />
          </button>
        </div>
      </div>
    )}

    <form onSubmit={handleSendText} className="flex items-center gap-2">
      <div className="flex-1 flex gap-2">
        <input
          type="text"
          className="w-full input input-bordered rounded-lg input-sm sm:input-md"
          placeholder="Enter your text..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleImageChange}
        />

        <button type="button" className={`hidden sm:flex btn btn-circle ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`} onClick={() => fileInputRef.current?.click()}>
          <Image size={20} />
        </button>
      </div>
      <button type="submit" className="btn btn-sm btn-circle" disabled={!text.trim() && !imagePreview}>
        <Send size={22} />
      </button>
    </form>
  </div>
  )
}

export default TextInput;