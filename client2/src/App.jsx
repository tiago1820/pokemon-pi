import {Route, Routes } from "react-router-dom";
import { Landing } from "./components/Landing/Landing";

export const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element="" />
      </Routes>
    </div>
  )
}
