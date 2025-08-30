import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ProgressTracker from "./pages/ProgressTracker";
import OnDemandSupport from "./pages/OnDemandSupport";
import CommunicationExercises from "./pages/CommunicationExercises";
import ChildcareOptions from "./pages/ChildcareOptions";
import WorkBoundaries from "./pages/WorkBoundaries";
import EmotionalCoaching from "./pages/EmotionalCoaching";
import TimeManagement from "./pages/TimeManagement";
import ConflictResolution from "./pages/ConflictResolution";
import Journaling from "./pages/JournalingCommunity";

import ScreenTime from "./pages/ScreenTime";
import JournalingCommunity from "./pages/JournalingCommunity";

function App() {
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
       
        <Route path="/childcare" element={<ChildcareOptions />} />
        <Route path="/work" element={<WorkBoundaries />} />
        <Route path="/emotions" element={<EmotionalCoaching />} />
        <Route path="/time" element={<TimeManagement />} />
        <Route path="/conflict" element={<ConflictResolution />} />
        <Route path="/journaling" element={<JournalingCommunity />} />
        <Route path="/progress" element={<ProgressTracker />} />
        <Route path="/support" element={<OnDemandSupport />} />
        <Route path="/screentime" element={<ScreenTime />} />
         <Route path="/communication" element={<CommunicationExercises />} />
        {/* <h1 className="text-4xl font-bold text-red-500">Tailwind Working 🎉</h1> */}

      </Routes>
    </Router>
  );
}

export default App;
