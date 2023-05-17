import React from 'react'
import { useDispatch } from 'react-redux';
import { remove } from '../store/userSlice';
import moment from 'moment/moment';
const Userdetail = (props) => {
    // const storageItem = localStorage.getItem('userdata');
    // let [storageItem, setstorageItem] = useState([])
    // storageItem = localStorage.getItem('userdata');

    // useEffect(() => {
    //     window.addEventListener('storage', () => {
    //         // When local storage changes, dump the list to
    //         // the console.
    //         setstorageItem(JSON.parse(localStorage.getItem('userdata')) || [])
    //     });
    // }, [])
    const dispatch = useDispatch()
    
    const { user, index, clickedit, getData, clickview }=props;
    const handleDelete=(index)=>{
        console.log(index)
        dispatch(remove(index))
        getData();
    }
        return (
            <tr>
                <th>{`${user.firstname}  ${user.lastname}`} </th>
                <th>{moment(user.date).format("MM/DD/YYYY")}</th>
                <th>{user.contact}</th>
                <th>{user.gender}</th>
                <th><i class="fa fa-sharp fa-light fa-pencil mx-3" onClick={() => clickedit(user,index)}></i>
                    <i class="fas fa-eye" aria-hidden="true" onClick={() => clickview(user)}></i>
                    <i class="fa fa-sharp fa-light fa-trash-can mx-3 " onClick={()=>handleDelete(index)}></i></th>
            </tr>
        )   
}

export default Userdetail
