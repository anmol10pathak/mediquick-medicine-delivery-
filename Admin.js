import React, { useEffect, useState } from "react";
import axios from "axios";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [editingUserId, setEditingUserId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", email: "", phone: "" });
  const [search, setSearch] = useState("");

  // Fetch users
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users");
      setUsers(res.data);
    } catch (err) {
      setError("Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Delete user
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      setUsers(users.filter((user) => user._id !== id));
    } catch {
      setError("Failed to delete user");
    }
  };

  // Edit
  const startEdit = (user) => {
    setEditingUserId(user._id);
    setEditForm({ name: user.name, email: user.email, phone: user.phone || "" });
  };
  const cancelEdit = () => {
    setEditingUserId(null);
    setEditForm({ name: "", email: "", phone: "" });
  };
  const saveEdit = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/users/${id}`, editForm);
      setUsers(users.map((u) => (u._id === id ? { ...u, ...editForm } : u)));
      cancelEdit();
    } catch {
      setError("Failed to update user");
    }
  };

  // Filtered users
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <h2>Admin Panel - Users</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="text"
        placeholder="Search by name or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.searchInput}
      />
      <table style={styles.table}>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Registered At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>
                  {editingUserId === user._id ? (
                    <input
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    />
                  ) : (
                    user.name
                  )}
                </td>
                <td>
                  {editingUserId === user._id ? (
                    <input
                      value={editForm.email}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td>
                  {editingUserId === user._id ? (
                    <input
                      value={editForm.phone}
                      onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    />
                  ) : (
                    user.phone || "-"
                  )}
                </td>
                <td>{new Date(user.createdAt).toLocaleString()}</td>
                <td>
                  {editingUserId === user._id ? (
                    <>
                      <button style={styles.saveBtn} onClick={() => saveEdit(user._id)}>Save</button>
                      <button style={styles.cancelBtn} onClick={cancelEdit}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button style={styles.editBtn} onClick={() => startEdit(user)}>Edit</button>
                      <button style={styles.deleteBtn} onClick={() => handleDelete(user._id)}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>No users found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

// Styles
const styles = {
  container: { width: "95%", maxWidth: "1000px", margin: "30px auto", fontFamily: "Arial, sans-serif" },
  table: { width: "100%", borderCollapse: "collapse", marginTop: "20px" },
  editBtn: { marginRight: "5px", padding: "5px 10px", background: "#f97316", color: "#fff", border: "none", cursor: "pointer", borderRadius: "4px" },
  deleteBtn: { padding: "5px 10px", background: "#dc2626", color: "#fff", border: "none", cursor: "pointer", borderRadius: "4px" },
  saveBtn: { marginRight: "5px", padding: "5px 10px", background: "#16a34a", color: "#fff", border: "none", cursor: "pointer", borderRadius: "4px" },
  cancelBtn: { padding: "5px 10px", background: "#6b7280", color: "#fff", border: "none", cursor: "pointer", borderRadius: "4px" },
  searchInput: { width: "100%", padding: "8px 10px", marginBottom: "15px", borderRadius: "5px", border: "1px solid #ccc" },
};

export default Admin;