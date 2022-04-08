import React, { useState } from "react";
import { authService } from "fbase";
import { useHistory } from "react-router-dom";

const Profile = (props) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(
    props.userObj.displayName
  );
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };
  /* const getMyPosts = async () => {
    const posts = await dbService
      .collection("posts")
      .where("creatorId", "==", `${props.userObj.uid}`)
      .orderBy("createdAt", "desc")
      .get();
    console.log(posts.docs.map((doc) => doc.data()));
  };
  useEffect(() => {
    getMyPosts();
  }); */
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    // form의 닉네임을 변경했다면 업데이트
    if (props.userObj.displayName !== newDisplayName) {
      await props.userObj.updateProfile({
        displayName: newDisplayName,
      });
    }
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="text"
          placeholder="Display name"
          value={newDisplayName}
        />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default Profile;
