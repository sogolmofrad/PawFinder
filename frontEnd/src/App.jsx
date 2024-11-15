import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dogs from "./pages/Dogs";
import Cats from "./pages/Cats";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Login from "./pages/Login";
import Adoption from "./pages/Adoption";
import PersonalAccount from "./pages/PersonalAccount";
import AppLayout from "./components/AppLayout";
import Dog from "./pages/Dog";
import Cat from "./pages/Cat";
import Registration from "./pages/Registration";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/dogs" element={<Dogs />} />
          <Route path="/dogs/:id" element={<Dog />} />
          <Route path="/cats" element={<Cats />} />
          <Route path="/cats/:id" element={<Cat />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/adoption" element={<Adoption />} />
          <Route path="/account" element={<PersonalAccount />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
