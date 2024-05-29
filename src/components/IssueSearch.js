import PropTypes from "prop-types";
import style from "../styles/IssueSearch.module.css"
import { priorities, states, categories } from "../source/constants";




function IssueSearch({title, issueCount, priority, state, category, reporter, fixer, assignee, handleChange, handleSubmit}){
    return(
        <div className={style.frame}>
            <form onSubmit={handleSubmit}>
                <div className={style.line}>
                    <div className={style.inputFrame}>
                        <label className={style.label} htmlFor="title">Title</label>
                        <input className={style.inputBox} type="text" id="title" name="title" value={title} onChange={handleChange}/> 
                    </div>
                    <div className={style.inputFrame}>
                        <label className={style.label} htmlFor="issueCount">Count</label>
                        <input className={style.inputBox} type="text" id="issueCount" name="issueCount" value={issueCount} onChange={handleChange}/>
                    </div>
                </div>
                <div className={style.line}>
                    <div className={style.inputFrame}>
                        <label className={style.label} htmlFor="reporter">Reporter</label>
                        <input className={style.inputBox} type="text" id="reporter" name="reporter" value={reporter} onChange={handleChange}/>
                    </div>
                    <div className={style.inputFrame}>
                        <label className={style.label} htmlFor="fixer">Fixer</label>
                        <input className={style.inputBox} type="text" id="fixer" name="fixer" value={fixer} onChange={handleChange}/>
                    </div>
                    <div className={style.inputFrame}>
                        <label className={style.label} htmlFor="assignee">Assignee</label>
                        <input className={style.inputBox} type="text" id="assignee" name="assignee" value={assignee} onChange={handleChange}/>
                    </div>
                </div>
                <div className={style.line}>

                    <div className={style.inputFrame}>
                        <label className={style.label} htmlFor="state">State</label>
                        <select className={style.selectBox} id="state" name="state" value={state} onChange={handleChange}>
                            <option value=""></option>
                            {states.map((item, idx) => (
                                <option key={idx} value={item}>{item}</option> 
                            ))}
                        </select>
                    </div>
                    
                    <div className={style.inputFrame}>
                        <label className={style.label} htmlFor="priority">Priority</label>
                        <select className={style.selectBox} id="priority" name="priority" value={priority} onChange={handleChange}>
                            <option value=""></option>
                            {priorities.map((item, idx) => (
                                <option key={idx} value={item}>{item}</option> 
                            ))}
                        </select>
                    </div>
                    
                    <div className={style.inputFrame}>
                        <label className={style.label} htmlFor="category">Catrgory</label>
                        <select className={style.selectBox} id="category" name="category" value={category} onChange={handleChange}>
                            <option value=""></option>
                            {categories.map((item, idx) => (
                                <option key={idx} value={item}>{item}</option> 
                            ))}
                        </select>
                    </div>
                    
                </div>
                    
                <button className={style.submitBtn} type="submit">검색</button>
            </form>
        </div>        
    );
}
IssueSearch.propTypes = {
    title : PropTypes.string.isRequired,
    issueCount : PropTypes.string.isRequired,
    priority : PropTypes.string.isRequired,
    state : PropTypes.string.isRequired,
    category : PropTypes.string.isRequired,
    reporter : PropTypes.string.isRequired,
    fixer : PropTypes.string.isRequired,
    assignee : PropTypes.string.isRequired,

    handleSubmit : PropTypes.func.isRequired,
    handleChange : PropTypes.func.isRequired,
}

export default IssueSearch;
