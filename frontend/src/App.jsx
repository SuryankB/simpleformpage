import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [roll_no, setRoll_no] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [editing, setEditing] =
    useState(false);

  // =====================
  // GET USERS
  // =====================

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/users"
      );

      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // =====================
  // DELETE USER
  // =====================

  const deleteUser = async (
    roll_no
  ) => {
    try {
      const confirmDelete =
        window.confirm(
          "Delete this student?"
        );

      if (!confirmDelete) return;

      await axios.delete(
        `http://localhost:8000/users/${roll_no}`
      );

      fetchUsers();

    } catch (error) {
      console.log(error);

      alert(
        "Failed to delete student"
      );
    }
  };

  // =====================
  // START EDIT
  // =====================

  const startEdit = (
    roll_no
  ) => {

    const user =
      users.find(
        (u) =>
          u.roll_no === roll_no
      );

    if (!user) return;

    setEditing(true);

    setRoll_no(user.roll_no);

    setName(user.name);

    setEmail(user.email);

    setAge(user.age);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // =====================
  // SUBMIT
  // =====================

  const handleSubmit = async (
    e
  ) => {

    e.preventDefault();

    if (
      !roll_no ||
      !name ||
      !email ||
      !age
    ) {
      alert(
        "Please fill all fields"
      );
      return;
    }

    try {

      setLoading(true);

      if (editing) {

        await axios.put(
          `http://localhost:8000/users/${roll_no}`,
          {
            name,
            email,
            age: Number(age),
          }
        );

      } else {

        await axios.post(
          "http://localhost:8000/users",
          {
            roll_no:
              Number(roll_no),

            name,

            email,

            age:
              Number(age),
          }
        );

      }

      setRoll_no("");
      setName("");
      setEmail("");
      setAge("");

      setEditing(false);

      fetchUsers();

    } catch (error) {

      console.log(error);

      alert(
        editing
          ? "Failed to update student"
          : "Failed to add student"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="container">

      <div className="heading">
        <h1>
          Student Registration Form
        </h1>
      </div>

      <div className="form-card">

        <form
          onSubmit={handleSubmit}
          className="form"
        >

          <input
            type="number"
            placeholder="Roll Number"
            value={roll_no}
            disabled={editing}
            onChange={(e) =>
              setRoll_no(
                e.target.value
              )
            }
          />

          <input
            type="text"
            placeholder="Student Name"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
          />

          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) =>
              setAge(
                e.target.value
              )
            }
          />

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Saving..."
              : editing
              ? "Update Student"
              : "Add Student"}
          </button>

        </form>

      </div>

      <div className="users-section">

        <h2>
          Students ({users.length})
        </h2>

        {users.length === 0 ? (

          <div className="empty">
            No students found
          </div>

        ) : (

          <div className="users-list">

            <div className="table-header">
              <div>Roll No</div>
              <div>Name</div>
              <div>Email</div>
              <div>Age</div>
              <div>Action</div>
            </div>

            {users.map((u) => (

              <div
                className="student-row"
                key={u.roll_no}
              >

                <div>
                  #{u.roll_no}
                </div>

                <div>
                  {u.name}
                </div>

                <div>
                  {u.email}
                </div>

                <div>
                  {u.age} Years
                </div>

                <div className="action-btns">

                  <button
                    className="update-btn"
                    onClick={() =>
                      startEdit(
                        u.roll_no
                      )
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      deleteUser(
                        u.roll_no
                      )
                    }
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default App;