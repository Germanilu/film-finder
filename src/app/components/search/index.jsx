import { useSelector, useDispatch }                     from 'react-redux';
import React, { useState }                              from 'react';
import { get,map, isEmpty, find }             from 'lodash';
import { IoIosArrowRoundForward, IoIosArrowRoundBack }  from "react-icons/io";
import {GoStarFill  }  from "react-icons/go";
import { previousStep}                                  from '@/app/redux/action';
import axios                                            from 'axios';
import Card from '@/app/components/card/index';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import './index.scss';
import externalData                                     from '@/app/data';
import { Pagination } from 'swiper/modules';
const Search = () => {

  const dispatch = useDispatch();

  const selectedYear =  useSelector((state) =>  get(state,'FilterData.year.year',null));
  const selectedRating =  useSelector((state) =>  get(state,'FilterData.reviewRating',null));
  const selectedactors =  useSelector((state) =>  get(state,'FilterData.actors',null));
  const selectedcategory =  useSelector((state) =>  get(state,'FilterData.category',null));

  const state = useSelector((state) => state);
  const bearerToken = process.env.NEXT_PUBLIC_BEARER_TOKEN;

  const [movies, setMovies] = useState()
  const [errorMsg, setErrorMsg] = useState()

    /**
     * @method
     * Prepare data to fetch
     * 
     * @returns {Function} getMovie with processedData Object with all the filters informations
     */
    const prepareData = () => {
        //To join categories array into string
        const joinValueInCategory = selectedcategory.join('&')
        
        //To get correct year 
        const date = `${selectedYear}-01-01`

        //To join actors array into string
        const joinValueInActors = selectedactors.join('|')

        //To get reviewRating
        const {reviewRating} = get(state,'FilterData')
        return {
            primaryReleaseDate  : date,
            voteAverage         : reviewRating,
            categories          : joinValueInCategory,
            actors              : joinValueInActors
        }
        
    }
    
    
    const getMovie = async () =>  {
        try {
          const processedData = prepareData();
        //url base
        let url = `https://api.themoviedb.org/3/discover/movie?`;
  
        //Primary Filter Keys
        const movieYearKey = 'primary_release_date.gte';
        const voteAverageKey ='vote_average.gte';
        const choosenCategoryKey ='with_genres';
        const actorsKey ='with_cast';
  
  
        //building url
        url = `${url}${movieYearKey}=${get(processedData,'primaryReleaseDate')}&${voteAverageKey}=${get(processedData,'voteAverage')}&${choosenCategoryKey}=${get(processedData,'categories')}&${actorsKey}=${get(processedData,'actors')}`;

        //options for get
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: bearerToken
          }
        };

        const result = await axios.get(url,options)
        if(isEmpty(result.data.results)){
          setErrorMsg("We're sorry, but we couldn't find any movies");
        }
        if(result.status === 200 && !isEmpty(result.data.results)){
          setMovies(result.data.results)
        }
        } catch (error) {
          console.log(error);
          setErrorMsg("We're sorry, but we couldn't find any movies");
        }   
    }


    /**
     * Convert the actor id into string with actual names
     * @param {Array} id Array of ids  
     * @returns {String} String with actors names
     */
    const getActor = (id) => {
      let actorName = "| ";
      map(id,id => {
        const actorObject = find(externalData.actors.data, {'id': id})
        actorName += `${actorObject.name} | `
      })
      return actorName
    }

    const getCategory = (id) => {
      let category = "| ";
      map(id,id => {
        const categoryObject = find(externalData.categories.data, {'id': id})
        category += `${categoryObject.name} | `
      })
      return category
    }

    return(
        <div className='search-container'>
            <p className='title'>These are the filters you have selected</p>
              <div className="selected-filters-box">
                  <div className="box">
                    <span>Year</span>
                    <span className='data'>{selectedYear == 1923 ? "Any Date":`${selectedYear} +` }</span>
                  </div>
                  <div className="box">
                    <span>Avg. Rating</span>
                    <span className='data'>{selectedRating} + <GoStarFill color='#FFD700'/></span>
                  </div>
                  <div className="box">
                    <span>Category</span>
                    <span className='data'>{getCategory(selectedcategory)}</span>
                  </div>
                  <div className="box">
                    <span>Actors</span>
                    <span className='data'>{getActor(selectedactors)}</span>
                  </div>

              </div>
              <div className="buttons">
                <div className='previous-step' onClick={() => dispatch(previousStep())}><IoIosArrowRoundBack/>Step 4</div>
                <div className='next-step' onClick={getMovie}>Search</div>
              </div>

              <div className="result-container">
                {
                  errorMsg && 
                  <p className="error-message">{errorMsg}</p>
                }
                  <Swiper
                    slidesPerView={4}
                    spaceBetween={30}
                    centeredSlides={true}
                    pagination={{
                      clickable: true,
                    }}
                    modules={[Pagination]}
                    className="mySwiper"
                  >
 
                {
                  movies &&
                  <>
                    {
                      map(movies,movie => {
                        return (
                          <SwiperSlide><Card movie={movie}/></SwiperSlide>
                          )
                        })
                      }
                  </>
                  }
                  </Swiper>
              </div>
        </div>
    )
}

export default Search;

