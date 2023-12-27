import { useSelector, useDispatch, useState }             from 'react-redux';
import { get,includes,pull,map, lowerCase }     from 'lodash';
import { IoIosArrowRoundForward, IoIosArrowRoundBack }  from "react-icons/io";
import { previousStep}     from '@/app/redux/action'
import './index.scss';

const Search = () => {

  const dispatch = useDispatch();


  const selectedYear =  useSelector((state) =>  get(state,'FilterData.year.year',null));
  const selectedRating =  useSelector((state) =>  get(state,'FilterData.reviewRating',null));
  const selectedactors =  useSelector((state) =>  get(state,'FilterData.actors',null));
  const selectedcategory =  useSelector((state) =>  get(state,'FilterData.category',null));

  const state = useSelector((state) => state);
  const bearerToken = process.env.NEXT_PUBLIC_BEARER_TOKEN;

  const [result, setResult] = useState([])

    /**
     * @method
     * Prepare data to fetch
     * 
     * @returns {Function} getMovie with processedData Object with all the filters informations
     */
    const prepareData = () => {
      debugger
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
    
    
    const getMovie = () =>  {


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
  
        //fetch url
        fetch(url, options)
          .then(response => response.json())
          .then(response => setResult(response))
          .then(response => console.log(response))
          .catch(err => console.error(err));
    }

    console.log("EE",response)
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

              <div className="result-container"></div>
        </div>
    )
}

export default Search;

