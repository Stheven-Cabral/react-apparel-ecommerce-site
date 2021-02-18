import React from 'react';
import CustomButton from '../custom-button/custom-button.component';
import './collection-item.styles.scss';
import { connect } from 'react-redux';
import { addItem } from '../../redux/cart/cart.actions';

const CollectionItem = ({item, addItem}) => {
  const { name, price, imageUrl } = item;
  

  return (
  <div className='collection-item'>
    <div 
    className='image'
    style={{
      backgroundImage: `url(${imageUrl})`
    }}
    />
    <div className='collection-footer'>
      <span className='name'>{name}</span>
      <span className='price'>{price}</span>
    </div>
    <CustomButton onClick={() => addItem(item)} inverted>Add to cart</CustomButton>
  </div>
)}

const mapDispatchToProps = dispatch => ({
  addItem: item => dispatch(addItem(item))
});

// This function should be passed as the first argument to connect, and will be called every time when the Redux store state changes. If you do not wish to subscribe to the store, pass null or undefined to connect in place of mapStateToProps.
export default connect(null, mapDispatchToProps)(CollectionItem);