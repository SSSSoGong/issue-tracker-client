import { useParams } from "react-router-dom";

function DashBoard() {
    const {idx} = useParams();
    return (
        <h1>DashBoard {idx}</h1>
    );
}


export default DashBoard;
