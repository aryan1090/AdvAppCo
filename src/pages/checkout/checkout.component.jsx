import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component';

import {
  selectCartItems,
  selectCartTotal
} from '../../redux/cart/cart.selectors';

import {selectCurrentUser} from '../../redux/user/user.selectors';
import CustomButton from '../../components/custom-button/custom-button.component';

import { Link } from 'react-router-dom';
import './checkout.styles.scss';

const CheckoutPage = ({ cartItems, total,currentUser }) => (
  <div className='checkout-page'>
    <div className='checkout-header'>
      <div className='header-block'>
        <span>Product</span>
      </div>
      <div className='header-block'>
        <span>Description</span>
      </div>
      <div className='header-block'>
        <span>Quantity</span>
      </div>
      <div className='header-block'>
        <span>Price</span>
      </div>
      <div className='header-block'>
        <span>Remove</span>
      </div>
    </div>
    {cartItems.length!==0?
      (
        cartItems.map(cartItem => (
          <CheckoutItem key={cartItem.id} cartItem={cartItem} />
        ))
      )
      :
      
        <h1>Your cart is Empty!</h1>
      
    }
    {cartItems.length!==0?(
      <div className='total'>TOTAL: ${total}</div>
    ):(
      <span></span>
    )}
    
    {/* <div className='test-warning'>
      *Please use the following test credit card for payments*
      <br />
      4242 4242 4242 4242 - Exp: 01/20 - CVV: 123
    </div> */}
    {currentUser ? (
      <StripeCheckoutButton price={total} /> )
      :
        (// (<Link className='option' to='/signin'>
        //   SIGN IN TO CHECKOUT
        // </Link>
        <CustomButton inverted>
        <Link className = 'option' to='/signin'>
         SIGN IN TO CHECKOUT
         </Link>
      </CustomButton>
      ) }
    {/* <StripeCheckoutButton price={total} /> */}
  </div>
);

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal,
  currentUser: selectCurrentUser
});

export default connect(mapStateToProps)(CheckoutPage);
