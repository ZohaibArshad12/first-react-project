import React, {
    useState,
    useEffect
  } from 'react';
  import axios from '../../../axios';
  import { Alert, Spinner, Table } from "react-bootstrap";
  
  
  const AddProducts = () => {
  return(<h1>In progress</h1>)
//     // const [loading, setLoading] = useState(false)
//     const [products, setProducts] = useState([])
//     const loadingState = useState(false);
//     const loading = loadingState[0];
//     const setLoading = loadingState[1];
  
//     useEffect(() => {
//       setLoading(true);
//       axios.get('products').then(response => {
//         if (response.status === 200) {
//           const products = [
//             ...response.data
//           ];
//           console.log('Products = ', products);
//           setProducts(products);
//           setLoading(false);
          
//           // this.setState({ firstName: user.firstName, lastName: user.lastName, email: user.email, _id: user._id, isLoading: false });
  
//         }
//         //   else {
//         //     alert(`Getting Products Error, Status Code: ${response.status} , Status Text : ${response.statusText}`)
//         //     this.setState({ isLoading: false, error: true });
//         //     setTimeout(() => {
//         //       this.setState({ error: false });
//         //     }, 2000);
//         //   }
//         // }).catch(err => {
//         //   this.setState({ isLoading: false, error: true });
//         //   setTimeout(() => {
//         //     this.setState({ error: false });
//         //   }, 2000);
//         //   console.log('Error Getting Users Me : ', err);
//         // })
  
  
//       });
//     },[]);
//   console.log('loading : ', loading);
  
//     return( 
//           <div> 
//             <RenderList loading={loading} products = {products} /> 
//           </div>
//       );
  }
  
  const RenderList = ({loading, products}) => {
    if (loading) {
    return( 
      <div> 
        <h1 > Loading {loading} </h1> 
      </div>
      ); 
    } else {
      return(
        <div>
  
        <Table striped bordered hover variant="dark" size='sm'>
          <TableHeader/>
  
            {products.map((product, index) => {
              return (
                <ProductRow
                  key={product._id}
                  index = {index}
                  product={product}
                  // deleteUser={() => this.removeUser(index)}
                  // editUser={() => this.editUser(user)}
                />
              );
            })}
  
          </Table>
        </div>
           );
    }
    
  };
  
  const TableHeader = () => {
    return(
     <thead>
       <tr>
         <th>#</th>
         <th>prod Name</th>
         <th>Price</th>
       </tr>
     </thead>)
       
   };
   
   const ProductRow = ({product, index}) => {
    return (
  
      <tbody>
      <tr 
      // className='table-row-pointer'  onClick = {  this.props.editUser } 
      >
      
        <td>{index}</td>
        <td>{product.name}</td>
        <td>{product.price}</td>
      </tr>
    </tbody>
  
    );
   }
  
  
  export default AddProducts;