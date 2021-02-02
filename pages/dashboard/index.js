import { useAuth } from "@/hooks/useAuth";
import { DashComponent } from "@/components/dashboard/dash-component";

const Dashboard = ({}) => {
  const { isAuthenticated, session, loading, signIn, signOut } = useAuth();
  return (
    <div style={{ paddingTop: "8em", margin: "0 auto", textAlign: "center" }}>
      {/* {(session.user.email && session.user.name) && ( */}
      {loading && "authorizing..."}
      {!loading && !isAuthenticated && "Access Denied"}
      {!loading && isAuthenticated && <DashComponent />}
    </div>
  );
};

export default Dashboard;
