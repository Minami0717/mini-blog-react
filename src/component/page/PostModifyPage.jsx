import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Button from "../ui/Button";
import TextInput from "../ui/TextInput";
import { useEffect, useState } from "react";
import { getPost, updPost } from "../../api/postAxios";

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

function PostModifyPage() {
    const navigate = useNavigate();
    const { postId } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const modifyPost = () => {
        const newPost = {
            postId: postId,
            title: title,
            content: content
        };

        updPost(newPost)
        .then((res) => { if (res.status === 200) navigate(`/post/${postId}`) })
        .catch((e) => console.error(e));
    }

    useEffect(() => {
        getPost(postId)
        .then((data) => {
            setTitle(data.title);
            setContent(data.content);
        })
        .catch((e) => console.error(e));
    }, []);

    return (
        <Wrapper>
            <Container>
                <TextInput
                    height={20}
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                />

                <TextInput
                    height={400}
                    value={content}
                    onChange={(e) => {
                        setContent(e.target.value);
                    }}
                />

                <Button
                    title='글 수정하기'
                    onClick={() => {
                        modifyPost();
                    }}
                />
            </Container>
        </Wrapper>
    )
}

export default PostModifyPage;