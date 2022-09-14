import { useState, useEffect } from 'react';
import '../Select.css';

export default function Select(props){

    const [firstLoad, setFirstLoad] = useState(true)
    

    useEffect(() => {
        if(!firstLoad) return

        const label = document.querySelector('.selected')
        const options = Array.from(document.querySelectorAll('.select .option'))
    
        options.forEach((option) => {
            const category = option.getAttribute("data-category");
            console.count(category)
            option.addEventListener('click', () => {
                props.handleChange(category);
                label.textContent = option.textContent;
            })
        })
    
        document.addEventListener('click', (e) => {
            const toggle = document.querySelector('.dropdown.switch')
            const element = e.target
    
            if (element === toggle) return;
    
            const isDropdownChild = element.closest('.filter')		
    
            if (!isDropdownChild) {
                toggle.checked = false;
            }
        })
        setFirstLoad(false)

    },[firstLoad, props])
    

    return(
    <>
        {/* <select name="language" id="language-select" onChange={e => props.handleChange(e.target.value)} hidden>
          <option value="angular">Angular</option>
          <option value="reactjs">React</option>
          <option value="vuejs">Vuejs</option>
        </select> */}

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