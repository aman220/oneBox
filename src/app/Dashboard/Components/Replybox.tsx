import React, { useState } from 'react';
import { X, Zap, Eye, Type, Link, Smile, Users, Code } from "lucide-react";
interface pops {
  threadId: string,
}

const Replybox: React.FC<pops> = ({ threadId }) => {
  const [to, setTo] = useState("jeanne@icloud.com");
  const [from, setFrom] = useState("peter@reachinbox.com");
  const [fromName, setFromName] = useState("Peter");
  const [subject, setSubject] = useState("Warmup Welcome");
  const [emailBody, setEmailBody] = useState("Hi Jeanne,\n\n");

  const [references, setReferences] = useState([
    "<dea5a0c2-336f-1dc3-4994-191a0ad3891a@gmail.com>"
  ]);

  const handleSendEmail = async () => {
    const requestBody = {
      toName: "Jeanne",
      to: to,
      from: from,
      fromName: fromName,
      subject: subject,
      body: `<p>${emailBody}</p>`,
      references: references,
      inReplyTo: references[0]
    };

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://hiring.reachinbox.xyz/api/v1/onebox/reply/${threadId}`, {
        method: 'POST',
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        console.log("Email sent successfully!");
      } else {
        console.error("Error sending email");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <>
      <div className="space-y-4 p-3">
        <div className="flex items-center">
          <span className="w-16 text-gray-400">To:</span>
          <input
            type="email"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="bg-transparent flex-grow outline-none"
          />
        </div>
        <div className="flex items-center">
          <span className="w-16 text-gray-400">From:</span>
          <input
            type="email"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="bg-transparent flex-grow outline-none"
          />
        </div>
        <div className="flex items-center">
          <span className="w-16 text-gray-400">Subject:</span>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="bg-transparent flex-grow outline-none"
          />
        </div>
        <div className="border-t border-gray-700 pt-4">
          <textarea
            value={emailBody}
            onChange={(e) => setEmailBody(e.target.value)}
            placeholder="Hi Jeanne,"
            className="w-full bg-transparent outline-none resize-none h-40"
          />
        </div>
      </div>
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700 p-2">
        <div className="flex space-x-2">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center"
            onClick={handleSendEmail}
          >
            Send
            <span className="ml-1">▼</span>
          </button>
          <button className="text-gray-400 hover:text-gray-200 p-2">
            <Zap size={20} />
          </button>
          <button className="text-gray-400 hover:text-gray-200 p-2">
            <Eye size={20} />
          </button>
        </div>
        <div className="flex space-x-2">
          <button className="text-gray-400 hover:text-gray-200 p-2">
            <Type size={20} />
          </button>
          <button className="text-gray-400 hover:text-gray-200 p-2">
            <Link size={20} />
          </button>
          <button className="text-gray-400 hover:text-gray-200 p-2">
            <Smile size={20} />
          </button>
          <button className="text-gray-400 hover:text-gray-200 p-2">
            <Users size={20} />
          </button>
          <button className="text-gray-400 hover:text-gray-200 p-2">
            <Code size={20} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Replybox;
