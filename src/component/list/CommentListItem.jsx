import styled from "styled-components";

const Wrapper = styled.div`
    width: calc(100% - 32px);
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    border: 1px solid gray;
    border-radius: 8px;
    cursor: pointer;
    background: white;
    :hover {
        background: lightgrey;
    }
`;

const CommentText = styled.p`
    font-size: 14px;
`;

function CommentListItem(props) {
    const { comment } = props;

    return (
        <Wrapper>
            <CommentText>{comment.content}</CommentText>
        </Wrapper>
    )
}

export default CommentListItem;