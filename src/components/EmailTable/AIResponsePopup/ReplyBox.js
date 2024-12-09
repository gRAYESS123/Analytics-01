import React from 'react';
import { X, Wand2, Send } from 'lucide-react';

const ReplyBox = ({ email, replyContent, setReplyContent, onClose, onSend, onAIResponse }) => (
  <div className="p-4 bg-gray-50 border-t">
    <div className="flex justify-between items-center mb-2">
      <div className="text-sm text-gray-600">
        Replying to: {email.subject}
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onAIResponse(email)}
          className="text-blue-500 hover:text-blue-600 flex items-center space-x-1"
        >
          <Wand2 className="w-4 h-4" />
          <span>AI Suggest</span>
        </button>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
    <textarea
      value={replyContent}
      onChange={(e) => setReplyContent(e.target.value)}
      className="w-full p-2 border rounded-md mb-2 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Type your reply..."
    />
    <div className="flex justify-end space-x-2">
      <button
        onClick={onClose}
        className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
      >
        Cancel
      </button>
      <button
        onClick={() => onSend(email)}
        className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center space-x-1"
      >
        <Send className="w-4 h-4" />
        <span>Send Reply</span>
      </button>
    </div>
  </div>
);

export default ReplyBox;