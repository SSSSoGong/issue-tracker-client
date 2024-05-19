import { useParams } from "react-router-dom";

function Filter() {
    const {idx} = useParams();
    return (
        <h1>Filter {idx}</h1>
    );
}


export default Filter;