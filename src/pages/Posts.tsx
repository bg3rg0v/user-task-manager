import { useParams } from "react-router-dom";
const Posts = () => {
  const params = useParams();
  console.log(params);

  return <>Posts</>;
};

export default Posts;
