"use client"

import { useState } from 'react';
import { get,includes,pull,map, lowerCase } from 'lodash';
import externalData from '@/app/data';
export default function Home() {

  const [filterData, setFilterData] = useState({
    inputDate:'',
    inputReview:'',
    category:[]
  });

  const [category, setCategory] = useState([])
  

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
      url = `${url}${movieYearKey}=${chosenYearAge}&${voteAverageKey}=${filterData.inputReview}&${choosenCategoryKey}=${joinValueInCategory}`
      console.log(url)
      
      //options for get
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhN2FmOWFkZjMwYzcyNmYwMTRlMzhmMGUxOGM4NzU4NSIsInN1YiI6IjYyNmQ2ZGM4MjQ1ZGJlMDA2NTQzN2JkYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JaeivKd7GSDuwvuxMEObpoIa9CzatrNsdli9RBDHWPk'
        }
      };


      //fetch url
      fetch(url, options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
  }



  const addCheckbox = (event) => {
    console.log(event.target.defaultValue)
    

    if(includes(category,event.target.defaultValue)){
      console.log("Existe, asi que lo quito")
      pull(category,event.target.defaultValue)
    }
    else if(!includes(category,event.target.defaultValue)){
      console.log("NOOO Existe asi que lo añado")
      setCategory([...category,event.target.defaultValue])
    }

    
  }
  console.log(category)

  return (
    <div>

      <form>
        <label for="inputDate">Quieres ver una peli, pero de hace cuantos años?</label>
        <input type='text' id='inputDate' name='inputDate'  onChange={handleInputChange}></input>

        <label for="inputReview">Que media de valoraciones quieres?</label>
        <input type='text' id='inputReview' name='inputReview'   onChange={handleInputChange}></input>


      
        <label>Choose your Category interests:</label>
        
        {
          map(get(externalData,'categories'), category => {
       
            return(
              <li>
                  <input type="checkbox" id={lowerCase(category.name)} name={lowerCase(category.name)} value={category.value} onClick={addCheckbox}/>
                  <label for="action">{category.name}</label>
              </li>  
            )
          })
        }
        
        <button type="button" onClick={() => getMovie()}>click</button>
      </form>

    </div>

  )
}



//PENNDIENTE, MAPEAR LOS NUMEROS EN EL ARRAY DE CATEGORIA, TRANSFORMARLOS A STRING Y AÑADIR EL & PARA DEVOLVERLO COMO CADENA DE TEXTO Y METERLO EN LA URL

