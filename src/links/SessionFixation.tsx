import Login from "../components/Login";

const SessionFixation = () => {
  return (
    <div>
      <Login submit={true} showForgotPassword={false} />
    </div>
  );
};

export default SessionFixation;
