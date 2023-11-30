import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./MyProfile.css"; // Import your CSS for styling

const MyProfile = () => {
  const user = useSelector((state) => state.user); // Assuming you have a Redux store for user data

  // State for editing profile information
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({});

  // Handle editing
  const handleEdit = () => {
    setIsEditing(true);
    setEditedUser({ ...user }); // Copy user data to the editedUser state
  };

  // Handle saving edited profile
  const handleSave = () => {
    // Implement your logic to save edited user data
    // You can use API calls or dispatch actions to update the user data
    // Example: dispatch(updateUser(editedUser));
    setIsEditing(false);
  };

  useEffect(() => {
    // Fetch user data when the component mounts
    // Example: dispatch(fetchUserProfile());
  }, []);

  return (
    <div className="my-profile">
      <div className="profile-header">
        <h2>My Profile</h2>
        {isEditing ? (
          <button onClick={handleSave}>Save</button>
        ) : (
          <button onClick={handleEdit}>Edit Profile</button>
        )}
      </div>
      <div className="profile-info">
        <div className="profile-pic">
          <img
            src={
              user.profilePic ||
              "https://vdostavka.ru/wp-content/uploads/2019/05/no-avatar.png"
            }
            alt="Profile"
          />
        </div>
        {isEditing ? (
          <div className="edit-form">
            <label>Username:</label>
            <input
              type="text"
              value={editedUser.username}
              onChange={(e) =>
                setEditedUser({ ...editedUser, username: e.target.value })
              }
            />
            <label>Email:</label>
            <input
              type="email"
              value={editedUser.email}
              onChange={(e) =>
                setEditedUser({ ...editedUser, email: e.target.value })
              }
            />
            {/* Add more fields for other user information */}
          </div>
        ) : (
          <div className="profile-details">
            <h3>{user.username}</h3>
            <p>Email: {user.email}</p>
            {/* Display other user details like goods, customer confirmed, etc. */}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
