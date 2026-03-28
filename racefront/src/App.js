import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import Landing from "./Pages/Landing";
import EventsPage from "./Pages/EventsPage";
import CommunityPage from "./Pages/CommunityPage";
import GaragePage from "./Pages/GaragePage";
import MediaPage from "./Pages/MediaPage";
import JoinPage from "./Pages/JoinPage";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import EventRegisterPage from "./Pages/EventRegisterPage";
import CommunityJoinPage from "./Pages/CommunityJoinPage";
import CheckoutPage from "./Pages/CheckoutPage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/garage" element={<GaragePage />} />
          <Route path="/media" element={<MediaPage />} />
          <Route path="/join" element={<JoinPage />} />
          <Route path="/events/:eventId/register" element={<EventRegisterPage />} />
          <Route path="/community/join" element={<CommunityJoinPage />} />
          <Route path="/checkout/:planId" element={<CheckoutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
