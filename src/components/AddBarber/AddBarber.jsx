import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// import Checkbox from '@material-ui/core/Checkbox';
// import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { FormGroup } from '@material-ui/core';
import { Radio, RadioGroup } from '@material-ui/core';
import { Checkbox } from '@material-ui/core';

   
function AddBarberForm() {
    const dispatch = useDispatch();

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

const [barber, setBarber] = useState({
fullName: "",
pronouns: "",
specialties: "",
phoneNumber: "",
website: "",
facebook: "",
instagram: "",
address: "",
avatar_link: "",
role: ""
  })
  
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
  

// const [specialties, setSpecialties] = useState([
//   {checkedFade: false},
//   {checkedTrans: false},
//   {checkedLong: false},
//   {checkedColor: false},
//   {checkedCurly: false},
//   {checkedTextured: false},


// ]);
// const handleCheck = (event) => {
//   setSpecialties({ ...specialties, [event.target.name]: event.target.checked });
// };

  const handleSubmit = () => {
    event.preventDefault();

    dispatch({
      type: 'POST_BARBER',
      payload: barber,})
     
    setBarber({fullName: "",
    pronouns: "",
    specialties: "",
    phoneNumber: "",
    website: "",
    facebook: "",
    instagram: "",
    address: "",
    avatar_link: "",
    role: ""})
  
};
  return (
    <form className="formPanel" >
      <h2>Add Barber/Stylist</h2>
        
      <div>
        <label htmlFor="fullName">
          Full Name:
          <input
            type="text"
            name="fullName"
            value={barber.fullName}
            required
            onChange={(event) => setBarber({...barber, fullName: event.target.value})}
          />
        </label>
      </div>
      <div>
        <label htmlFor="pronouns">
          Pronouns:
          <input
            type="text"
            name="pronouns"
            value={barber.pronouns}
            required
            onChange={(event) => setBarber({...barber, pronouns: event.target.value})}
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
              color="primary"
              checked={specialties.checkedFade}
              onChange={handleCheck}
              name="checkedFade" />}
          label="Fade"
          labelPlacement="end"
        />
      <FormControlLabel
          value="Trans"
          control={
            <Checkbox 
             color="primary"
              checked={specialties.checkedTrans}
              onChange={handleCheck}
              name="checkedTrans" />}
          label="Transformation Cut"
          labelPlacement="end"
        />
         <FormControlLabel
          value="Long"
          control={
            <Checkbox 
             color="primary"
              checked={specialties.checkedLong}
              onChange={handleCheck}
              name="checkedLong" />}
          label="Long Hair"
          labelPlacement="end"
        />
         <FormControlLabel
          value="Color"
          control={<Checkbox 
             color="primary"
              checked={specialties.checkedColor}
              onChange={handleCheck}
              name="checkedColor" />}
          label="Color"
          labelPlacement="end"
        />
         <FormControlLabel
          value="Curly"
          control={<Checkbox 
            color="primary"
              checked={specialties.checkedCurly}
              onChange={handleCheck}
              name="checkedCurly" />}
          label="Curly"
          labelPlacement="end"
        />
         <FormControlLabel
          value="Textured"
          control={<Checkbox color="primary"
              checked={specialties.checkedTextured}
              onChange={handleCheck}
              name="checkedTextured" />}
          label="Textured Hair"
          labelPlacement="end"
        />
         </FormGroup>
    </FormControl>
    </div> */}
    <div>
        <label htmlFor="phoneNumber">
          Phone:
          <input
            type="text"
            name="phoneNumber"
            value={barber.phoneNumber}
            required
            onChange={(event) => setBarber({...barber, phoneNumber: event.target.value})}
          />
        </label>
      </div>
      <div>
        <label htmlFor="website">
          Website:
          <input
            type="text"
            name="website"
            value={barber.website}
            required
            onChange={(event) => setBarber({...barber, website: event.target.value})}
          />
        </label>
      </div>
      <div>
        <label htmlFor="facebook">
          Facebook:
          <input
            type="text"
            name="facebook"
            value={barber.facebook}
            required
            onChange={(event) => setBarber({...barber, facebook: event.target.value})}
          />
        </label>
      </div>
      <div>
        <label htmlFor="instagram">
          Instagram:
          <input
            type="text"
            name="instagram"
            value={barber.instagram}
            required
            onChange={(event) => setBarber({...barber, instagram: event.target.value})}
          />
        </label>
      </div>
      <div>
        <label htmlFor="address">
          Address:
          <input
            type="text"
            name="address"
            value={barber.address}
            required
            onChange={(event) => setBarber({...barber, address: event.target.value})}
          />
        </label>
      </div>
      <div>
        <label htmlFor="avatar_link">
          Profile Picture url:
          <input
            type="text"
            name="avatar_link"
            value={barber.avatar_link}
            required
            onChange={(event) => setBarber({...barber, avatar_link: event.target.value})}
          />
        </label>
      </div>
      {/* <div>
      <FormControl component="fieldset">
      <FormLabel component="legend">User Role:</FormLabel>
      <RadioGroup aria-label="position" row>
      <FormControlLabel
          value="client"
          control={<Radio/>} label="I am a client of this stylist/barber"
        />
      <FormControlLabel
          value="barber"
          control={<Radio/>} label="I am this stylist/barber"
        />
         </RadioGroup>
    </FormControl>
      </div> */}
      <div>
        <input className="btn" type="button" name="submit" value="Add Barber" onClick={handleSubmit}/>
      </div>
    </form>
  )
};

export default AddBarberForm;
