import { useEffect, useState } from "react";
import API from "../utils/api.js";

const ContactTeacherSection = () => {
  const [mentor, setMentor] = useState(null);
  const [mentorId, setMentorId] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMentor = async () => {
      try {
        const parentInfo = JSON.parse(localStorage.getItem("parentInfo") || "{}");
        if (!parentInfo.email) return;

        // Get student details to find mentor name
        const studentRes = await API.get(`/parent/student/details?email=${parentInfo.email}`);
        const mentorName = studentRes.data?.mentorName;

        if (mentorName) {
          // Get all teachers and find the one matching mentor name
          const teachersRes = await API.get("/teachers/list");
          const assignedMentor = teachersRes.data?.find(t => t.name === mentorName);
          
          if (assignedMentor) {
            setMentor(assignedMentor);
            setMentorId(assignedMentor._id);
          }
        }
      } catch (err) {
        console.error("Error fetching mentor:", err);
      }
    };

    fetchMentor();
  }, []);

  const handleSend = async () => {
    if (!mentorId || !message.trim()) {
      setStatus("Please enter a message.");
      return;
    }

    setLoading(true);
    setStatus("");

    try {
      const parentInfo = JSON.parse(localStorage.getItem("parentInfo") || "{}");
      await API.post("/parent/message/send", {
        teacherId: mentorId,
        message,
        parentEmail: parentInfo.email,
      });
      setStatus("Message sent successfully.");
      setMessage("");
    } catch (err) {
      console.error(err);
      setStatus("Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow-md border">
      <h3 className="text-xl font-semibold text-blue-700 mb-3">
        Contact Mentor
      </h3>

      {mentor ? (
        <div className="mb-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-gray-600">Your Assigned Mentor:</p>
          <p className="text-lg font-semibold text-blue-700">
            {mentor.name} ({mentor.subject})
          </p>
        </div>
      ) : (
        <div className="mb-3 p-3 bg-gray-50 rounded-lg border">
          <p className="text-sm text-gray-500">Loading mentor information...</p>
        </div>
      )}

      <textarea
        className="w-full h-24 border rounded-lg p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Write your message to the mentor..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button
        onClick={handleSend}
        disabled={loading || !mentor}
        className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md
                   hover:bg-blue-700 hover:scale-105 transition-all duration-200
                   disabled:opacity-60 disabled:hover:scale-100"
      >
        {loading ? "Sending..." : "Send Message"}
      </button>

      {status && <p className="mt-2 text-sm text-gray-600">{status}</p>}
    </div>
  );
};

export default ContactTeacherSection;
