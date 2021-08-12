import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import Checkbox from '@material-ui/core/Checkbox';
// import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { FormGroup } from "@material-ui/core";
import { Radio, RadioGroup } from "@material-ui/core";
import { Checkbox } from "@material-ui/core";
import { useHistory } from "react-router";
import "./AddBarber.css";

function AddBarberForm() {
  const dispatch = useDispatch();
  const history = useHistory();

  //material UI checkboxes
  // const [checked, setChecked] = React.useState(true);
  // const [fullName, setName] = useState('');
  //   const [pronouns, setPronouns] = useState('');
  //   const [specialties, setSpecialties] = useState('');
  //   const [phoneNumber, setPhone] = useState('');
  //   const [website, setWebsite] = useState('');
  //   const [facebook, setFacebook] = useState('');
  //   const [instagram, setInstagram] = useState('');
  //   const [address, setAddress] = useState('');
  //   const [avatar_link, setAvatarLink] = useState('');
  //   const [role, setRole] = useState('');

  // function handleChange(evt) {
  //     const value = evt.target.value;
  //     setBarber({
  //         ...barber,
  //         [evt.target.name]: value

  //     });

  // }
  //   const handleChange = (event) => {
  //     setSpecialties(event.target.checked);
  //   };

  const [specialties, setSpecialties] = useState({
    checkedFade: false,
    checkedTrans: false,
    checkedLong: false,
    checkedColor: false,
    checkedCurly: false,
    checkedTextured: false,
  });
  const [barber, setBarber] = useState({
    fullName: "",
    pronouns: "",
    specialties:"",
    phoneNumber: "",
    website: "",
    facebook: "",
    instagram: "",
    address: "",
    avatar_link: "",
    role: "",
  });
  // ]);
  const handleCheck = (event) => {
    console.log(event.target.name);
    switch (event.target.name) {
      case "checkedFade":
        setSpecialties({
          ...specialties,
          checkedFade: !specialties.checkedFade,
        });
        break;
      case "checkedTrans":
        setSpecialties({
          ...specialties,
          checkedFade: !specialties.checkedFade,
        });
        break;
      case "checkedLong":
        setSpecialties({
          ...specialties,
          checkedFade: !specialties.checkedFade,
        });
        break;
      case "checkedColor":
        setSpecialties({
          ...specialties,
          checkedFade: !specialties.checkedFade,
        });
        break;
      case "checkedCurly":
        setSpecialties({
          ...specialties,
          checkedFade: !specialties.checkedFade,
        });
        break;
      case "checkedTextured":
        setSpecialties({
          ...specialties,
          checkedFade: !specialties.checkedFade,
        });
        break;

      default:
        break;
    }
  };

  const handleSubmit = () => {
    event.preventDefault();
    if(barber.fullName == ""){
      alert("Please fill out required Full Name field")
    }else{
    console.log("in handle submit barber*************", barber);
    console.log("in handle submit spec*************", specialties);
    dispatch({
      type: "POST_BARBER",
      payload: { barber: barber},
    });

    setBarber({
      fullName: "",
      pronouns: "",
      specialties: "",
      phoneNumber: "",
      website: "",
      facebook: "",
      instagram: "",
      address: "",
      avatar_link: "",
      role: "",
    });

    history.push(`/ConfirmationAdd`);
  }
  };
  return (
    <form className="formPanel">
      <h2>Add Barber/Stylist</h2>

      <div>
        <label htmlFor="fullName">
          Full Name
          <input
            type="text"
            name="fullName"
            value={barber.fullName}
            required
            onChange={(event) =>
              setBarber({ ...barber, fullName: event.target.value })
            }
          />
        </label>
      </div>
      <div>
        <label htmlFor="pronouns">
          Pronouns
          <input
            type="text"
            name="pronouns"
            value={barber.pronouns}
            required
            onChange={(event) =>
              setBarber({ ...barber, pronouns: event.target.value })
            }
          />
        </label>
      </div>
      {/* <div>
        <FormControl component="fieldset">
          <FormLabel component="legend">Specializes in:</FormLabel>
          <FormGroup aria-label="position" row>
            <FormControlLabel
              value="Fade"
              control={
                <Checkbox
                  value={!setSpecialties.checkedFade}
                  color="primary"
                  checked={specialties.checkedFade}
                  onChange={(event) =>
                    setSpecialties({
                      ...specialties,
                      checkedFade: Boolean(event.target.value),
                    })
                  }
                  name="checkedFade"
                />
              }
              label="Fade"
              labelPlacement="end"
            />
            <FormControlLabel
              value="Trans"
              control={
                <Checkbox
                  value={!specialties.checkedTrans}
                  color="primary"
                  checked={specialties.checkedTrans}
                  onChange={(event) =>
                    setSpecialties({
                      ...specialties,
                      checkedTrans: Boolean(event.target.value),
                    })
                  }
                  name="checkedTrans"
                />
              }
              label="Transformation Cut"
              labelPlacement="end"
            /> */}
            {/* <FormControlLabel
              value="Long"
              control={
                <Checkbox
                  value={!specialties.checkedLong}
                  color="primary"
                  checked={specialties.checkedLong}
                  onChange={(event) =>
                    setSpecialties({
                      ...specialties,
                      checkedLong: Boolean(event.target.value),
                    })
                  }
                  name="checkedLong"
                />
              }
              label="Long Hair"
              labelPlacement="end"
            />
            <FormControlLabel
              value="Color"
              control={
                <Checkbox
                  value={!specialties.checkedColor}
                  color="primary"
                  checked={specialties.checkedColor}
                  onChange={(event) =>
                    setSpecialties({
                      ...specialties,
                      checkedColor: Boolean(event.target.value),
                    })
                  }
                  name="checkedColor"
                />
              }
              label="Color"
              labelPlacement="end"
            />
            <FormControlLabel
              value="Curly"
              control={
                <Checkbox
                  value={!specialties.checkedCurly}
                  color="primary"
                  checked={specialties.checkedCurly}
                  onChange={(event) =>
                    setSpecialties({
                      ...specialties,
                      checkedCurly: Boolean(event.target.value),
                    })
                  }
                  name="checkedCurly"
                />
              }
              label="Curly"
              labelPlacement="end"
            />
            <FormControlLabel
              value="Textured"
              control={
                <Checkbox
                  value={!specialties.checkedTextured}
                  color="primary"
                  checked={specialties.checkedTextured}
                  onChange={(event) =>
                    setSpecialties({
                      ...specialties,
                      checkedTextured: Boolean(event.target.value),
                    })
                  }
                  name="checkedTextured"
                />
              }
              label="Textured Hair"
              labelPlacement="end"
            />
          </FormGroup>
        </FormControl>
      </div> */}
      <div>
        <label htmlFor="specialties">
          Specialties
          <input
            type="text"
            name="specialties"
            value={barber.specialties}
            required
            onChange={(event) =>
              setBarber({ ...barber, specialties: event.target.value })
            }
          />
        </label>
      </div>
      <div>
        <label htmlFor="phoneNumber">
          Phone
          <input
            type="text"
            name="phoneNumber"
            value={barber.phoneNumber}
            required
            onChange={(event) =>
              setBarber({ ...barber, phoneNumber: event.target.value })
            }
          />
        </label>
      </div>
      <div>
        <label htmlFor="website">
          Website
          <input
            type="text"
            name="website"
            value={barber.website}
            required
            onChange={(event) =>
              setBarber({ ...barber, website: event.target.value })
            }
          />
        </label>
      </div>
      <div>
        <label htmlFor="facebook">
          Facebook
          <input
            type="text"
            name="facebook"
            value={barber.facebook}
            required
            onChange={(event) =>
              setBarber({ ...barber, facebook: event.target.value })
            }
          />
        </label>
      </div>
      <div>
        <label htmlFor="instagram">
          Instagram
          <input
            type="text"
            name="instagram"
            value={barber.instagram}
            required
            onChange={(event) =>
              setBarber({ ...barber, instagram: event.target.value })
            }
          />
        </label>
      </div>
      <div>
        <label htmlFor="address">
          Address
          <input
            type="text"
            name="address"
            value={barber.address}
            required
            onChange={(event) =>
              setBarber({ ...barber, address: event.target.value })
            }
          />
        </label>
      </div>
      <div>
        <label htmlFor="avatar_link">
          Profile Picture url
          <input
            type="text"
            name="avatar_link"
            value={barber.avatar_link}
            required
            onChange={(event) =>
              setBarber({ ...barber, avatar_link: event.target.value })
            }
          />
        </label>
      </div>
      <div>
        <FormControl component="fieldset">
          <FormLabel component="legend">User Role:</FormLabel>
          <RadioGroup aria-label="position" row>
            <FormControlLabel
              value="client"
              control={<Radio />}
              label="I am a client of this stylist/barber"
              onChange={(event) =>
                setBarber({ ...barber, role: event.target.value })
              }
            />
            <FormControlLabel
              value="barber"
              control={<Radio />}
              label="I am this stylist/barber"
              onChange={(event) =>
                setBarber({ ...barber, role: event.target.value })
              }
            />
          </RadioGroup>
        </FormControl>
      </div>
      <div>
        <input
          className="btn"
          type="button"
          name="submit"
          value="Add Barber"
          onClick={handleSubmit}
        />
      </div>
    </form>
  );
}

export default AddBarberForm;
