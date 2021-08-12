import {useState} from 'react';
import { useSelector } from 'react-redux';

function Search(){

    const [searchTerm, setSearchTerm] = useState("")
    const barbers = useSelector((store) => store.barbers.barbers);
    console.log(searchTerm, "SEARCH TERM");
    return(
        <>
        <form>
    <input type="text" placeholder="Search..." onChange={(event) => {setSearchTerm(event.target.value)}}/>
    <button type="submit">submit</button>
    </form>

{barbers.filter((val) => {
    
    if(searchTerm == ""){
        return val
    }else if (searchTerm.length > 0 && val.address.includes(searchTerm)){
        return val
    }
    }).map((val, key) => {

    return(
        <div className="searchResults" key={key}>
<p>{val.full_name}</p>
<p>{val.address}</p>
        </div>
    )
})}
    </>
    )

}

export default Search;