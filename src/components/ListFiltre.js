/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from 'react'
import { uid } from 'react-uid'
import { searchContext } from '../context/searchContext'
import '../css/listFiltre.scss'
import recipe from '../data/recipe'

const ListFiltre = () => {
  const { search, setSearch } = useContext(searchContext)
  const [arrayCategories, setArrayCategories] = useState([
    { name: 'Ingédients', show: false, items: [] },
    { name: 'Appareil', show: false, items: [] },
    { name: 'Ustensiles', show: false, items: [] },
  ])

  const [showList, setShowList] = useState(false)
  const isShow = (boolean) => (boolean ? '' : 'hidden')

  const verificationEvent = (e) =>
    e.keyCode === 32 ||
    e.key === ' ' ||
    e.code === 'Space' ||
    e.keyCode === 13 ||
    e.key === 'Enter' ||
    e.code === 'Enter'

  const addItem = (categorie, focus) => {
    const tempArray = [...arrayCategories]

    tempArray[tempArray.findIndex((x) => x.name === categorie)].items.push(
      focus.toLowerCase()
    )

    setArrayCategories(tempArray)
  }

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

  useEffect(() => {
    recipe.map((item) => {
      item.ingredients.map((itemIngredient) =>
        addItem('Ingédients', itemIngredient.ingredient)
      )

      addItem('Appareil', item.appliance)

      item.ustensils.map((itemUstensils) =>
        addItem('Ustensiles', itemUstensils)
      )
      return true
    })

    arrayCategories.map((cat, key) => {
      arrayCategories[key].items = cat.items.filter(
        (elem, index, self) => index === self.indexOf(elem)
      )
      return true
    })
  }, [])

  const showItem = (key) => {
    console.log('start')
    const tempArray = [...arrayCategories]

    if (tempArray[key].show) {
      tempArray[key].show = false
    } else {
      tempArray[key].show = true
    }

    setArrayCategories(tempArray)
  }

  return arrayCategories.map((item, key) => (
    <div className='CategoriesSearch'>
      <button
        onClick={() => showItem(key)}
        onKeyDown={(e) => (verificationEvent(e) ? showItem(key) : '')}
        type='button'
        aria-haspopup='listbox'
        aria-labelledby='order_label'
        aria-expanded='false'
        id='order_filtre'
        className='listbox__btn btn select'>
        <span className='listbox__btn__text'>{item.name}</span>
        <span className='fas fa-chevron-down' />
      </button>
      <ul
        key={uid(key)}
        id='order_list'
        aria-activedescendant='order-0'
        tabIndex='-1'
        role='listbox'
        aria-labelledby='order_label'
        className={`listbox__list ${isShow(item.show)}`}>
        {item.items.map((filtre, i) => (
          <li
            id={`order-${i}`}
            key={uid(filtre, i)}
            role='option'
            className={`listbox__elt ${
              search.indexOf(filtre) >= 0 ? 'hidden' : ''
            }`}
            tabIndex='0'
            onClick={() => searchEngine(filtre)}
            onKeyPress={(e) =>
              verificationEvent(e) ? searchEngine(filtre) : ''
            }
            aria-selected={search.indexOf(filtre) ? 'true' : 'false'}>
            {filtre}
          </li>
        ))}
      </ul>
    </div>
  ))
}
export default ListFiltre
