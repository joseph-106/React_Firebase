import React, { useState, useEffect } from "react";
import { dbService } from "fbase";

const Home = () => {
  const [post, setPost] = useState("");
  const [posts, setPosts] = useState([]);
  const getPosts = async () => {
    const dbPosts = await dbService.collection("posts").get();
    dbPosts.forEach((document) => {
      const postObject = {
        ...document.data(),
        id: document.id, // map 함수를 위해 id를 임의로 추가
      };
      // 이전 값들 앞에 forEach로 들어오는 데이터 붙이기
      setPosts((prev) => [postObject, ...prev]);
    });
  };
  useEffect(() => {
    getPosts();
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("posts").add({
      post,
      createdAt: Date.now(),
    });
    setPost("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setPost(value);
  };
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
        <input type="submit" value="Post" />
      </form>
      <div>
        {posts.map((post) => (
          <div key={post.id}>
            <h4>{post.post}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
