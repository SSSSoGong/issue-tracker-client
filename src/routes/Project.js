import { useParams } from "react-router-dom";

function Project() {
    const {idx} = useParams();
    return (
        <h1>Project {idx}</h1>
    );
}


export default Project;