// Dashboard component
"use client"
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";

interface User {
  id: number;
  name: string;
  email: string;
}

const Dashboard = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]); // All users
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]); // Filtered users for display
  const [searchTerm, setSearchTerm] = useState(""); // Search term
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [usersPerPage] = useState(5); // Number of users per page

  const [showAddUserForm, setShowAddUserForm] = useState(false); // Toggle form visibility
  const [newUserName, setNewUserName] = useState(""); // New user name
  const [newUserEmail, setNewUserEmail] = useState(""); // New user email

  useEffect(() => {
    if (!user) {
      router.push("/"); // Redirect to signin if not authenticated
    }
  }, [user, router]);

  useEffect(() => {
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
      setFilteredUsers(JSON.parse(storedUsers)); // Initially, all users are displayed
    } else {
      fetchUsers(); // Fetch users if nothing is stored in localStorage
    }
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await response.json();
      setUsers(data);
      setFilteredUsers(data); // Initially, all users are displayed
      localStorage.setItem("users", JSON.stringify(data)); // Store users in localStorage
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    // Filter users based on the search term
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
    setCurrentPage(1); 
  }, [searchTerm, users]);


  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);


  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const handlePageChange = (page: number) => setCurrentPage(page);


  const handleAddUser = () => {
    if (newUserName && newUserEmail) {
      const newUser: User = {
        id: users.length + 1, 
        name: newUserName,
        email: newUserEmail,
      };
      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers)); 
      setNewUserName("");
      setNewUserEmail("");
      setShowAddUserForm(false); 
    } else {
      alert("Please enter both name and email!");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p>Welcome, {user?.name}</p>

      
      {!showAddUserForm && (
        <button
          onClick={() => setShowAddUserForm(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mt-4"
        >
          Add User
        </button>
      )}

     
      {showAddUserForm && (
        <div className="mt-6 mb-4 p-4 border rounded-lg bg-gray-50">
          <h2 className="text-xl font-semibold mb-2">Add New User</h2>
          <div className="flex flex-col lg:flex-row gap-4">
            <input
              type="text"
              placeholder="Name"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 flex-1"
            />
            <input
              type="email"
              placeholder="Email"
              value={newUserEmail}
              onChange={(e) => setNewUserEmail(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 flex-1"
            />
            <button
              onClick={handleAddUser}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            >
              Save User
            </button>
            <button
              onClick={() => setShowAddUserForm(false)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

  
      <div className="mt-6 mb-4">
        <input
          type="text"
          placeholder="Search by name or email"
          className="border border-gray-300 rounded-lg px-4 py-2 w-full lg:w-1/2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

    
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id}>
                <td className="border border-gray-300 px-4 py-2">{user.id}</td>
                <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                <td className="border border-gray-300 px-4 py-2">{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

     
      <div className="flex justify-center items-center mt-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`px-4 py-2 mx-1 border rounded-lg ${
              currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-100"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
