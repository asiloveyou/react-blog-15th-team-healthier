import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";

const Detail = () => {
  const router = useRouter();

  const handleDelete = (): void => {
    router.push("/");
  };

  return (
    <Container>
      <Title>title</Title>
      <Date>2022-05-16 00:00</Date>
      <ScrollContents>
        <section>내용</section>
        <ButtonsBox>
          <Link href="/">
            <Button>목록</Button>
          </Link>
          <Link href={`/edit/${router.query.id}`}>
            <Button>수정</Button>
          </Link>
          <Button onClick={handleDelete}>삭제</Button>
        </ButtonsBox>
      </ScrollContents>
    </Container>
  );
};

export default Detail;

const Container = styled.section`
  border: 0.01rem solid grey;
  border-radius: 1rem;
  height: 40rem;
  width: 50rem;
  display: flex;
  flex-direction: column;
`;
const Title = styled.p`
  font-size: 2rem;
  margin: 2rem;
`;
const Date = styled.p`
  display: flex;
  justify-content: flex-end;
  margin: 2rem;
`;
const ScrollContents = styled.section`
  height: 30rem;
  margin: 1rem 2rem;
  overflow: auto;
`;
const ButtonsBox = styled.section`
  display: flex;
  justify-content: flex-end;
  margin-top: 3rem;
`;
const Button = styled.a`
  margin: 0 1rem;
`;