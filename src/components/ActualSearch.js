import { useContext } from 'react'
import { uid } from 'react-uid'
import { searchContext } from '../context/searchContext'
import '../css/actualSearch.scss'

const ActualSearch = () => {
  const { search, setSearch } = useContext(searchContext)

  const deleteItemSearch = (key) => {
    const newArr = [...search]
    newArr.splice(key, 1)
    setSearch(newArr)
  }

  const verificationEvent = (e) =>
    e.keyCode === 32 ||
    e.key === ' ' ||
    e.code === 'Space' ||
    e.keyCode === 13 ||
    e.key === 'Enter' ||
    e.code === 'Enter'

  return (
    <div className='ItemsSearch'>
      {search.map((element, key) => (
        <div
          tabIndex={0}
          role='button'
          className='ItemsSearch__item bg-primary'
          key={uid(key)}
          onClick={() => deleteItemSearch(key)}
          onKeyDown={(e) =>
            verificationEvent(e) ? deleteItemSearch(key) : ''
          }>
          <span>{element}</span>
          <span className='far fa-times-circle' />
        </div>
      ))}
    </div>
  )
}
export default ActualSearch
