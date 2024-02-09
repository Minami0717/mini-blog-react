import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Button from "../ui/Button";
import TextInput from "../ui/TextInput";
import { useEffect, useState } from "react";
import CommentList from "../list/CommentList";
import axios from "axios";
import { delPost, getPost } from "../../api/postAxios";
import { insComment } from "../../api/commentAxios";

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

    & * {
        margin-bottom: 16px;
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

const ButtonBox = styled.div`
    display: flex;
    & > :first-child {
        margin-right: auto;
    }
    & > :nth-child(2) {
        margin-right: 10px;
    }
`;

function PostViewPage(props) {
    const navigate = useNavigate();
    const { postId } = useParams();
    const [post, setPost] = useState('');
    const [comment, setComment] = useState('');

    const getPostData = () => {
        getPost(postId)
        .then((data) => setPost(data))
        .catch((e) => console.error(e));
    }

    const writeComment = () => {
        const newComment = {
            postId: postId,
            content: comment
        };

        insComment(newComment)
        .then((res) => {
            if (res.status === 200) {
                getPostData();
                setComment('');
            }
        })
        .catch((e) => console.error(e));
    }

    const deletePost = () => {
        if (window.confirm('게시글을 삭제하면 복구가 안됩니다. 삭제하시겠습니까?')) {
            delPost(postId)
            .then((res) => { if (res.status === 200) navigate('/') })
            .catch((e) => console.error(e));
        }
    }

    useEffect(() => {
        getPostData();
    }, []);


    return (
        <Wrapper>
            <Container>
                <ButtonBox>
                    <Button
                        title='뒤로 가기'
                        onClick={() => {
                            navigate('/');
                        }}
                    />
                    <Button
                        title='수정'
                        onClick={() => {
                            navigate(`/post-modify/${postId}`);
                        }}
                    />
                    <Button
                        title='삭제'
                        onClick={() => {
                            deletePost();
                        }}
                    />
                </ButtonBox>
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