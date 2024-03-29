import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../ui/Button";
import TextInput from "../ui/TextInput";
import { useState } from "react";
import axios from "axios";
import { insPost } from "../../api/postAxios";

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

function PostWritePage(props) {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const writePost = () => {
        const newPost = {
            title: title,
            content: content
        };

       insPost(newPost)
        .then((res) => {
            if (res.status === 200) {
                navigate("/");
            }
        })
        .catch((error) => {
            console.log(error);
        });      
    }

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
                    title='글 작성하기'
                    onClick={() => {
                        writePost();
                    }}
                />
            </Container>
        </Wrapper>
    )
}

export default PostWritePage;