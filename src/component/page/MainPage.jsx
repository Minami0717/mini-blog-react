import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../ui/Button";
import PostList from "../list/PostList";
import { useEffect, useState } from "react";
import axios from "axios";
// import data from '../../data.json';

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

function MainPage(props) {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);

    const getPosts = async () => {
        try {
            const res = await axios.get('http://localhost:8080/post');
            setPosts(res.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getPosts();
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