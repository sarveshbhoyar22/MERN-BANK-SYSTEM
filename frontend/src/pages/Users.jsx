import { useState, useEffect } from "react";
import axios from "axios";


const Users = () => {
  const [users, setUsers] = useState([]); // Stores all users
  const [searchQuery, setSearchQuery] = useState(""); // Stores search input
  const [filteredUsers, setFilteredUsers] = useState([]); // Stores searched users
    // const {authuser} = useAuthContext();
  // Fetch users from backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {

        const tokens = localStorage.getItem("token");
        // console.log(tokens)

        const response = await axios.get(
          "http://localhost:5000/api/info/getusers",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${tokens}`,
            },
            withCredentials: true,
          }
        );
        console.log(response.data);
        
        setUsers(response.data);
        setFilteredUsers(response.data); // Initially, show all users

        
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  // Handle search input
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchQuery(value);

    const filtered = users.filter(
      (user) =>
        user?.name.toLowerCase().includes(value) ||
        user?.accountNumber.includes(value)
    );
    setFilteredUsers(filtered);
  };

  return (
      
      <div className="p-6 bg-black text-white min-h-screen ">
        <div className="container mt-20 sm:w-3/4 sm:mx-auto">
      <h2 className="text-2xl font-bold mb-4 flex gap-3">
        <img src="/second/user.png" className="w-8 h-8" alt="" />
        Users
      </h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by name or account number..."
        className="input input-bordered bg-gray-800 text-white w-full mb-4 p-2 rounded-md"
        value={searchQuery}
        onChange={handleSearch}
        />

      {/* Users Table */}
      <div className="overflow-y-auto max-h-[500px]">
        <table className="table w-full text-white border border-gray-700">
          <thead>
            <tr className="bg-gray-900">
              <th className="p-2">User Name</th>
              <th className="p-2">Account Number</th>
              <th className="p-2">Role</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
                <tr>
                <td colSpan="2" className="text-center py-4">
                  No users found
                </td>
              </tr>
            ) : (
                filteredUsers.map((user) => (
                    <tr key={user._id} className="border-t border-gray-700">
                  <td className="p-2">{user.name}</td>
                  <td className="p-2">{user.accountNumber}</td>
                  <td className="p-2">{user.role}</td>
                 
                 
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
            </div>
  );
};

export default Users;
