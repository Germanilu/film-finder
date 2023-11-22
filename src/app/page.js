"use client"

import { useState } from 'react';
import { get,includes,pull } from 'lodash';

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

    const foo = () =>  {
      console.log("inputValueDate",filterData)
      console.log("State category",category)


      //url base
      let url = `https://api.themoviedb.org/3/discover/movie?`;

      //Primary Filter Keys
      const movieYearKey = 'primary_release_year';
      const voteAverageKey ='vote_average.gte';
      const choosenCategoryKey ='with_genres';

      console.log("aaaaa",get(filterData,'inputReview'))
      //To get correct year 
      const actualYear = 2023;
      let chosenYearAge = actualYear - parseInt(filterData.inputDate)


      //building url
      url = `${url}${movieYearKey}=${chosenYearAge}&${voteAverageKey}=${filterData.inputReview}&${choosenCategoryKey}=`
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


      
        <label>Choose your interests:</label>
        <ul>
            <li>
                <input type="checkbox" id="action" name="action" value="28" onClick={addCheckbox}/>
                <label for="interest1">action</label>
            </li>
            <li>
                <input type="checkbox" id="adventure" name="adventure" value="12"  onClick={addCheckbox}/>
                <label for="interest2">adventure</label>
            </li>
            <li>
                <input type="checkbox" id="animation" name="animation" value="16"  onClick={addCheckbox}/>
                <label for="interest3">animation</label>
            </li>
           
        </ul>



        <button type="button" onClick={() => foo()}>click</button>
      </form>

    </div>

  )
}



//PENNDIENTE, MAPEAR LOS NUMEROS EN EL ARRAY DE CATEGORIA, TRANSFORMARLOS A STRING Y AÑADIR EL & PARA DEVOLVERLO COMO CADENA DE TEXTO Y METERLO EN LA URL

