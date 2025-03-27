import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login/Login";
import UsersList from "./Pages/UsersList/userslist";
import EditUsers from "./Pages/EditUsers/editusers";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/users" element={<UsersList />} />
                <Route path="/edit/:id" element={<EditUsers />} />
            </Routes>
        </Router>
    );
}

export default App;
