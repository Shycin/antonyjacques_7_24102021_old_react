/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from 'react'
import { uid } from 'react-uid'
import { searchContext } from '../context/searchContext'
import '../css/listFiltre.scss'
import recipe from '../data/recipe'

const ListFiltre = () => {
  const { search, setSearch } = useContext(searchContext)
  const [arrayCategories, setArrayCategories] = useState([
    { name: 'Ingrédients', class: 'bg-primary', show: false, items: [] },
    { name: 'Appareil', class: 'bg-lime', show: false, items: [] },
    { name: 'Ustensiles', class: 'bg-blood', show: false, items: [] },
  ])

  const [showList, setShowList] = useState(false)
  const isShow = (boolean) => (boolean ? '' : 'hidden')
  const isSelected = (boolean) => (boolean ? 'selected' : '')

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
      focus.split(' ')[0].toLowerCase()
    )

    setArrayCategories(tempArray)
  }

  const searchEngine = (e, class_) => {
    if (e.target.textLength > 0) {
      // submit element to search
      setSearch([...search, { value: e.target.value, class: class_ }])
    } else if (e.target.textContent) {
      // submit element to search
      setSearch([...search, { value: e.target.textContent, class: class_ }])
    }
  }

  useEffect(() => {
    recipe.map((item) => {
      item.ingredients.map((itemIngredient) =>
        addItem('Ingrédients', itemIngredient.ingredient)
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
    const tempArray = [...arrayCategories]

    if (document.getElementsByClassName('CategoriesSearch__categorie').length)
      Array.from(
        document.getElementsByClassName('CategoriesSearch__categorie')
      ).map((each, index) => {
        if (each.classList.contains('selected')) {
          tempArray[index].show = false
        }

        return true
      })

    if (tempArray[key].show) {
      tempArray[key].show = false
    } else {
      tempArray[key].show = true
    }

    setArrayCategories(tempArray)
  }

  return (
    <div className='CategoriesSearch'>
      {arrayCategories.map((item, key) => (
        <div
          className={`CategoriesSearch__categorie ${item.class} ${isSelected(
            item.show
          )}`}>
          <button
            onClick={() => showItem(key)}
            onKeyDown={(e) => (verificationEvent(e) ? showItem(key) : '')}
            type='button'
            aria-haspopup='listbox'
            aria-labelledby='order_label'
            aria-expanded='false'
            id='order_filtre'
            className={`CategoriesSearch__categorie__btn btn select ${isShow(
              !item.show
            )}`}>
            <span className='CategoriesSearch__categorie__btn__text'>
              {item.name.replace(/s$/, '')}
            </span>
            <span className='fas fa-chevron-down' />
          </button>
          <div
            className={`CategoriesSearch__categorie__SearchBar ${isShow(
              item.show
            )}`}>
            <input
              id='inputSearchinList'
              onKeyDown={null}
              name='s'
              placeholder={`Rechercher un ${
                item.name.charAt(0).toLowerCase() + item.name.slice(1)
              }`}
            />
            <label
              type='text'
              htmlFor='inputSearchinList'
              className='fas fa-chevron-up'
            />
          </div>
          <ul
            key={uid(key)}
            id='order_list'
            aria-activedescendant='order-0'
            tabIndex='-1'
            role='listbox'
            aria-labelledby='order_label'
            className={`CategoriesSearch__list 
            ${item.class} 
            ${isShow(item.show)}`}>
            {item.items.map((filtre, i) => (
              <li
                id={`order-${i}`}
                key={uid(filtre, i)}
                role='option'
                className={`CategoriesSearch__list__elt ${
                  search.indexOf(filtre) >= 0 ? 'hidden' : ''
                }`}
                tabIndex='0'
                onClick={(e) => searchEngine(e, item.class)}
                onKeyPress={(e) =>
                  verificationEvent(e) ? searchEngine(e, item.class) : ''
                }
                aria-selected={search.indexOf(filtre) ? 'true' : 'false'}>
                {filtre}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
export default ListFiltre
