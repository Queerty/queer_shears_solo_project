import { Button } from "@material-ui/core";
import { useHistory } from "react-router";
import './ConfirmationAdd.css';


function ConfirmationAdd() {
  const history = useHistory();
  const handleBrowse = () => {
    history.push(`/barber`);
  };
  return (
    <div id="confirmation">
      <h1> Thanks for contributing to Queer Shears!</h1>
      <p>Submissions are reviewed by our admins to ensure correct information.</p>
      <p>Posts with inaccurate information, or duplicate info will be removed.</p>
      <Button type="button" onClick={handleBrowse}>
        Browse Barbers
      </Button>
    </div>
  );
}

export default ConfirmationAdd;
