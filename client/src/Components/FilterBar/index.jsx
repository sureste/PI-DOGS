import React  from "react";
import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterAbc, filterCreatedDog, filterByWeight , filterByMoods, getMoods, getAllDogs } from "../../redux/actions";
import '../FilterBar/FilterBar.css'


const FilterBar = ({setCurrentPage , setOrder}) => {

    const dispatch = useDispatch();

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(getAllDogs())
        setCurrentPage(1);
    }

    const handleAbcFilter = (e) => {
        e.preventDefault()
        dispatch(filterAbc(e.target.value))
        setCurrentPage(1)
        setOrder(e.target.value)
    }

    const handleFilterCreated = (e) => {
        dispatch(filterCreatedDog(e.target.value))
    }

    const handleWeightFilter = (e) => {
        e.preventDefault()
        dispatch(filterByWeight(e.target.value))
        setCurrentPage(1)
        setOrder(e.target.value)
    }

    useEffect(() => {
        dispatch(getMoods())
    }, [dispatch])

    const moodsName = useSelector(state => { return state.allMoods })


    const handleMoodFilter = (e) => {
        e.preventDefault()
        dispatch(filterByMoods(e.target.value))
        setCurrentPage(1)
    }
    return (
        <div className="main_bar">
            <div>
            <h3>Orden Alfabetico</h3>
            <select className="moodStyle" onChange={e => handleAbcFilter(e)}>
                <option key={1} value='asc'>Ascendente </option>
                <option key={2} value='desc'>Descendente </option>
            </select>
            </div>

            <div>
            <h3>Creados</h3>
            <select  className="selectStyle" onChange={e => handleFilterCreated(e)}>
                <option key={1} value='all'>All</option>
                <option key={2} value='created'>Created</option>
                <option key={3} value='api'>Api</option>
            </select>
            </div>

            <div>
            <h3>Temperamentos</h3>
            <select className="selectStyle" onChange={e => handleMoodFilter(e)}>
                <option key={1+'e'} value="all">protomood</option>
                {
                    moodsName.map(e => {
                        
                        return (
                            <option value={e.name} key={e.id} >{e.name}</option>
                            )
                        })
                    }
            </select>
            </div>

            <div>
            <h3>Por peso</h3>
            <select className="selectStyle" onChange={e => handleWeightFilter(e)}>
                <option key={1} value='all'>All</option>
                <option key={2} value='min'>Ligero a pesao</option>
                <option key={3} value='max'> Pesao a ligero</option>
            </select>
            </div>

            <button className="btn" onClick={e => { handleClick(e) }}> Rewoof </button>

        </div>
    )
}
export default FilterBar