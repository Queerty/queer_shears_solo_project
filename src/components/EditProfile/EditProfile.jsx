import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router";
function EditProfile() {
    const user = useSelector((store) => store.user);
    const [newUsername, setNewUsername] = useState(user.username);
    const [newFullName, setNewName] = useState(user.full_name);
    const [newPronouns, setNewPronouns] = useState(user.pronouns);
    const [newAvatar_link, setNewAvatarLink] = useState(user.avatar_link);
  
    const errors = useSelector((store) => store.errors);
    const dispatch = useDispatch();
    const history = useHistory();

    const updateUser = () => {  
      dispatch({
        type: 'EDIT_PROFILE',
        payload: {
          username: newUsername,
          full_name: newFullName,
          pronouns: newPronouns,
          avatar_link: newAvatar_link,
         
        },
      });
      history.push('/user')
    }; // end updateUser
  
    return (
      <form className="formPanel">
        <h2>Edit User</h2>

        <div>
          <label htmlFor="username">
            Username:
            <input
              type="text"
              name="username"
              value={newUsername}
              required
              onChange={(event) => setNewUsername(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="fullName">
            Full Name:
            <input
              type="text"
              name="fullName"
              value={newFullName}
              required
              onChange={(event) => setNewName(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="pronouns">
            Pronouns:
            <input
              type="text"
              name="pronouns"
              value={newPronouns}
              required
              onChange={(event) => setNewPronouns(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="avatar_link">
            Profile Picture url:
            <input
              type="text"
              name="avatar_link"
              value={newAvatar_link}
              required
              onChange={(event) => setNewAvatarLink(event.target.value)}
            />
          </label>
        </div>
        <div>
          <Button className="btn" onClick={updateUser}>Save</Button>
        </div>
      </form>
    );
  }
  
  export default EditProfile;
  