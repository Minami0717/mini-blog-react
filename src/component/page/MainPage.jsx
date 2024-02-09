import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../ui/Button";
import PostList from "../list/PostList";
import { useEffect, useState } from "react";
import { getPosts } from "../../api/postAxios";

const Wrapper = styled.div`
    padding: 16px;
    width: calc(100% - 32px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Container = styled.div`
    width: 100%;
    max-width: 720px;

    & {
        :not(:last-child) {
            margin-bottom: 16px;
        }
    }
`;

function MainPage() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getPosts()
        .then((data) => setPosts(data))
        .catch((e) => console.error(e));
    }, []);

    return (
        <Wrapper>
            <Container>
                <Button
                    title='글 작성하기'
                    onClick={() => {
                        navigate('/post-write');
                    }}
                />

                <PostList
                    posts={posts}
                    onClickItem={(item) => {
                        navigate(`/post/${item.postId}`);
                    }}
                />
            </Container>
        </Wrapper>
    )
}

export default MainPage;