 import { useEffect, useState } from "react";
import API from "../utils/api.js";

const TeacherReceivedMessagesBox = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    API.get("/teacher/messages")
      .then((res) => setMessages(res.data || []))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="bg-white p-5 rounded-xl shadow-md border">
      <h3 className="text-xl font-semibold text-blue-700 mb-3">
        Messages from Parents
      </h3>

      {messages.length === 0 && (
        <p className="text-gray-500 text-sm">No messages yet.</p>
      )}

      <ul className="space-y-3">
        {messages.map((msg, idx) => (
          <li
            key={idx}
            className="p-3 bg-blue-50 rounded-lg border shadow-sm hover:shadow-md transition-all"
          >
            {/* Roll Number */}
            <p className="text-gray-900 font-semibold text-sm">
              Roll No: {msg.rollNo}
            </p>

            {/* Message Content */}
            <p className="text-gray-700 text-sm mt-1">{msg.message}</p>

            {/* Timestamp */}
            <p className="text-xs text-right text-gray-500 mt-2">
              {msg.createdAt
                ? new Date(msg.createdAt).toLocaleString()
                : ""}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeacherReceivedMessagesBox;
