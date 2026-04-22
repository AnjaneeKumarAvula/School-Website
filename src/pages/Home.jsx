import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 p-8">
      
      <h1 className="text-4xl font-bold text-blue-700 mb-12">
        DropShield Portal
      </h1>

      <div className="flex flex-wrap items-center justify-center gap-8 max-w-6xl">
        
        {/* ADMIN */}
        <div className="bg-white p-8 rounded-xl shadow-xl w-80 text-center border-2 border-blue-200 hover:border-blue-400 transition-all duration-200">
          <div className="mb-6">
            <div className="w-20 h-20 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Admin</h2>
            <p className="text-sm text-gray-500 mb-4">System Administration</p>
          </div>

          <Link
            to="/admin/dashboard"
            className="block bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md
                      hover:bg-blue-700 hover:scale-105 transition-all duration-200 font-semibold"
          >
            Access Dashboard
          </Link>
        </div>

        {/* PARENT */}
        <div className="bg-white p-8 rounded-xl shadow-xl w-80 text-center border-2 border-green-200 hover:border-green-400 transition-all duration-200">
          <div className="mb-6">
            <div className="w-20 h-20 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Parent</h2>
            <p className="text-sm text-gray-500 mb-4">Student Guardian Portal</p>
          </div>

          <Link
            to="/parent/login"
            className="block bg-green-600 text-white py-3 px-6 rounded-lg shadow-md
                      hover:bg-green-700 hover:scale-105 transition-all duration-200 font-semibold"
          >
            Login Here
          </Link>
        </div>

        {/* TEACHER */}
        <div className="bg-white p-8 rounded-xl shadow-xl w-80 text-center border-2 border-purple-200 hover:border-purple-400 transition-all duration-200">
          <div className="mb-6">
            <div className="w-20 h-20 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Teacher</h2>
            <p className="text-sm text-gray-500 mb-4">Educator Portal</p>
          </div>

          <Link
            to="/teacher/login"
            className="block bg-purple-600 text-white py-3 px-6 rounded-lg shadow-md
                      hover:bg-purple-700 hover:scale-105 transition-all duration-200 font-semibold"
          >
            Login Here
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Home;