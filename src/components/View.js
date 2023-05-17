import { useEffect, useRef, useState } from 'react';
import Userdetail from './Userdetail'
import { useNavigate } from 'react-router-dom';
const View = () => {
  // const ref = useRef(null)
  const navigate = useNavigate();

  const [user, setuser] = useState()
  const [i, seti] = useState(-1)
  const [userData, setuserData] = useState([])
  const [FilterData, setFilterData] = useState([])
  const [search, setsearch] = useState('')

  let isEdit = 0;

  useEffect(() => {
    getData();
  }, [])

  const clickedit = (currentuser, i) => {
    console.log("user", currentuser)
    isEdit = 1; //state
    setuser(currentuser)
    seti(i);
    navigate("/", { state: { user: currentuser, isEdit: isEdit, index: i } })
  }

  const clickview = (currentuser) => {
    isEdit = 0;
    navigate("/", { state: { user: currentuser, isEdit: isEdit } })
  }

  // to load local storage data
  const getData = () => {
    setuserData(JSON.parse(localStorage.getItem("userdata")) || []);
    setFilterData(JSON.parse(localStorage.getItem("userdata")) || [])
  }

  useEffect(() => {
    if (search) {
      handlesearch()
    } else if (userData.length > 0) {
      setFilterData(userData)
    }
  }, [search])

  console.log('userData', userData)

  const handlesearch = () => {
    const filteredResults = userData.filter((item) => {
      const fullname = `${item.firstname} ${item.lastname}`
      return fullname.toLowerCase().includes(search.toLowerCase())
    });
    setFilterData(filteredResults)
  }

  return (
    <>
      <form class="form-inline mx-3 my-4 ">
        <input class="form-control mr-sm-2" onChange={(event) => {
          setsearch(event.target.value);
          handlesearch()
        }} type="search" placeholder="Search" aria-label="Search" />

        <button class="btn btn-outline-success my-2 my-sm-0" type="button">Search</button>
      </form>

      <div className="container">
        <table border={1} cellPadding={5}>
          <tr>
            <th>Name</th>
            <th>DOB(MM-DD-YYYY)</th>
            <th>Contact</th>
            <th>Gender</th>
            <th>option</th>
          </tr>
          {
            FilterData.map((element, index) => {
              return <Userdetail key={index} user={element} index={index} clickview={clickview} clickedit={clickedit} getData={getData} />
            })
          }
        </table>
      </div>
    </>
  )
}

export default View;