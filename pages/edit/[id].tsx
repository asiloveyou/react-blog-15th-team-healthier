import styled from "styled-components";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useRouter } from "next/router";
import { addPost, updatePost } from "../../store/modules/post";

const Edit = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.post.posts);
  const [input, setInput] = useState({ title: "", content: "" });
  const { title, content } = input;

  const handleSubmit = (): void => {
    const idx = posts.findIndex((post) => post.id === router.query.id);
    const cur = new Date();
    const date = `${cur.getFullYear()}-${String(cur.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(cur.getDay()).padStart(
      2,
      "0"
    )} ${cur.getHours()}:${cur.getMinutes()}`;
    const postObj = {
      id: String(router.query.id),
      title,
      content,
      date,
    };
    if (idx === -1) {
      dispatch(addPost(postObj));
    } else {
      dispatch(updatePost(postObj));
    }
    router.push(`/detail/${router.query.id}`);
  };
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const idx = posts.findIndex((post) => String(post.id) === router.query.id);
    if (idx !== -1) {
      setInput({ title: posts[idx].title, content: posts[idx].content });
    }
  }, []);

  return (
    <Container>
      <TitleInput name="title" value={title} onChange={handleInputChange} />
      <ContentInput
        name="content"
        value={content}
        onChange={handleInputChange}
      />
      <Buttons>
        <Button onClick={handleSubmit}>작성완료</Button>
        <Link href="/">
          <Button>취소</Button>
        </Link>
      </Buttons>
    </Container>
  );
};

export default Edit;

const Container = styled.section`
  border: 0.01rem solid grey;
  border-radius: 1rem;
  height: 40rem;
  width: 50rem;
  display: flex;
  flex-direction: column;
`;
const TitleInput = styled.input`
  font-size: 2rem;
  margin: 1.5rem;
  padding: 0.5rem;
  width: 47rem;
  border: none;
  border-bottom: 0.01rem solid grey;
  :focus {
    outline: none;
  }
`;
const ContentInput = styled.textarea`
  margin: 1.5rem;
  padding: 0.5rem;
  width: 47rem;
  height: 27rem;
  font-size: 1rem;
  resize: none;
  border: 0.01rem solid grey;
  :focus {
    outline: none;
  }
`;
const Buttons = styled.section`
  display: flex;
  justify-content: flex-end;
`;
const Button = styled.a`
  & + & {
    margin: 0 2rem;
  }
`;