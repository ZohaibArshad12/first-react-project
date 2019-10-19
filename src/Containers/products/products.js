import React, { useState, useEffect } from 'react';
import axios from '../../../axios';


const ProductsList = () => {

    useEffect(() => {
         const [loading, setLoading] = useState(true)
        });

    axios.get('products').then(response => {
      if (response.status === 200) {
        const products = { ...response.data };
        console.log('Products = ', products);
        
        // this.setState({ firstName: user.firstName, lastName: user.lastName, email: user.email, _id: user._id, isLoading: false });

      } 
    //   else {
    //     alert(`Getting Products Error, Status Code: ${response.status} , Status Text : ${response.statusText}`)
    //     this.setState({ isLoading: false, error: true });
    //     setTimeout(() => {
    //       this.setState({ error: false });
    //     }, 2000);
    //   }
    // }).catch(err => {
    //   this.setState({ isLoading: false, error: true });
    //   setTimeout(() => {
    //     this.setState({ error: false });
    //   }, 2000);
    //   console.log('Error Getting Users Me : ', err);
    // })


    });

    return <renderList />;
}

const renderList = () => {
      
    return <h1>{loading}</h1>;
};

export default ProductsList;