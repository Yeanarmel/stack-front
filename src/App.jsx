import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyCode from "./pages/VerifyCode";
import ChangePassword from "./pages/ChangePassword";
import AskQuestion from "./pages/AskQuestionPage";

// NEW PAGES
import QuestionListPage from "./pages/QuestionListPage";
import QuestionDetailsPage from "./pages/QuestionDetailsPage";
import SearchResultsPage from "./pages/SearchResultsPage";
import TagsPage from "./pages/TagsPage";
import UserProfilePage from "./pages/UserProfilePage";
import HomePage from "./pages/HomePage"
import LeaderboardPage from "./pages/LeaderboardPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* AUTH PAGES */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<HomePage />}/>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-code" element={<VerifyCode />} />
        <Route path="/change-password" element={<ChangePassword />} />

        {/* STACK OVERFLOW PAGES */}
        <Route path="/ask" element={<AskQuestion />} />
        <Route path="/questions" element={<QuestionListPage />} />
        <Route path="/questions/:id" element={<QuestionDetailsPage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/tags" element={<TagsPage />} />
        <Route path="/users/:id" element={<UserProfilePage />} />
        <Route path="/tags" element={<TagsPage />} />
        <Route path="/tags/:tag" element={<TagsPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
