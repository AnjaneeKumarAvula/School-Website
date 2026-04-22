import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";

import StudentInfoCard from "../components/StudentInfoCard";
import MarksTable from "../components/MarksTable";
import AttendanceTable from "../components/AttendanceTable";
import ContactTeacherSection from "../components/ContactTeacherSection";
import ParentReasoningBox from "../components/ParentReasoningBox";
import API from "../utils/api.js";

const ParentDashboard = () => {
  const [parentInfo, setParentInfo] = useState(null);
  const [studentInfo, setStudentInfo] = useState(null);
  const [marks, setMarks] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get parent info from localStorage
    const storedParentInfo = localStorage.getItem("parentInfo");
    if (storedParentInfo) {
      const parent = JSON.parse(storedParentInfo);
      setParentInfo(parent);
      fetchStudentData(parent.email);
    } else {
      // Fallback to fetching without email (demo data)
      fetchStudentData();
    }
  }, []);

  const fetchStudentData = async (email = null) => {
    try {
      setLoading(true);
      const emailParam = email ? `?email=${email}` : '';
      
      const detailsRes = await API.get(`/parent/student/details${emailParam}`);
      setStudentInfo(detailsRes.data);

      const marksRes = await API.get(`/parent/student/marks${emailParam}`);
      setMarks(marksRes.data);

      const attendanceRes = await API.get(`/parent/student/attendance${emailParam}`);
      setAttendance(attendanceRes.data);
    } catch (err) {
      console.error("Error fetching student data:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="p-6 text-center">
          <p className="text-lg text-gray-600">Loading student data...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="p-6 space-y-6">
        {/* Parent Info Header */}
        {parentInfo && (
          <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6 rounded-xl shadow-lg">
            <h1 className="text-3xl font-bold mb-2">Welcome, {parentInfo.parentName}!</h1>
            <p className="text-sm opacity-90">{parentInfo.email}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 1️⃣ Student Details */}
          {studentInfo && <StudentInfoCard info={studentInfo} />}

          {/* 2️⃣ Marks Table */}
          <MarksTable marks={marks} />

          {/* 3️⃣ Attendance Table */}
          <AttendanceTable attendance={attendance} />

          {/* 4️⃣ Contact Teacher */}
          <ContactTeacherSection />

          {/* 5️⃣ Messages from Teacher */}
          <ParentReasoningBox />
        </div>
      </div>
    </>
  );
};

export default ParentDashboard;
