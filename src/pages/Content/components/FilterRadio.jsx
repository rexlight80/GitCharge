import React, {useContext} from 'react'
import {SortBy, OrderBy} from '../../../../utils/constants'
import { GlobalContext } from '../context/GlobalState';

const FilterRadio = ({type}) => {
  const{setSortByValue, setOrderByValue} = useContext(GlobalContext)


  return (
    <fieldset className='filterRadioOptions'>
     {
      (type == 'sortBy' ? SortBy : OrderBy).map(radio => (
          <div className='filterRadioOptionsItem'>
          <input 
          type='radio' 
          name={`${type == 'sortBy' ? 'filterRadio1': 'filterRadio2'}`} 
          value={radio}
          onChange={(e) =>  {
            type == 'sortBy' ? setSortByValue(e.target.value): setOrderByValue(e.target.value)
        }}
          />
          <label for={radio}>{radio}</label>
          </div>
      ))
      }
      
   </fieldset>
  )
}

export default FilterRadio