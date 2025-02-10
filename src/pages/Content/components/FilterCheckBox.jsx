import React, { useContext } from 'react';
import {Types} from '../../../../utils/constants';
import { GlobalContext } from '../context/GlobalState';

const FilterCheckBox = () => {
  const{setTypeValues} = useContext(GlobalContext);

  return (
    <fieldset className='filterCheckOptions'>
     
     {
      Types.map(type => (
        <div className='filterCheckOptionsItem'>        
        <input type='checkbox' name='filterCheck' value={type} onChange={(e) => { 
          if(e.target.checked){
            setTypeValues(prev => [...prev, e.target.value]);
          }else{
            setTypeValues(prev => prev.filter(item => item !== e.target.value));
          }
          }} /> 
        <label for={type}>{type}</label>
        </div>
      ))

     }
       
    </fieldset>
  )
}

export default FilterCheckBox;