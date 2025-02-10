import React, {useContext, useState} from 'react'
import { GlobalContext } from '../context/GlobalState'
import FilterCheckBox from './FilterCheckBox';
import FilterRadio from './FilterRadio';


const FilterComponent = () => {
    const{setBookmarkSearchValue, bookmarkSearchValue} = useContext(GlobalContext);
    const[isFilter, setIsFilter] = useState(false);

  return (
    <>
    <div className='filterContainer'>
         <input 
             type='text' 
             onChange={(e) => setBookmarkSearchValue(e.target.value.trim())}
             value={bookmarkSearchValue} 
             className='filterSearch-field' 
             placeholder='Search'
            />
            <svg 
              width="12" 
              height="12" 
              viewBox="0 0 12 12" 
              xmlns="http://www.w3.org/2000/svg"
              className='filterSearch-icon'
            >
              <path 
                fill-rule="evenodd" 
                clip-rule="evenodd" 
                d="M8.5 5.5a3 3 0 11-6 0 3 3 0 016 0zm-.393 3.668a4.5 4.5 0 111.06-1.06l2.613 2.612a.75.75 0 11-1.06 1.06L8.107 9.168z"
              />
            </svg>

            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 16 16" 
              onClick={() => setIsFilter(prev => !prev)}
              xmlns="http://www.w3.org/2000/svg"
              className={`filter-icon ${isFilter ? 'isFilter': ''}`}
            >
              <path 
                fill-rule="evenodd" 
                clip-rule="evenodd" 
                d="M8.5 8.379l.44-.44 4.56-4.56V2.5h-11v.879l4.56 4.56.44.44v4l1-1v-3zM10 12l-2.5 2.5L6 16V9L1.293 4.293A1 1 0 011 3.586V2a1 1 0 011-1h12a1 1 0 011 1v1.586a1 1 0 01-.293.707L10 9v3z"
              />
            </svg>
    </div>
    <div className={`filterOptionsWrapper ${isFilter ? 'optionsActive': ''}`}>
        <div className='filterCheckWrapper'>
           <span>filter by type</span>
           <FilterCheckBox/>
        </div>
        <div className='filterRadioWrapper'>
           <div className='filterRadioGroup'>
             <span>Sort By</span>
             <FilterRadio type='sortBy'/>
           </div>
           <div className='filterRadioGroup'>
            <span>Order By</span>
            <FilterRadio/>
           </div>
        </div>
         <div>

         </div>
    </div>

    </>
  )
}

export default FilterComponent