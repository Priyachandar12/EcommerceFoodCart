import React, { Fragment, useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { CreateNewProduct } from '../../actions/ProductActions';
import { clearProductCreated } from '../../slices/ProductSlice';
import { clearError } from '../../slices/ProductsSlice';
import { toast} from 'react-toastify'

export default function NewProduct() {
  const [name,setName] = useState("");
  const [price,setPrice] = useState("");
  const [description,setDescription] = useState("");
  const [category,setCategory] = useState("");
  const [seller,setSeller] = useState("");
  const [stock,setStock] = useState(0);
  const [images,setImages] = useState([]);
  const [imagesPreview,setImagesPreview] = useState([]);

  const {loading,error,isProductCreated} = useSelector(state => state.productState)

  const categories = [
                'Electronics',
                'Mobile Phones',
                'Laptops',
                'Accessories',
                'Headphones',
                'Food',
                'Books',
                'Clothes/Shoes',
                'Beauty/Health',
                'Sports',
                'Outdoor',
                'Home'
  ];

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const OnImagesChange = (e) =>{
    const files = Array.from(e.target.files);

    files.forEach(file =>{
      const reader = new FileReader();
      reader.onload = () =>{
        if(reader.readyState ===2){
          setImagesPreview(oldImage => [...oldImage,reader.result])
          setImages(oldImage =>[...oldImage,file])
        }
      }
      reader.readAsDataURL(file);
    })

  }

  const submitHandler = (e) =>{
    e.preventDefault();
    const formData = new FormData();
    formData.append('name',name);
    formData.append('price',price);
    formData.append('description',description);
    formData.append('category',category);
    formData.append('stock',stock);
    formData.append('seller',seller);
    images.forEach(image =>{
      formData.append('images',image)
    })
    console.log(formData)
    dispatch(CreateNewProduct(formData))
  }

  useEffect(() =>{
    if(isProductCreated){
      toast('Product Created Successfully',{
          type:'success',
          onOpen:() => dispatch(clearProductCreated())
      })
      navigate('/admin/products')
      return;
  }

  if(error){
      toast(error,{
          type:'error',
          onOpen: () =>{dispatch(clearError())}
      })
      return;
  }

  },[isProductCreated,error,dispatch,navigate])

  return (
        <div className='row'>
        <div className='col-12 col-md-2'>
            <Sidebar/>
        </div>
        <div className='col-12 col-md-10'>
            <h1 className="my-4">Product List</h1>
              <Fragment>
              <div className="container container-fluid">
              <div className="wrapper my-5"> 
              <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                  <h1 className="mb-4">New Product</h1>

                  <div className="form-group">
                    <label htmlFor="name_field">Name</label>
                    <input
                      type="text"
                      id="name_field"
                      className="form-control"
                      onChange={e => setName(e.target.value)}
                      value={name}
                    />
                  </div>

                  <div className="form-group">
                      <label htmlFor="price_field">Price</label>
                      <input
                        type="text"
                        id="price_field"
                        className="form-control"
                        onChange={e => setPrice(e.target.value)}
                        value={price}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="description_field">Description</label>
                      <textarea className="form-control"  onChange={e => setDescription(e.target.value)}
                      value={description} id="description_field" rows="8" ></textarea>
                    </div>

                    <div className="form-group">
                      <label htmlFor="category_field">Category</label>
                      <select onChange={e => setCategory(e.target.value)} className="form-control" id="category_field">
                          <option value="">Select</option>
                          {
                            categories.map(category => (
                              <option key={category} value={category}>{category}</option>
                            ))
                          }
                        </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="stock_field">Stock</label>
                      <input
                        type="number"
                        id="stock_field"
                        className="form-control"
                        onChange={e => setStock(e.target.value)}
                        value={stock}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="seller_field">Seller Name</label>
                      <input
                        type="text"
                        id="seller_field"
                        className="form-control"
                        onChange={e => setSeller(e.target.value)}
                        value={seller}
                      />
                    </div>
                    
                    <div className='form-group'>
                      <label>Images</label>
                      
                          <div className='custom-file'>
                              <input
                                  type='file'
                                  name='product_images'
                                  className='custom-file-input'
                                  id='customFile'
                                  multiple
                                  onChange={OnImagesChange}
                              />
                              <label className='custom-file-label' htmlFor='customFile'>
                                  Choose Images
                              </label>
                          </div>
                          {imagesPreview.map(image => (
                            <img
                              className='mt-3 mr-2'
                              key={image}
                              src={image}
                              alt='Images Preview'
                              width="55"
                              height="52"                        
                            />
                          ))}
                  </div>

        
                  <button
                    id="login_button"
                    type="submit"
                    disabled={loading}
                    className="btn btn-block py-3"
                  >
                    CREATE
                  </button>

                </form>
          </div>
      </div>
              </Fragment>           
        </div>
      
        </div>
    
  )
}
