import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth/Auth";
import Profile from "./pages/Profile/Profile";
import { useSelector } from "react-redux";
import Chat from "./pages/Chat/Chat";
import DashboardSponsor from "./pages/DashBoard/DashboardSponsor";
import DashboardAthlete from "./pages/DashBoard/DashBoardAthlete";
import NavIcons from "./components/NavIcons/NavIcons";
import SetRole from "./pages/SetRole/SetRole";
import Recommend from "./pages/recommend/Recommend";

function App() {
  const user = useSelector((state) => state.authReducer.authData);
  return (
    <div
      className="App"
      style={{
        height:
          window.location.href === "http://localhost:3000/chat"
            ? "calc(100vh - 2rem)"
            : "auto",
      }}
    >
      {user && (
        <div>
          <NavIcons />
        </div>
      )}
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="home" /> : <Navigate to="auth" />}
        />
        <Route
          path="/home"
          element={user ? <Home /> : <Navigate to="../auth" />}
        />
        <Route
          path="/auth"
          element={user ? <Navigate to="../home" /> : <Auth />}
        />
        <Route
          path="/recommend/:id"
          element={user ? <Recommend/>:<Navigate to="../home" />}
        />
        <Route
          path="/profile/:id"
          element={user ? <Profile /> : <Navigate to="../auth" />}
        />
        <Route
          path="/sponsorDashboard"
          element={user ? <DashboardSponsor /> : <Navigate to="../auth" />}
        />
        <Route
          path="/athleteDashboard"
          element={user ? <DashboardAthlete /> : <Navigate to="../auth" />}
        />
        <Route
          path="/setRole"
          element={user ? <SetRole /> : <Navigate to="../auth" />}
        />
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />

        <Route
          path="/chat"
          element={user ? <Chat /> : <Navigate to="../auth" />}
        />
      </Routes>
    </div>
  );
}

export default App;
