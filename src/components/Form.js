import React, { useEffect, useState } from 'react'
import { add } from '../store/userSlice'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';



const Form = () => {
  const location = useLocation();
  // console.log("location😊",location)
  
  const [firstname, setfirstname] = useState('')
  const [lastname, setlastname] = useState('')
  const [contact, setcontact] = useState('')
  const [date, setdate] = useState('')
  const [gender, setgender] = useState('')
  const [initial, setinitial] = useState(true)
  const [isEdit, setisEdit] = useState(true)
  const dispatch = useDispatch()


  useEffect(() => {
    const user = (location && location.state && location.state.user) ? location.state.user : null
    setisEdit((location && location.state) ? location.state.isEdit : true)
    if (user) {
      setinitial(false);
      setfirstname(user.firstname)
      setlastname(user.lastname)
      setcontact(user.contact)
      setdate(user.date)
      setgender(user.gender)
    }
  }, [])

  const [Formerrors, setFormerrors] = useState()
  const formvalidation=()=>{
    const error={}
    const phoneregex="^[1-9]{10}$"
    let flag=false;
    if(!firstname){
      error.firstname="firstname cannot be Empty"
      flag=true
    }
    if(!lastname){
      error.lastname = "lastname cannot be Empty"
      flag=true
    }
    if(!date){
      error.date = "date cannot be Empty"
      flag=true
    }
    if(!contact){
      error.contact = "contact cannot be Empty"
      flag=true
    }
    else if(!contact.match(phoneregex)){
      error.contact = "phone number is not valid"
      flag=true
    }
    if(!gender){
      error.gender = "gender Not selected"
      flag=true
    }
    setFormerrors(error)
    return flag;
  }

  const navigate = useNavigate();
  const onclickHandler = (event) => {
    if(formvalidation()){
      return;
    }else{
      event.preventDefault();
      dispatch(add({
        firstname,
        lastname,
        gender,
        date,
        contact
      }))
      navigate("/view")
    }
  }
  const handleupdate = () => {
    if (formvalidation()) {
      return;
    } else {
    const i=location.state.index;
    const data = JSON.parse(localStorage.getItem("userdata"));
    const user={
      firstname,
      lastname,
      gender,
      date,
      contact
    }
    const udata = data.map((item, index) => {
      if (index === i) {
        return user;
      }
      else {
        return item;
      }
    })
    // console.log("udata", udata)
    localStorage.setItem("userdata", JSON.stringify(udata))
    navigate('./view')
  }
  }
  return (
    <div className='container'>
      <form className='container'>
        <div className="form-group">
          <label for="exampleInputEmail1">First Name</label>
          <input type="text" className="form-control" name="firstname" id="exampleInputEmail1" aria-describedby="emailHelp" value={firstname} placeholder="Enter First Name" disabled={initial ? false:isEdit?false:true} onChange={(event) =>{
            setfirstname(event.target.value);
            setFormerrors({...Formerrors, firstname:""})
          }}/>
          <span>{Formerrors?.firstname}</span>
        </div>

        <div className="form-group">
          <label for="exampleInputEmail1">Last Name</label>
          <input type="text" className="form-control" name="lastname" id="exampleInputEmail1" aria-describedby="emailHelp" value={lastname} placeholder="Enter Last Name" disabled={initial ? false : isEdit ? false : true} onChange={(event) =>{
            setlastname(event.target.value)
            setFormerrors({...Formerrors, lastname:""})
          }} />
          <span>{Formerrors?.lastname}</span>
        </div>

        <div className="row">
          <div className="col-md-2">
            <p>Birth Date:
              <input type="date" id="datepicker" name="date" size="5" value={date} 
              max={new Date().toISOString().split("T")[0]}
               className=" form-control" disabled={initial ? false : isEdit ? false : true} onChange={
            (event) =>{
              setdate(event.target.value)
              setFormerrors({ ...Formerrors, date:""})
            }}/></p>
          </div>
        </div>
        <span>{Formerrors?.date}</span>

{/* contact Number  */}
        <div className="form-group">
          <label for="exampleInputEmail1">Contact No.</label>
          <input type="tel" maxlength="10" className="form-control" name="contact" id="exampleInputEmail1" aria-describedby="emailHelp" disabled={initial ? false : isEdit ? false : true} value={contact} placeholder="Enter contact number" onChange={(event) =>{
            setcontact(event.target.value)
            setFormerrors({...Formerrors, contact:""})
          }} />
          <span>{Formerrors?.contact}</span>
        </div>

{/* gender */}
        <div>
          <label for="gender" className="mx-2" >Gender:</label>
          
          <input type="radio" id="male" name="gender" value="Male" disabled={initial ? false : isEdit ? false : true} checked={gender === "Male" ? true : false} onChange={(event) =>{
            setgender(event.target.value)
            setFormerrors({...Formerrors, gender:""})
          }} />
          <label for="male" className="mx-1" >  Male</label>
          <input type="radio" id="female" name="gender" value="Female" checked={gender === "Female" ? true : false} disabled={initial ? false : isEdit ? false : true} onChange={(event) => {
            setgender(event.target.value)
            setFormerrors({ ...Formerrors, gender:""})
          }} />
          <label for="female" className="mx-1"> Female</label>
          <span>{Formerrors?.gender}</span>
        </div>

        <button disabled={initial ? false : isEdit ? false : true} type="button" onClick={initial ? onclickHandler : isEdit ? handleupdate : true} className="btn btn-primary">submit</button>
      </form>
    </div>
  )
}

export default Form
