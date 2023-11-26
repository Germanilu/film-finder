"use client"

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { get,includes,pull,map, lowerCase } from 'lodash';

import Years from '@/app/components/filters/years/index';
import ReviewRating from '@/app/components/filters/review-rating/index';
import Category from '@/app/components/filters/category/index';
export default function Home() {

  const bearerToken = process.env.NEXT_PUBLIC_BEARER_TOKEN;

  const [filterData, setFilterData] = useState({
    year:'',
    reviewRating:'',
    category:[]
  });

  // const [category, setCategory] = useState([])
  
  /**
   * Getting State
   */
  const FilterDataState = useSelector((state) => state.FilterData);

  useEffect(() => {
  })

  //Actualizo el objeto filterData con todos los filtros que se insertan
  const handleInputChange = (event) => {
    setFilterData({...filterData, [event.target.name]: event.target.value})
  };


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



 console.log("REDUX: FILTERDATA ",FilterDataState)
//  console.log("STATE: FILTERDATA ",filterData)
  return (
    <div className='home'>
      <h1>App que aconseja peliculas</h1>

      {
        get(FilterDataState,'step') == 0 &&
          <Years handleInputChange={handleInputChange} filterData={filterData}/>
      }


      {
        get(FilterDataState,'step') == 1 &&
          <ReviewRating handleInputChange={handleInputChange} filterData={filterData}/>
      }

{
        get(FilterDataState,'step') == 2 &&
          <Category handleInputChange={handleInputChange} filterData={filterData} setFilterData={setFilterData}/>
      }

      

      
      

        
        {/* <button type="button" onClick={() => getMovie()}>click</button> */}
      
    </div>

  )
}



//PENNDIENTE, MAPEAR LOS NUMEROS EN EL ARRAY DE CATEGORIA, TRANSFORMARLOS A STRING Y AÑADIR EL & PARA DEVOLVERLO COMO CADENA DE TEXTO Y METERLO EN LA URL

