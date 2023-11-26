"use client"

import { useEffect, useState } from 'react';
import { get,includes,pull,map, lowerCase } from 'lodash';
import externalData from '@/app/data';
import Years from '@/app/components/filters/years/index';
export default function Home() {

  const bearerToken = process.env.NEXT_PUBLIC_BEARER_TOKEN;

  const [filterData, setFilterData] = useState({
    inputDate:'',
    inputReview:'',
    category:[]
  });

  const [category, setCategory] = useState([])
  
  useEffect(() => {
    console.log("aaaa",filterData)
  })

  //Actualizo el objeto filterData con todos los filtros que se insertan
  const handleInputChange = (event) => {
    setFilterData({...filterData, [event.target.name]: event.target.value})
  };


    const getYear = (number) => {
      const actualYear = 2023;
      return actualYear - parseInt(number);
    }

    const getMovie = () =>  {
      const joinValueInCategory = category.join('&')

      //url base
      let url = `https://api.themoviedb.org/3/discover/movie?`;

      //Primary Filter Keys
      const movieYearKey = 'primary_release_year';
      const voteAverageKey ='vote_average.gte';
      const choosenCategoryKey ='with_genres';

      //To get correct year 
      const actualYear = 2023;
      let chosenYearAge = actualYear - parseInt(filterData.inputDate)


      //building url
      url = `${url}${movieYearKey}=${chosenYearAge}&${voteAverageKey}=${filterData.inputReview}&${choosenCategoryKey}=${joinValueInCategory}&person/31`
      
      //options for get
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: bearerToken
        }
      };


      //fetch url
      fetch(url, options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
  }



  const addCheckbox = (event) => {
    

    if(includes(category,event.target.defaultValue)){
      pull(category,event.target.defaultValue)
    }
    else if(!includes(category,event.target.defaultValue)){

      setCategory([...category,event.target.defaultValue])
    }
  }
 
  return (
    <div className='home'>
      <h1>App que aconseja peliculas</h1>


        <Years handleInputChange={handleInputChange} filterData={filterData}/>
      
        {/* <label for="inputDate">Quieres ver una peli, pero de hace cuantos años?</label>
        <input type='text' id='inputDate' name='inputDate'  onChange={handleInputChange}></input> */}

        {/* <label for="inputReview">Que media de valoraciones quieres?</label>
        <input type='text' id='inputReview' name='inputReview'   onChange={handleInputChange}></input> */}


      
        {/* <label>Choose your Category interests:</label>
        
        {
          map(get(externalData,'categories.data'), category => {
       
            return(
              <li>
                  <input type="checkbox" id={lowerCase(get(category,'name'))} name={lowerCase(get(category,'name'))} value={get(category,'data.id')} onClick={(addCheckbox)}/>
                  <label for={lowerCase(get(category,'name'))}>{get(category,'name')}</label>
              </li>  
            )
          })
        } */}

        
        {/* <button type="button" onClick={() => getMovie()}>click</button> */}
      
    </div>

  )
}



//PENNDIENTE, MAPEAR LOS NUMEROS EN EL ARRAY DE CATEGORIA, TRANSFORMARLOS A STRING Y AÑADIR EL & PARA DEVOLVERLO COMO CADENA DE TEXTO Y METERLO EN LA URL

