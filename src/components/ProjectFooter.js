import PropTypes from "prop-types";

function ProjectFooter({projectId}){
    return (
        <footer class="bg-light text-center text-lg-start">
            <h5 class="text-uppercase" style={{textAlign:"center"}}>Links</h5>
            <a href="#!" class="text-dark" style={{ textAlign: "center", width: "100%", display:"block" }}>Project Setting</a>
        </footer>
    );
}
ProjectFooter.propTypes = {
    projectId : PropTypes.number.isRequired
}


export default ProjectFooter;