import React, { Fragment, useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { getProduct, updateProduct } from '../../actions/ProductActions';
import { clearError,clearProductUpdated } from '../../slices/ProductSlice';
import { toast} from 'react-toastify'
export default function UpdateProduct() {
 
    const [name,setName] = useState("");
    const [price,setPrice] = useState("");
    const [description,setDescription] = useState("");
    const [category,setCategory] = useState("");
    const [seller,setSeller] = useState("");
    const [stock,setStock] = useState(0);
    const [images,setImages] = useState([]);
    const [imagesCleared,setImagesCleared] = useState(false);
    const [imagesPreview,setImagesPreview] = useState([]);
  
    const {loading,error,isProductUpdated,product=[]} = useSelector(state => state.productState)
  
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
    const {id:productId} = useParams();
  
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
      formData.append('imagesCleared',imagesCleared);
      dispatch(updateProduct(productId,formData))
    }

    const ClearImagesHandler = () =>{
        setImages([]);
        setImagesPreview([]);
        setImagesCleared(true);
    }
  
    useEffect(() =>{
      if(isProductUpdated){
        toast('Product Updated Successfully',{
            type:'success',
            onOpen:() => dispatch(clearProductUpdated())
        })
        setImages([]);
        return;
    }
  
    if(error){
        toast(error,{
            type:'error',
            onOpen: () =>{dispatch(clearError())}
        })
        return;
    }
    dispatch(getProduct(productId))
  
    },[isProductUpdated,error,dispatch])

    useEffect(() =>{
        if(product._id){
            setName(product.name);
            setPrice(product.price);
            setDescription(product.description);
            setCategory(product.category);
            setStock(product.stock);
            setSeller(product.seller);
            product.images.forEach(image =>{
                images.push(image.image)
            });
            setImagesPreview(images);
        }

    },[product])
  
    return (
          <div className='row'>
          <div className='col-12 col-md-2'>
              <Sidebar/>
          </div>
          <div className='col-12 col-md-10'>
                <Fragment>
                <div className="container container-fluid">
                <div className="wrapper my-5"> 
                <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                    <h1 className="mb-4">Update Product</h1>
  
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
                        <select value={category} onChange={e => setCategory(e.target.value)} className="form-control" id="category_field">
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

                            {imagesPreview.length > 0 && <span className='mr-2' onClick={ClearImagesHandler} style={{cursor:"pointer"}}><i className='fa fa-trash'></i></span>}

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
                      UPDATE
                    </button>
  
                  </form>
            </div>
        </div>
                </Fragment>           
          </div>
        
          </div>
      
    )
}
