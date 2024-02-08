import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Button from "../ui/Button";
import TextInput from "../ui/TextInput";
import { useEffect, useState } from "react";
import CommentList from "../list/CommentList";
import getData from "../../data";
import axios from "axios";

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

const PostContainer = styled.div`
    padding: 8px 16px;
    border: 1px solid grey;
    border-radius: 8px;
`;

const TitleText = styled.p`
    font-size: 28px;
    font-weight: 500;
`;

const ContentText = styled.p`
    font-size: 20px;
    line-height: 32px;
    white-space: pre-wrap;
`;

const CommentLabel = styled.p`
    font-size: 16px;
    font-weight: 500;
`;

function PostViewPage(props) {
    const navigate = useNavigate();
    const { postId } = useParams();
    const [post, setPost] = useState('');
    const [comment, setComment] = useState('');

    const getPost = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/post/${postId}`);
            setPost(res.data);
        } catch (error) {
            console.error(error);
        }
    }

    const writeComment = async () => {
        const newComment = {
            postId: postId,
            content: comment
        };

        try {
            const res = await axios.post("http://localhost:8080/cmt", newComment);
            if (res.data === 1) {
                getPost();
                setComment('');
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getPost();
    }, []);


    return (
        <Wrapper>
            <Container>
                <Button
                    title='뒤로 가기'
                    onClick={() => {
                        navigate('/');
                    }}
                />
                <Button
                    title='글 수정하기'
                    onClick={() => {
                        navigate('/');
                    }}
                />
                <PostContainer>
                    <TitleText>{post.title}</TitleText>
                    <ContentText>{post.content}</ContentText>
                </PostContainer>

                <CommentLabel>댓글</CommentLabel>
                <CommentList comments={post.cmts} />

                <TextInput
                    height={40}
                    value={comment}
                    onChange={(e) => {
                        setComment(e.target.value);
                    }}
                />
                <Button
                    title='댓글 작성하기'
                    onClick={() => {
                        writeComment();
                    }}
                />
            </Container>
        </Wrapper>
    )
}

export default PostViewPage;