import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import API from "../utils/api.js";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("teacher");
  const [credentials, setCredentials] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);

  // Teacher form state
  const [teacherForm, setTeacherForm] = useState({
    name: "",
    email: "",
    subject: "",
    password: "",
  });

  // Student form state (now includes parent fields)
  const [studentForm, setStudentForm] = useState({
    name: "",
    rollNo: "",
    className: "",
    parentName: "",
    parentEmail: "",
    parentPassword: "",
    mentorEmail: "",
  });

  // Attendance form state
  const [attendanceForm, setAttendanceForm] = useState({
    rollNo: "",
    date: "",
    status: "Present",
  });

  // Marks form state
  const [marksForm, setMarksForm] = useState({
    rollNo: "",
    subject: "",
    obtained: "",
    total: "",
  });

  // Fetch students and teachers on mount
  useEffect(() => {
    fetchStudents();
    fetchTeachers();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await API.get("/admin/students");
      setStudents(res.data);
    } catch (err) {
      console.error("Error fetching students:", err);
    }
  };

  const fetchTeachers = async () => {
    try {
      const res = await API.get("/admin/teachers");
      setTeachers(res.data);
    } catch (err) {
      console.error("Error fetching teachers:", err);
    }
  };

  // Handle Teacher form submission
  const handleAddTeacher = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setMessage("");
      const res = await API.post("/admin/add-teacher", teacherForm);
      setMessage(res.data.message);
      setCredentials({
        type: "Teacher",
        email: res.data.credentials.email,
        password: res.data.credentials.password,
      });
      setTeacherForm({ name: "", email: "", subject: "", password: "" });
      fetchTeachers(); // Refresh teacher list
    } catch (err) {
      setError(err.response?.data?.message || "Error adding teacher");
    }
  };

  // Handle Student form submission (now creates both student and parent)
  const handleAddStudent = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setMessage("");
      const res = await API.post("/admin/add-student", studentForm);
      setMessage(res.data.message);
      setCredentials({
        type: "Parent",
        email: res.data.parentCredentials.email,
        password: res.data.parentCredentials.password,
      });
      setStudentForm({
        name: "",
        rollNo: "",
        className: "",
        parentName: "",
        parentEmail: "",
        parentPassword: "",
        mentorEmail: "",
      });
      fetchStudents(); // Refresh student list
    } catch (err) {
      setError(err.response?.data?.message || "Error adding student");
    }
  };

  // Handle Attendance submission
  const handleMarkAttendance = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setMessage("");
      const res = await API.post("/admin/mark-attendance", attendanceForm);
      setMessage(res.data.message);
      setAttendanceForm({ rollNo: "", date: "", status: "Present" });
      fetchStudents(); // Refresh student list
    } catch (err) {
      setError(err.response?.data?.message || "Error marking attendance");
    }
  };

  // Handle Marks submission
  const handleAddMarks = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setMessage("");
      const res = await API.post("/admin/add-marks", {
        ...marksForm,
        obtained: parseInt(marksForm.obtained),
        total: parseInt(marksForm.total),
      });
      setMessage(res.data.message);
      setMarksForm({ rollNo: "", subject: "", obtained: "", total: "" });
      fetchStudents(); // Refresh student list
    } catch (err) {
      setError(err.response?.data?.message || "Error adding marks");
    }
  };

  return (
    <>
      <Navbar role="admin" />

      <div className="p-10 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-700 mb-8">
          Admin Dashboard - Manage Users & Records
        </h1>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8 border-b">
          <button
            onClick={() => setActiveTab("teacher")}
            className={`px-6 py-3 font-semibold transition-all ${
              activeTab === "teacher"
                ? "border-b-4 border-blue-600 text-blue-600"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            Add Teacher
          </button>
          <button
            onClick={() => setActiveTab("student")}
            className={`px-6 py-3 font-semibold transition-all ${
              activeTab === "student"
                ? "border-b-4 border-purple-600 text-purple-600"
                : "text-gray-600 hover:text-purple-600"
            }`}
          >
            Add Student
          </button>
          <button
            onClick={() => setActiveTab("attendance")}
            className={`px-6 py-3 font-semibold transition-all ${
              activeTab === "attendance"
                ? "border-b-4 border-orange-600 text-orange-600"
                : "text-gray-600 hover:text-orange-600"
            }`}
          >
            Mark Attendance
          </button>
          <button
            onClick={() => setActiveTab("marks")}
            className={`px-6 py-3 font-semibold transition-all ${
              activeTab === "marks"
                ? "border-b-4 border-red-600 text-red-600"
                : "text-gray-600 hover:text-red-600"
            }`}
          >
            Add Marks
          </button>
        </div>

        {/* Messages */}
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        {message && (
          <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
            {message}
          </div>
        )}

        {/* Credentials Display */}
        {credentials && (
          <div className="mb-6 p-6 bg-yellow-50 border-2 border-yellow-400 rounded-lg">
            <h3 className="text-lg font-bold text-yellow-800 mb-3">
              📋 {credentials.type} Credentials
            </h3>
            <p className="text-gray-700 mb-2">
              <strong>Email:</strong> <code className="bg-yellow-100 px-2 py-1 rounded">{credentials.email}</code>
            </p>
            <p className="text-gray-700">
              <strong>Password:</strong> <code className="bg-yellow-100 px-2 py-1 rounded">{credentials.password}</code>
            </p>
            <p className="text-sm text-yellow-700 mt-3">
              ⚠️ Share these credentials with the {credentials.type.toLowerCase()} only
            </p>
          </div>
        )}

        {/* Teacher Form */}
        {activeTab === "teacher" && (
          <div className="bg-white p-8 rounded-xl shadow-md border-2 border-blue-200">
            <h2 className="text-2xl font-bold text-blue-700 mb-6">Add New Teacher</h2>
            <form onSubmit={handleAddTeacher} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Teacher Name"
                  value={teacherForm.name}
                  onChange={(e) => setTeacherForm({ ...teacherForm, name: e.target.value })}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={teacherForm.email}
                  onChange={(e) => setTeacherForm({ ...teacherForm, email: e.target.value })}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Subject"
                  value={teacherForm.subject}
                  onChange={(e) => setTeacherForm({ ...teacherForm, subject: e.target.value })}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={teacherForm.password}
                  onChange={(e) => setTeacherForm({ ...teacherForm, password: e.target.value })}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all"
              >
                Add Teacher
              </button>
            </form>

            {/* Teachers List */}
            {teachers.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-bold text-blue-700 mb-4">All Teachers</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-blue-100">
                        <th className="border border-blue-300 px-4 py-2 text-left">Name</th>
                        <th className="border border-blue-300 px-4 py-2 text-left">Email</th>
                        <th className="border border-blue-300 px-4 py-2 text-left">Subject</th>
                      </tr>
                    </thead>
                    <tbody>
                      {teachers.map((teacher) => (
                        <tr key={teacher._id} className="hover:bg-blue-50">
                          <td className="border border-blue-300 px-4 py-2">{teacher.name}</td>
                          <td className="border border-blue-300 px-4 py-2">{teacher.email}</td>
                          <td className="border border-blue-300 px-4 py-2">{teacher.subject || "N/A"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Student Form */}
        {activeTab === "student" && (
          <div className="bg-white p-8 rounded-xl shadow-md border-2 border-purple-200">
            <h2 className="text-2xl font-bold text-purple-700 mb-6">Add New Student & Parent</h2>
            <form onSubmit={handleAddStudent} className="space-y-6">
              {/* Student Information */}
              <div className="border-b pb-4">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Student Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Student Name"
                    value={studentForm.name}
                    onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Roll Number"
                    value={studentForm.rollNo}
                    onChange={(e) => setStudentForm({ ...studentForm, rollNo: e.target.value })}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <input
                    type="text"
                    placeholder="Class Name"
                    value={studentForm.className}
                    onChange={(e) => setStudentForm({ ...studentForm, className: e.target.value })}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Select Mentor (Teacher)
                    </label>
                    <select
                      value={studentForm.mentorEmail}
                      onChange={(e) => setStudentForm({ ...studentForm, mentorEmail: e.target.value })}
                      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    >
                      <option value="">Choose Teacher...</option>
                      {teachers.map((teacher) => (
                        <option key={teacher._id} value={teacher.email}>
                          {teacher.name} ({teacher.subject})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Parent Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Parent Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Parent Name"
                    value={studentForm.parentName}
                    onChange={(e) => setStudentForm({ ...studentForm, parentName: e.target.value })}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Parent Email"
                    value={studentForm.parentEmail}
                    onChange={(e) => setStudentForm({ ...studentForm, parentEmail: e.target.value })}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-4">
                  <input
                    type="password"
                    placeholder="Parent Password"
                    value={studentForm.parentPassword}
                    onChange={(e) => setStudentForm({ ...studentForm, parentPassword: e.target.value })}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-all"
              >
                Create Student & Parent
              </button>
            </form>

            {/* Students List */}
            {students.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-bold text-purple-700 mb-4">All Students</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="bg-purple-100">
                        <th className="border border-purple-300 px-3 py-2 text-left">Student Name</th>
                        <th className="border border-purple-300 px-3 py-2 text-left">Roll No</th>
                        <th className="border border-purple-300 px-3 py-2 text-left">Class</th>
                        <th className="border border-purple-300 px-3 py-2 text-left">Mentor</th>
                        <th className="border border-purple-300 px-3 py-2 text-left">Parent Name</th>
                        <th className="border border-purple-300 px-3 py-2 text-left">Parent Email</th>
                        <th className="border border-purple-300 px-3 py-2 text-left">Parent Password</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((student) => (
                        <tr key={student._id} className="hover:bg-purple-50">
                          <td className="border border-purple-300 px-3 py-2">{student.name}</td>
                          <td className="border border-purple-300 px-3 py-2">{student.rollNo}</td>
                          <td className="border border-purple-300 px-3 py-2">{student.className}</td>
                          <td className="border border-purple-300 px-3 py-2">{student.mentorName}</td>
                          <td className="border border-purple-300 px-3 py-2">{student.parentName}</td>
                          <td className="border border-purple-300 px-3 py-2">{student.parentEmail || "N/A"}</td>
                          <td className="border border-purple-300 px-3 py-2">{student.parentPassword || "N/A"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Attendance Form */}
        {activeTab === "attendance" && (
          <div className="bg-white p-8 rounded-xl shadow-md border-2 border-orange-200">
            <h2 className="text-2xl font-bold text-orange-700 mb-6">Mark Attendance</h2>
            <form onSubmit={handleMarkAttendance} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Select Student
                  </label>
                  <select
                    value={attendanceForm.rollNo}
                    onChange={(e) => setAttendanceForm({ ...attendanceForm, rollNo: e.target.value })}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  >
                    <option value="">Choose Student...</option>
                    {students.map((student) => (
                      <option key={student._id} value={student.rollNo}>
                        {student.name} ({student.rollNo})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    value={attendanceForm.date}
                    onChange={(e) => setAttendanceForm({ ...attendanceForm, date: e.target.value })}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={attendanceForm.status}
                    onChange={(e) => setAttendanceForm({ ...attendanceForm, status: e.target.value })}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-all"
              >
                Mark Attendance
              </button>
            </form>
          </div>
        )}

        {/* Marks Form */}
        {activeTab === "marks" && (
          <div className="bg-white p-8 rounded-xl shadow-md border-2 border-red-200">
            <h2 className="text-2xl font-bold text-red-700 mb-6">Add Student Marks</h2>
            <form onSubmit={handleAddMarks} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Select Student
                  </label>
                  <select
                    value={marksForm.rollNo}
                    onChange={(e) => setMarksForm({ ...marksForm, rollNo: e.target.value })}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  >
                    <option value="">Choose Student...</option>
                    {students.map((student) => (
                      <option key={student._id} value={student.rollNo}>
                        {student.name} ({student.rollNo})
                      </option>
                    ))}
                  </select>
                </div>
                <input
                  type="text"
                  placeholder="Subject Name"
                  value={marksForm.subject}
                  onChange={(e) => setMarksForm({ ...marksForm, subject: e.target.value })}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="number"
                  placeholder="Marks Obtained"
                  value={marksForm.obtained}
                  onChange={(e) => setMarksForm({ ...marksForm, obtained: e.target.value })}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                  min="0"
                />
                <input
                  type="number"
                  placeholder="Total Marks"
                  value={marksForm.total}
                  onChange={(e) => setMarksForm({ ...marksForm, total: e.target.value })}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                  min="0"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-all"
              >
                Add Marks
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminDashboard;