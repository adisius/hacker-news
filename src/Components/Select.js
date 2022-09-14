import { useState, useEffect } from 'react';
import '../Select.css';

export default function Select(props){

    const [firstLoad, setFirstLoad] = useState(true);

    useEffect(() => {
        if(!firstLoad) return

        const label = document.querySelector('.selected')
        const options = Array.from(document.querySelectorAll('.select .option'))
        
        options.forEach((option) => {
            const category = option.getAttribute("data-category");
            option.addEventListener('click', () => {
                props.handleChange(category);
                label.textContent = option.textContent;
            })
        })
        console.log(props.category)
        label.textContent = (props.category === "angular" ? "Angular" : (props.category === "react" ? "React" : (props.category === "vuejs" ? "Vuejs" : 'Select your news')))
    
        
        setFirstLoad(false)

    },[firstLoad, props])
    

    return(
    <>

        <div className="dropdown">
            <input type="checkbox" className="dropdown switch" id="filter-switch" hidden />
            <label htmlFor="filter-switch" className="options">
                <ul className="filter" role="listbox">
                    <li className="selected">
                        Select your news
                    </li>
                    <li>
                        <ul className="select">
                            <li className="option" data-category="angular">
                                <img src="/img/ico-angular.png" alt="" /> <span>Angular</span>
                            </li>
                            <li className="option" data-category="react">
                                <img src="/img/ico-react.png" alt="" /> <span>React</span>
                            </li>
                            <li className="option" data-category="vuejs">
                                <img src="/img/ico-vuejs.png" alt="" /> <span>Vuejs</span>
                            </li>
                        </ul>
                    </li>
                </ul>			
            </label>
        </div>
    </>
    )
    
}