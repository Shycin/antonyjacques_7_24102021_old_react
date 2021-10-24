/* eslint-disable no-unused-vars */
import { useEffect } from 'react'
import { uid } from 'react-uid'
import '../css/listFiltre.scss'
import recipe from '../data/recipe'

const ListFiltre = () => {
  const arrayCategories = [
    { name: 'Ingédients', show: false, items: [] },
    { name: 'Appareil', show: false, items: [] },
    { name: 'Ustensiles', show: false, items: [] },
  ]

  useEffect(() => {
    console.log(recipe)
    recipe.map((item) => {
      console.log(item)
      item.ingredients.map((itemIngredient) => {
        arrayCategories
          .map((cat) => cat.item)
          .filter((cat) => cat.name === 'Ingédients')

        return false
      })
      //   item.ingredients.map((itemIngredient) => {
      //     console.log(
      //       arrayCategories.map().filter((cat) => cat.name === 'Ingédients')
      //     )
      //     return false
      //   })
      //   console.log(item.ingredients.ingredient, item.appliance, item.ustensils)
      //   return false
      return false
    })
  }, [])

  return (
    <div className='CategoriesSearch'>
      {arrayCategories.map((item, key) => (
        <ul
          key={uid(key)}
          id='order_list'
          aria-activedescendant='order-0'
          tabIndex='-1'
          role='listbox'
          aria-labelledby='order_label'
        />
      ))}
    </div>
  )
}
export default ListFiltre
