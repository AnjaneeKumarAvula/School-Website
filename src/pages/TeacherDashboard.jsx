import { useState, useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import TeacherComplaintReplyBox from "../components/TeacherComplaintReplyBox.jsx";
import TeacherReceivedMessagesBox from "../components/TeacherReceivedMessagesBox.jsx";
import API from "../utils/api.js";

const TeacherDashboard = () => {
  const [teacherInfo, setTeacherInfo] = useState(null);
  const [mentees, setMentees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Get teacher info from localStorage
    const storedTeacherInfo = localStorage.getItem("teacherInfo");
    if (storedTeacherInfo) {
      const teacher = JSON.parse(storedTeacherInfo);
      setTeacherInfo(teacher);
      fetchMentees(teacher.email);
    } else {
      setError("Please login first");
      setLoading(false);
    }
  }, []);

  const fetchMentees = async (email) => {
    try {
      const res = await API.get(`/teacher/mentees?email=${email}`);
      setMentees(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching mentees:", err);
      setError("Error loading mentees data");
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar role="teacher" />

      <div className="p-6 space-y-6">
        {/* Teacher Info Header */}
        {teacherInfo && (
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-xl shadow-lg">
            <h1 className="text-3xl font-bold mb-2">Welcome, {teacherInfo.name}!</h1>
            <p className="text-lg">Subject: {teacherInfo.subject}</p>
            <p className="text-sm opacity-90">{teacherInfo.email}</p>
          </div>
        )}

        {/* Mentees Section */}
        <div className="bg-white p-6 rounded-xl shadow-md border-2 border-blue-200">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">My Mentees</h2>
          
          {loading && <p className="text-gray-600">Loading mentees...</p>}
          {error && <p className="text-red-600">{error}</p>}
          
          {!loading && !error && mentees.length === 0 && (
            <p className="text-gray-600">No mentees assigned yet.</p>
          )}

          {!loading && !error && mentees.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="border border-blue-300 px-3 py-2 text-left">Roll No</th>
                    <th className="border border-blue-300 px-3 py-2 text-left">Name</th>
                    <th className="border border-blue-300 px-3 py-2 text-left">Class</th>
                    <th className="border border-blue-300 px-3 py-2 text-left">Parent</th>
                    <th className="border border-blue-300 px-3 py-2 text-left">Attendance %</th>
                    <th className="border border-blue-300 px-3 py-2 text-left">Academic Marks</th>
                  </tr>
                </thead>
                <tbody>
                  {mentees.map((mentee) => (
                    <tr key={mentee._id} className="hover:bg-blue-50">
                      <td className="border border-blue-300 px-3 py-2">{mentee.rollNo}</td>
                      <td className="border border-blue-300 px-3 py-2 font-semibold">{mentee.name}</td>
                      <td className="border border-blue-300 px-3 py-2">{mentee.className}</td>
                      <td className="border border-blue-300 px-3 py-2">{mentee.parentName}</td>
                      <td className="border border-blue-300 px-3 py-2">
                        <span className={`font-bold ${
                          mentee.attendancePercentage >= 75 ? "text-green-600" : "text-red-600"
                        }`}>
                          {mentee.attendancePercentage}%
                        </span>
                        <div className="text-xs text-gray-600">
                          P: {mentee.presentDays} | A: {mentee.absentDays}
                        </div>
                      </td>
                      <td className="border border-blue-300 px-3 py-2">
                        {mentee.marks && mentee.marks.length > 0 ? (
                          <div className="space-y-1">
                            {mentee.marks.map((mark, idx) => (
                              <div key={idx} className="text-xs">
                                <span className="font-semibold">{mark.subject}:</span> {mark.obtained}/{mark.total}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <span className="text-gray-400">No marks yet</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Messages Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Teacher Sends Reply to Parent */}
          <TeacherComplaintReplyBox />

          {/* Teacher Receives Messages from Parents */}
          <TeacherReceivedMessagesBox />
        </div>
      </div>
    </>
  );
};

export default TeacherDashboard;
