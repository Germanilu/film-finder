"use client"

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { get} from 'lodash';

import Years from '@/app/components/filters/years/index';
import ReviewRating from '@/app/components/filters/review-rating/index';
import Category from '@/app/components/filters/category/index';
import Actors from '@/app/components/filters/actors/index';
import Search from '@/app/components/search/index';

export default function Home() {

  const [filterData, setFilterData] = useState({
    year:'',
    reviewRating:'',
    category:[],
    actors:[]
  });

  
  /**
   * Getting State
   */
  const FilterDataState = useSelector((state) => state.FilterData);

  //Actualizo el objeto filterData con todos los filtros que se insertan
  const handleInputChange = (event) => {
    setFilterData({...filterData, [event.target.name]: event.target.value})
  };

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
          <Category  filterData={filterData} setFilterData={setFilterData}/>
      }

      {
        get(FilterDataState,'step') == 3 &&
          <Actors  filterData={filterData} setFilterData={setFilterData}/>
      }

      {
        get(FilterDataState,'step') == 4 &&
          <Search  filterData={filterData} setFilterData={setFilterData}/>
      }
      
    </div>

  )
}

