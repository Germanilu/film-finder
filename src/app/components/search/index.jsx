import { useSelector, useDispatch }                     from 'react-redux';
import React, { useState }                              from 'react';
import { get,map, isEmpty }             from 'lodash';
import { IoIosArrowRoundForward, IoIosArrowRoundBack }  from "react-icons/io";
import { previousStep}                                  from '@/app/redux/action';
import axios                                            from 'axios';
import './index.scss';

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

        console.log(url)
        //options for get
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: bearerToken
          }
        };

        const result = await axios.get(url,options)
        debugger
        if(isEmpty(result.data.results)){
          setErrorMsg("We're sorry, but we couldn't find any movies");
        }
        if(result.status === 200 && !isEmpty(result.data.results)){
          setMovies(result.data.results)
          debugger
        }
        } catch (error) {
          console.log(error);
          setErrorMsg("We're sorry, but we couldn't find any movies");
        }

  
   
    }

    return(
        <div className='search-container'>
            <p>These are the filters you have selected</p>
              <div className="selected-filters-box">
                  <div className="box">
                    <p>Year</p>
                    <p>{selectedYear} +</p>
                  </div>
                  <div className="box">
                    <p>Avg. Rating</p>
                    <p>{selectedRating}</p>
                  </div>
                  <div className="box">
                    <p>Category</p>
                    <p>{selectedcategory}</p>
                  </div>
                  <div className="box">
                    <p>Actors</p>
                    <p>{selectedactors}</p>
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
                {
                  movies &&
                  <>
                    {
                      map(movies,movie => {
                        debugger
                        return (
                          <div className='movie-box'>
                            <p className='movie-title'>{movie.title}</p>
                            <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt="" />
                          </div>
                        )
                      })
                    }
                  </>
                  }
              </div>
        </div>
    )
}

export default Search;

