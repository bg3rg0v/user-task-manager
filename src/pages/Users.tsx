import { Outlet, useParams } from "react-router-dom";

const Users = () => {
  const params = useParams();
  const isPostsPage = "userId" in params;
  return isPostsPage ? <Outlet /> : "Users";
};

export default Users;
