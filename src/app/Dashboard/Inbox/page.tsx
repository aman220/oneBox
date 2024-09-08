"use client";

import { useState, useEffect } from "react";
import {
  ChevronDown,
  Search as SearchIcon,
  ArrowRight,
  MoreHorizontal,
  Mail,
  Send,
} from "lucide-react";
import Image from "next/image";
import draft from "../../../../public/drafts.svg";
import "./style.css";
import Replybox from "../Components/Replybox";
import DeletePopup from "../Components/DeletePopup";

interface Email {
  id: number;
  fromEmail: string;
  toEmail: string;
  subject: string;
  body: string;
  sentAt: string;
  isRead: boolean;
  cc: string[];
  threadId: string;
}


interface ReplyBoxProps {
  threadId: string;
}
const Page = () => {
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [emails, setEmails] = useState<Email[]>([]);
  const [threadMessages, setThreadMessages] = useState<Email[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [boxopen, setBoxOpen] = useState<boolean>(false);
  const [threadEmails, setThreadEmails] = useState<Email[]>([]);
  const [showAllReplies, setShowAllReplies] = useState<boolean>(false);
  const [threadId, setthreadId] = useState("");
  const [showDeletePopup, setShowDeletePopup] = useState<boolean>(false);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const response = await fetch(
          "https://hiring.reachinbox.xyz/api/v1/onebox/list",
          {
            method: "GET",
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        if (data.status === 200) {
          setEmails(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch emails", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmails();
  }, []);



  const fetchThreadMessages = async (threadId: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `https://hiring.reachinbox.xyz/api/v1/onebox/messages/${threadId}`,
        {
          method: "GET",
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (data.status === 200) {
        setThreadEmails(data.data); 
      }
    } catch (error) {
      console.error("Failed to fetch thread messages", error);
    }
  };
  const resetEmails = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        'https://hiring.reachinbox.xyz/api/v1/onebox/reset',
        {
          method: "GET",
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      alert(data.data);
    } catch (error) {
      console.error("Failed to fetch thread messages", error);
    }
  };

  useEffect(() => {

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'D') {
        setShowDeletePopup(true);
      } else if (event.key == 'E') {
        setBoxOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleEmailClick = (email: Email) => {
    setSelectedEmail(email);
    fetchThreadMessages(email.threadId);
    setthreadId(email.threadId);
    setShowAllReplies(false);
    setShowDeletePopup(false);
  };

  const handleViewAllReplies = () => {
    setShowAllReplies(true);
  };

  const handleDeletePopupOpen = () => setShowDeletePopup(true);
  const handleDeletePopupClose = () => setShowDeletePopup(false);

  const handleDelete = (threadId: string) => {
    setEmails(emails.filter(email => email.threadId !== threadId));
    setSelectedEmail(null);
  };

  function TimelineItem({ step, status, icon, iconBg }) {
    return (
      <div className="flex items-center">
        <div className="flex flex-col items-center mr-3 relative">
          <div className={`rounded-full p-1.5 ${iconBg}`}>
            {icon}
          </div>
          {step < 3 && <div className="w-px h-full bg-gray-700 absolute top-7" />}
        </div>
        <div>
          <h3 className="text-sm font-medium">Step {step}: Email</h3>
          <p className="text-sm mt-1 text-gray-400 flex items-center gap-1">
            {step === 1 ? <Send className="w-3 h-3" /> : <Mail className="w-3 h-3" />}
            {status}
          </p>
        </div>
      </div>
    )
  }



  return (
    <>
      <div className="flex h-full flex-row w-[-webkit-fill-available]">
        <div className="w-80 bg-[#1E1E1E] border-r border-[#2A2A2A] flex flex-col">
          <div className="p-4 border-b border-[#2A2A2A]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-xl">All Inbox(s)</span>
                <ChevronDown className="w-4 h-4" />
              </div>
              <SearchIcon className="w-4 h-4 text-gray-400" />
            </div>
            <div className="text-xs text-white mb-4">
              25/25 inboxes selected
            </div>
            <div className="relative mb-4">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="w-full bg-[#23272C] border-gray-700 pl-10 px-2 py-1 rounded-md placeholder:text-sm"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm">
                <span className="text-blue-500 bg-[#23272C] p-2 rounded-full">
                  26
                </span>
                <span className="text-sm">New Replies</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <span className="text-sm hover:cursor-pointer" onClick={()=>{resetEmails()}}>Reset</span>
                <ChevronDown className="w-5 h-5" />
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-full">
              <div className="loader">Loading...</div>
            </div>
          ) : (
            <div className="overflow-y-auto h-full max-h-[500px] no-scrollbar grow">
              {emails.map((email) => (
                <div
                  key={email.id}
                  className={`p-4 hover:bg-[#2A2A2A] cursor-pointer ${selectedEmail && selectedEmail.id === email.id
                    ? "bg-[#2A2A2A]"
                    : ""
                    }`}
                  onClick={() => handleEmailClick(email)}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex flex-row items-center">
                      <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                      <span className="font-semibold text-sm">
                        {email.fromEmail}
                      </span>
                    </div>
                    <span className="text-sm text-gray-400">
                      {new Date(email.sentAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="text-sm text-gray-400 mb-2">
                    {email.subject}
                  </div>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-2 py-0.5 rounded-full text-sm ${email.isRead
                        ? "bg-green-800 text-green-200"
                        : "bg-yellow-800 text-yellow-200"
                        }`}
                    >
                      {email.isRead ? "Read" : "Unread"}
                    </span>
                    <span className="text-[10px] text-gray-400">
                      Campaign Name
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Email Content */}
        <div className="flex-1 bg-[#121212] p-6 overflow-y-auto no-scrollbar">
          {selectedEmail ? (
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">
                  {selectedEmail.fromEmail}
                </h2>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 px-3 py-1 rounded-sm text-sm shadow-lg bg-[#23272C]">
                    <span className="w-2 h-2 bg-yellow-300 rounded-full"></span>
                    <span>Meeting Completed</span>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                  <div className="flex items-center space-x-2 px-3 py-1 rounded-sm text-sm shadow-lg bg-[#23272C]">
                    <span className="text-xs">Move</span>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                  <div className="flex items-center space-x-2 px-3 py-1 rounded-sm text-sm  bg-[#23272C]">
                    <MoreHorizontal className="w-5 h-5" />
                  </div>
                </div>
              </div>


              <div className="overflow-y-auto h-full">
                {!showAllReplies
                  ? threadEmails.slice(0, 1).map((email, index) => (
                    <div key={index} className="mb-6 bg-[#1E1E1E] p-4 rounded-lg ">
                      <div className="mb-4">
                        <article className="flex flex-row justify-between items-center">
                          <h3 className="text-lg font-semibold mb-2 text-white">
                            {email.subject}
                          </h3>
                          <h3 className="text-sm font-normal mb-2 text-gray-400">
                            {new Date(email.sentAt).toLocaleDateString()}
                          </h3>
                        </article>
                        <div className="text-xs text-gray-400 mb-4 flex flex-col gap-2">
                          <p>
                            from: {email.fromEmail} cc: {email.cc.join(", ")}
                          </p>
                          <p>to: {email.toEmail}</p>
                        </div>
                        <div className="p-4">
                          <div
                            className="text-sm text-gray-300"
                            dangerouslySetInnerHTML={{ __html: email.body }}
                          />
                        </div>
                      </div>
                    </div>
                  ))
                  : threadEmails.map((email, index) => (
                    <div key={index} className="mb-6 bg-[#1E1E1E] p-4 rounded-lg  ">
                      <div className="mb-4">
                        <article className="flex flex-row justify-between items-center">
                          <h3 className="text-lg font-semibold mb-2 text-white">
                            {email.subject}
                          </h3>
                          <h3 className="text-sm font-normal mb-2 text-gray-400">
                            {new Date(email.sentAt).toLocaleDateString()}
                          </h3>
                        </article>
                        <div className="text-xs text-gray-400 mb-4 flex flex-col gap-2">
                          <p>
                            from: {email.fromEmail} cc: {email.cc.join(", ")}
                          </p>
                          <p>to: {email.toEmail}</p>
                        </div>
                        <div className="p-4">
                          <div
                            className="text-sm text-gray-300"
                            dangerouslySetInnerHTML={{ __html: email.body }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              {!showAllReplies && threadEmails.length > 1 && (
                <div className="flex items-center justify-center my-4">
                  <div className="border-t border-gray-400 flex-grow"></div>
                  <button
                    className="text-white hover:cursor-pointer text-sm bg-[#171819] rounded-sm px-3 py-1"
                    onClick={handleViewAllReplies}
                  >
                    View all {threadEmails.length - 1} replies
                  </button>
                  <div className="border-t border-gray-400 flex-grow"></div>
                </div>
              )}

              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 text-sm"
                onClick={() => {
                  setBoxOpen(true);
                }}
              >
                <ArrowRight className="w-4 h-4" />
                <span>Reply</span>
              </button>
            </>
          ) : (
            <div className="flex justify-center items-center h-full text-gray-400">
              Select an email to view details
            </div>
          )}

          {boxopen ? <Replybox threadId={threadId} /> : null}
        </div>


        {/* Right Sidebar */}
        <div className="w-80 bg-[#1E1E1E] p-3 border-l border-[#2A2A2A] overflow-y-auto">
          <h3 className="text-md font-semibold mb-6 bg-[#23272C] p-2 rounded-lg">
            Lead Details
          </h3>
          <div className="space-y-4 text-sm mb-6">
            <div className="flex justify-between">
              <span className="text-gray-400">Name</span>
              <span>Orlando Acosta</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Company</span>
              <span>Multinational LLC</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Email</span>
              <span>orlando@multinational.com</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Source</span>
              <span>Email</span>
            </div>
          </div>
          <div className="space-y-4 mb-8 text-sm">
            <h3 className="text-md font-semibold mb-2 bg-[#23272C] p-2 rounded-lg">
              Recent Activity
            </h3>
            <div className=" text-white p-4 rounded-lg max-w-sm">
              <h2 className="text-lg font-semibold mb-1">Campaign Name</h2>
              <div className="flex justify-between text-sm text-gray-400 mb-3">
                <span>3 Steps</span>
                <span>5 Days in Sequence</span>
              </div>
              <div className="space-y-6 mt-2">
                <TimelineItem
                  step={1}
                  status="Sent 3rd, Feb"
                  icon={<Send className="w-3 h-3" />}
                  iconBg="bg-blue-500"
                />
                <TimelineItem
                  step={2}
                  status="Opened 5th, Feb"
                  icon={<Mail className="w-3 h-3" />}
                  iconBg="bg-yellow-500"
                />
                <TimelineItem
                  step={3}
                  status="Opened 5th, Feb"
                  icon={<Mail className="w-3 h-3" />}
                  iconBg="bg-yellow-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {showDeletePopup && selectedEmail && (
        <DeletePopup
          threadId={selectedEmail.threadId}
          onClose={handleDeletePopupClose}
          onDelete={handleDelete}
        />
      )}
    </>
  );
};

export default Page;
