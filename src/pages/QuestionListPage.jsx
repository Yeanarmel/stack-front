import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import QuestionList from "../components/QuestionList";
import TopUsers from "../components/TopUsers";
import PopularTags from "../components/PopularTags";
import { Link } from "react-router-dom";

const QuestionsPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <Navbar onMenuClick={() => setSidebarOpen(true)} />

      <div className="flex flex-1 relative">
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main content */}
        <main className="flex-1 px-4 py-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                All Questions
              </h1>
              <p className="text-sm text-gray-500">
                Browse questions asked by the developer community
              </p>
            </div>

            <Link to={"/ask"}>
              <button className="hidden sm:inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-indigo-700">
                Ask Question
              </button>
            </Link>
          </div>

          {/* Filters */}
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <button className="rounded-full bg-blue-700 px-4 py-1.5 text-sm text-white">
              Newest
            </button>
            <button className="rounded-full bg-white px-4 py-1.5 text-sm text-gray-600 border hover:bg-gray-100">
              Active
            </button>
            <button className="rounded-full bg-white px-4 py-1.5 text-sm text-gray-600 border hover:bg-gray-100">
              Unanswered
            </button>
            <button className="rounded-full bg-white px-4 py-1.5 text-sm text-gray-600 border hover:bg-gray-100">
              Most Votes
            </button>
          </div>

          {/* Content grid */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Questions */}
            <section className="xl:col-span-3 space-y-4">
              <QuestionList />
            </section>

            {/* Right sidebar */}
            <aside className="hidden xl:flex xl:flex-col space-y-6">
              <TopUsers />
              <PopularTags />
            </aside>
          </div>
        </main>
      </div>

      {/* Mobile Ask Button */}
      <button className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-blue-700 text-white shadow-lg sm:hidden">
        +
      </button>
    </div>
  );
};

export default QuestionsPage;