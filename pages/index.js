import Layout from "../components/Layout";
import { optionalAuth } from "../utils/ssr";

export const getServerSideProps = async (req) => {
  return optionalAuth(req);
};

function HomePage(props) {
  const user = props.user;

  return (
    <Layout user={user}>
      <h1>This app is for students by students!</h1>
      <p>Finding free time is as simple as 1,2,3! With this app you can:</p>
      <p>(1) Input their schedule into our calendar interface</p>
      <p>(2) Create groups through shareable link</p>
      <p>
        (3) Enjoy our free schedule comparator and find when everyone is free!
      </p>
      <div>
        {/* {user && ( 
          <pre>
            You're logged in! Here's what the server knows about you:{" "}
            {JSON.stringify(user, null, "\t")}
          </pre>
        )} */}
      </div>
    </Layout>
  );
}

export default HomePage;
