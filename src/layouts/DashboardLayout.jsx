// src/layouts/DashboardLayout.jsx
import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col">
      {/* Top Navbar */}
      <Navbar onMenuClick={() => setSidebarOpen(true)} />

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main scroll container */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6 md:ml-64 pt-16">

          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;


// ================================
// HOW TO USE THIS LAYOUT
// ================================

// Example: Home.jsx
// ------------------
// import DashboardLayout from "../layouts/DashboardLayout";
//
// const Home = () => {
//   return (
//     <DashboardLayout>
//       <h1 className="text-2xl font-bold">Home</h1>
//       <p>Your content here</p>
//     </DashboardLayout>
//   );
// };
//
// export default Home;


// Example: QuestionsPage.jsx
// --------------------------
// import DashboardLayout from "../layouts/DashboardLayout";
//
// const QuestionsPage = () => {
//   return (
//     <DashboardLayout>
//       <h1 className="text-2xl font-bold mb-4">All Questions</h1>
//       <QuestionList />
//     </DashboardLayout>
//   );
// };
//
// export default QuestionsPage;
