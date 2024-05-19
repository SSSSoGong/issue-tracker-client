import { useParams } from "react-router-dom";

function MetaInfo() {
    const {idx} = useParams();
    return (
        <h1>MetaInfo {idx}</h1>
    );
}


export default MetaInfo;