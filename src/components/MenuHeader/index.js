import React, { useEffect } from 'react';
import './style.css';
import { useSelector, useDispatch } from 'react-redux';
import { getConfigData } from '../../store/actions';

/**
* @author
* @function MenuHeader
**/

const MenuHeader = (props) => {

  const category = useSelector(state => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getConfigData());
  }, [dispatch]);


  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      if(category.parent_id === "13"){
        myCategories.push(
          <li key={category.category_id}>
            {
              category.parentId ? <a
                href={`/${category.slug}?cid=${category._id}&type=${category.type}`}>
                {category.name}
              </a> :
              <span>{category.name}</span>
            }
            {category.children.length > 0 ? (<ul>{renderChildCategories(category, category.category_id)}</ul>) : null}
          </li>
        );
      }
    }
    return myCategories;
  }

  const renderChildCategories = (categories, parent_id) => {
    let myCategories = [];
    for (let category of categories) {
      if(category.parent_id === parent_id){
        myCategories.push(
          <li key={category.category_id}>
            {
              category.parentId ? <a
                href={`/${category.slug}?cid=${category._id}&type=${category.type}`}>
                {category.name}
              </a> :
              <span>{category.name}</span>
            }
            {category.children.length > 0 ? (<ul>{renderChildCategories(category.category_id)}</ul>) : null}
          </li>
        );
      }
    }
    return myCategories;
  }

  return (
    <div className="menuHeader">
      <ul>
        {/* {category.categories.length > 0 ? renderCategories(category.categories) : null} */}
      </ul>
    </div>
  )

}

export default MenuHeader