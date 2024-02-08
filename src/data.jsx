import axios from "axios";

function getPosts() {
    axios.get('http://localhost:8080/post')
        .then((res) => {
            return res.data;
        })
        .catch(() => {
            return null;
        })
}

export default getPosts;