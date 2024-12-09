import React, { useState, useMemo } from 'react';
import { format } from 'date-fns';
import { ChevronRight, ChevronDown, Mail, Reply } from 'lucide-react';
import AIResponsePopup from './AIResponsePopup/AIResponsePopup';
import ReplyBox from './AIResponsePopup/ReplyBox';

const EmailTable = ({ data = [] }) => {
 const [expandedThreads, setExpandedThreads] = useState(new Set());
 const [replyingToThread, setReplyingToThread] = useState(null);
 const [replyContents, setReplyContents] = useState({});
 const [showAIPopup, setShowAIPopup] = useState(false);
 const [selectedEmail, setSelectedEmail] = useState(null);
 const [selectedThread, setSelectedThread] = useState(null);

 const threadedEmails = useMemo(() => {
   const threads = data.reduce((acc, email) => {
     const threadId = email.subject.replace(/^Re:\s*/i, '').trim();
     if (!acc[threadId]) {
       acc[threadId] = [];
     }
     acc[threadId].push(email);
     return acc;
   }, {});

   Object.values(threads).forEach(thread => {
     thread.sort((a, b) => new Date(a.date) - new Date(b.date));
   });

   return Object.fromEntries(
     Object.entries(threads).sort(([,a], [,b]) => {
       return new Date(b[b.length - 1].date) - new Date(a[a.length - 1].date);
     })
   );
 }, [data]);

 const toggleThread = (threadId) => {
   setExpandedThreads(prev => {
     const newSet = new Set(prev);
     if (prev.has(threadId)) {
       newSet.delete(threadId);
     } else {
       newSet.add(threadId);
     }
     return newSet;
   });
 };

 const handleReply = (email, threadId) => {
   setReplyingToThread(threadId);
   setSelectedThread(threadId);
   if (!replyContents[threadId]) {
     setReplyContents(prev => ({ ...prev, [threadId]: '' }));
   }
 };

 const handleAIResponse = (email, threadId) => {
   setSelectedEmail(email);
   setSelectedThread(threadId);
   setShowAIPopup(true);
 };

 const sendReply = (email) => {
   console.log('Sending reply:', {
     threadId: selectedThread,
     inReplyTo: email.id,
     content: replyContents[selectedThread],
     sender: 'Support Team'
   });
   closeReply();
 };

 const closeReply = () => {
   setReplyingToThread(null);
   setSelectedThread(null);
 };

 const getSentimentColor = (sentiment) => {
   if (sentiment >= 0.5) return 'bg-green-100 text-green-800';
   if (sentiment >= 0) return 'bg-yellow-100 text-yellow-800';
   return 'bg-red-100 text-red-800';
 };

 const getUrgencyColor = (urgency) => {
   switch (urgency?.toLowerCase()) {
     case 'high': return 'bg-red-100 text-red-800';
     case 'medium': return 'bg-yellow-100 text-yellow-800';
     case 'low': return 'bg-green-100 text-green-800';
     default: return 'bg-gray-100 text-gray-800';
   }
 };

 return (
   <div className="overflow-hidden">
     <div className="space-y-4">
       {Object.entries(threadedEmails).map(([threadId, emails]) => {
         const latestEmail = emails[emails.length - 1];
         const canReply = latestEmail.sender !== 'Support Team';

         return (
           <div key={threadId} className="border rounded-lg bg-white overflow-hidden">
             <div
               className="flex items-center p-4 bg-gray-50 cursor-pointer hover:bg-gray-100"
               onClick={() => toggleThread(threadId)}
             >
               {expandedThreads.has(threadId) ? 
                 <ChevronDown className="w-5 h-5 mr-2" /> : 
                 <ChevronRight className="w-5 h-5 mr-2" />
               }
               <Mail className="w-5 h-5 mr-2" />
               <div className="flex-1">
                 <span className="font-medium">{threadId}</span>
                 <span className="ml-2 text-gray-500">({emails.length} messages)</span>
               </div>
             </div>

             {expandedThreads.has(threadId) && (
               <div className="divide-y">
                 {emails.map((email, index) => {
                   const isSupport = email.sender === 'Support Team';
                   const isLatestEmail = index === emails.length - 1;
                   
                   return (
                     <div 
                       key={index} 
                       className={`p-4 ${isSupport ? 'bg-blue-50 ml-8' : 'bg-white'}`}
                     >
                       <div className="flex items-center justify-between mb-2">
                         <div className="flex items-center space-x-4">
                           <span className={`font-medium ${isSupport ? 'text-blue-600' : ''}`}>
                             {email.sender}
                           </span>
                           <span className={`px-2 py-1 rounded-full text-xs ${getUrgencyColor(email.urgency)}`}>
                             {email.urgency}
                           </span>
                           <span className={`px-2 py-1 rounded-full text-xs ${getSentimentColor(email.sentiment)}`}>
                             Sentiment: {email.sentiment.toFixed(2)}
                           </span>
                           {isLatestEmail && !isSupport && (
                             <button
                               onClick={(e) => {
                                 e.stopPropagation();
                                 handleReply(email, threadId);
                               }}
                               className="text-gray-500 hover:text-blue-500 flex items-center space-x-1"
                             >
                               <Reply className="w-4 h-4" />
                               <span>Reply</span>
                             </button>
                           )}
                         </div>
                         <span className="text-sm text-gray-500">
                           {format(new Date(email.date), 'MMM dd, yyyy HH:mm')}
                         </span>
                       </div>

                       <div className="whitespace-pre-wrap text-sm text-gray-700 pl-4">
                         {email.body || email.content}
                       </div>
                     </div>
                   );
                 })}

                 {replyingToThread === threadId && (
                   <ReplyBox 
                     email={emails[emails.length - 1]}
                     replyContent={replyContents[threadId] || ''}
                     setReplyContent={(content) => setReplyContents(prev => ({
                       ...prev,
                       [threadId]: content
                     }))}
                     onClose={closeReply}
                     onSend={sendReply}
                     onAIResponse={(email) => handleAIResponse(email, threadId)}
                   />
                 )}
               </div>
             )}
           </div>
         );
       })}
     </div>

     <AIResponsePopup
       isOpen={showAIPopup}
       onClose={() => setShowAIPopup(false)}
       email={selectedEmail}
       onSelectResponse={(response) => {
         setReplyContents(prev => ({
           ...prev,
           [selectedThread]: response
         }));
         setShowAIPopup(false);
       }}
     />
   </div>
 );
};

export default EmailTable;