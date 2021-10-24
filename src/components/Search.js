/* eslint-disable jsx-a11y/label-has-associated-control */
import { useContext } from 'react'
import { searchContext } from '../context/searchContext'
import '../css/searchBar.scss'

const Search = () => {
  const { search, setSearch } = useContext(searchContext)

  const searchEngine = (e) => {
    if (e.target.textLength > 0) {
      if (e.key === 'Enter') {
        // submit element to search
        setSearch([...search, e.target.value])
      } else {
        // make search in algorithm
      }
    }
  }

  return (
    <div className='SearchBar'>
      <input
        id='inputSearch'
        onKeyDown={searchEngine}
        name='s'
        placeholder='Rechercher un ingrédient, appareil, ustensiles ou une recette'
      />
      <label
        type='text'
        htmlFor='inputSearch'
        className='search-icon fas fa-search'
      />
    </div>
  )
}
export default Search
