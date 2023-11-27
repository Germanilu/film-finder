import { useSelector, useDispatch } from 'react-redux';
import { get,includes,pull,map, lowerCase } from 'lodash';
const Search = () => {
    const state = useSelector((state) => state);
    console.log("state",state)

    const bearerToken = process.env.NEXT_PUBLIC_BEARER_TOKEN;

    /**
     * @method
     * Prepare data to fetch
     * 
     * @returns {Function} getMovie with processedData Object with all the filters informations
     */
    const prepareData = () => {
        //To join categories array into string
        const {category} = get(state,'FilterData')
        const joinValueInCategory = category.join('&')
        
        //To get correct year 
        const {year} = get(state,'FilterData')
        const date = `${year}-01-01`

        //To join actors array into string
        const {actors} = get(state,'FilterData')
        const joinValueInActors = actors.join('|')

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
        debugger
        //url base
        let url = `https://api.themoviedb.org/3/discover/movie?`;
  
        //Primary Filter Keys
        const movieYearKey = 'primary_release_date.gte';
        const voteAverageKey ='vote_average.gte';
        const choosenCategoryKey ='with_genres';
        const actorsKey ='with_cast';
  
  
        //building url
        url = `${url}${movieYearKey}=${get(processedData,'primaryReleaseDate')}&${voteAverageKey}=${get(processedData,'voteAverage')}&${choosenCategoryKey}=${get(processedData,'categories')}&${actorsKey}=${get(processedData,'actors')}`
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
          .then(response => console.log(response))
          .catch(err => console.error(err));
    }

    
    return(
        <div>
            hola
            <button type="button" onClick={getMovie} >click</button>
        </div>
    )
}

export default Search;

