import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { dbService, storageService } from "fbase";
import Post from "components/Post";

const Home = (props) => {
  const [post, setPost] = useState("");
  const [posts, setPosts] = useState([]);
  const [attachment, setAttachment] = useState();
  useEffect(() => {
    dbService.collection("posts").onSnapshot((snapshot) => {
      const postArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postArray);
    });
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    const fileRef = storageService
      .ref()
      .child(`${props.userObj.uid}/${uuidv4()}`);
    const response = await fileRef.putString(attachment, "data_url");
    console.log(response);
    /* await dbService.collection("posts").add({
      text: post,
      createdAt: Date.now(),
      creatorId: props.userObj.uid,
    });
    setPost(""); */
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setPost(value);
  };
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    // 파일이 읽어지면 실행
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile); // 파일을 읽기 시작
  };
  const onClearAttachment = () => setAttachment(null);
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={post}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Post" />
        {attachment && (
          <div>
            <img src={attachment} alt="preview" width="50px" height="50px" />
            <button onClick={onClearAttachment}>Clear</button>
          </div>
        )}
      </form>
      <div>
        {posts.map((post) => (
          <Post
            key={post.id}
            postObj={post}
            isOwner={post.creatorId === props.userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
