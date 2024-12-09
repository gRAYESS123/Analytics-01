import React, { useState, useEffect } from 'react';
import { Wand2, Copy, RefreshCw, X } from 'lucide-react';
import { generateResponse } from '../../Services/llmService';

const AIResponsePopup = ({ isOpen, onClose, email, onSelectResponse }) => {
 const [loading, setLoading] = useState(false);
 const [suggestions, setSuggestions] = useState([]);

 const generateNewResponses = async () => {
   setLoading(true);
   try {
     const responses = await generateResponse(
       email.body || email.content,
       email.sentiment,
       email.urgency
     );
     setSuggestions(responses);
   } catch (error) {
     console.error('Error generating responses:', error);
     setSuggestions([
       "I understand your concern and will help resolve this immediately...",
       "Thank you for bringing this to our attention. Let me assist you..."
     ]);
   } finally {
     setLoading(false);
   }
 };

 useEffect(() => {
   if (isOpen && email) {
     generateNewResponses();
   }
 }, [isOpen, email]);

 const copyToClipboard = (text) => {
   navigator.clipboard.writeText(text);
 };

 if (!isOpen) return null;

 return (
   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={onClose}>
     <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden" onClick={e => e.stopPropagation()}>
       <div className="p-4 border-b flex justify-between items-center">
         <div className="flex items-center space-x-2">
           <Wand2 className="w-5 h-5 text-blue-500" />
           <h2 className="text-lg font-semibold">AI Response Suggestions</h2>
         </div>
         <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
           <X className="w-5 h-5" />
         </button>
       </div>
       
       <div className="p-4 bg-gray-50 border-b">
         <div className="font-medium">Original Email:</div>
         <div className="mt-2 text-sm text-gray-600">
           <div>From: {email?.sender}</div>
           <div>Subject: {email?.subject}</div>
           <div className="mt-2 whitespace-pre-wrap">{email?.body || email?.content}</div>
         </div>
       </div>

       <div className="p-4 space-y-4 overflow-y-auto max-h-[50vh]">
         {loading ? (
           <div className="flex justify-center items-center py-8">
             <RefreshCw className="w-6 h-6 animate-spin text-blue-500" />
           </div>
         ) : (
           suggestions.map((suggestion, index) => (
             <div key={index} className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow">
               <div className="text-sm text-gray-700 mb-3">{suggestion}</div>
               <div className="flex justify-end space-x-2">
                 <button
                   onClick={() => copyToClipboard(suggestion)}
                   className="text-gray-500 hover:text-gray-700 flex items-center space-x-1 text-sm"
                 >
                   <Copy className="w-4 h-4" />
                   <span>Copy</span>
                 </button>
                 <button
                   onClick={() => onSelectResponse(suggestion)}
                   className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                 >
                   Use This Response
                 </button>
               </div>
             </div>
           ))
         )}
       </div>

       <div className="p-4 border-t bg-gray-50 flex justify-end">
         <button
           onClick={generateNewResponses}
           disabled={loading}
           className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
         >
           <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
           <span>Generate New Responses</span>
         </button>
       </div>
     </div>
   </div>
 );
};

export default AIResponsePopup;