import QuestionList from "../components/QuestionList";
import TopUsers from "../components/TopUsers";
import PopularTags from "../components/PopularTags";
import { Link } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";

const Home = () => {
  return (
    <DashboardLayout>
      <div className="h-screen flex flex-col">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                Recent Questions
              </h2>

              <Link to={"/ask"}>
                <button className="hidden sm:inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-indigo-700">
                  Ask Question
                </button>
              </Link>
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

        {/* Mobile Ask Button */}
        <Link to={"/ask"}>
            {/* Mobile Ask Button */}
            <button className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-blue-700 text-white shadow-lg sm:hidden">
              +
            </button>
        </Link>
      </div>
    </DashboardLayout>
  );
};

export default Home;
