import { useHistory } from "react-router";
function ConfirmationAdd() {
  const history = useHistory();
  const handleBrowse = () => {
    history.push(`/barber`);
  };
  return (
    <>
      <h1> Thanks for contributing to Queer Shears!</h1>
      <p>Submissions are reviewed by our admins to ensure correct information.</p>
      <p>Posts with inaccurate information, or duplicate info will be removed.</p>
      <button type="button" onClick={handleBrowse}>
        Browse Barbers
      </button>
    </>
  );
}

export default ConfirmationAdd;
