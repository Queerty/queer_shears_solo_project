import { useHistory } from "react-router";
function ConfirmationAdd() {
  const history = useHistory();
  const handleBrowse = () => {
    history.push(`/barber`);
  };
  return (
    <>
      <h1> Thanks for contributing to Queer Shears!</h1>
      <p>It can take 5-7 business days to approve your submission</p>
      <button type="button" onClick={handleBrowse}>
        Browse Barbers
      </button>
    </>
  );
}

export default ConfirmationAdd;
