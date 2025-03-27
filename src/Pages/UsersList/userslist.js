import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
        setUsers(response.data.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, [page]);

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">User List</h2>
      
      <div className="w-full max-w-5xl overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg text-sm md:text-base">
          <thead>
            <tr className="bg-blue-500 text-white text-left md:text-center">
              <th className="p-2 md:p-3">ID</th>
              <th className="p-2 md:p-3">Avatar</th>
              <th className="p-2 md:p-3">First Name</th>
              <th className="p-2 md:p-3">Last Name</th>
              <th className="p-2 md:p-3">Email</th>
              <th className="p-2 md:p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50 text-center">
                <td className="p-2 md:p-3 font-semibold">{user.id}</td>
                <td className="p-2 md:p-3">
                  <img src={user.avatar} alt={user.first_name} className="w-12 h-12 md:w-16 md:h-16 rounded-full mx-auto" />
                </td>
                <td className="p-2 md:p-3">{user.first_name}</td>
                <td className="p-2 md:p-3">{user.last_name}</td>
                <td className="p-2 md:p-3">{user.email}</td>
                <td className="p-2 md:p-3 flex flex-col md:flex-row justify-center space-y-2 md:space-y-0 md:space-x-2">
                  <button 
                    onClick={() => handleEdit(user.id)} 
                    className="bg-yellow-500 text-white px-3 py-1 rounded text-xs md:text-sm hover:bg-yellow-600 transition"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(user.id)} 
                    className="bg-red-500 text-white px-3 py-1 rounded text-xs md:text-sm hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center space-x-2 mt-4">
        <button 
          onClick={() => setPage(page - 1)} 
          className={`px-3 py-1 rounded text-xs md:text-sm ${page > 1 ? 'bg-gray-500 text-white hover:bg-gray-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`} 
          disabled={page === 1}
        >
          Previous
        </button>
        <button 
          onClick={() => setPage(page + 1)} 
          className="bg-blue-500 text-white px-3 py-1 rounded text-xs md:text-sm hover:bg-blue-600 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UsersList;
