import React, { useEffect } from "react";
import { authService, dbService } from "fbase";
import { useHistory } from "react-router-dom";

const Profile = (props) => {
  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };
  const getMyPosts = async () => {
    const posts = await dbService
      .collection("posts")
      .where("creatorId", "==", `${props.userObj.uid}`)
      .orderBy("createdAt", "desc")
      .get();
    console.log(posts.docs.map((doc) => doc.data()));
  };
  useEffect(() => {
    getMyPosts();
  });
  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default Profile;
