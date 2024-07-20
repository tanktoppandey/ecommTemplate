import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CreateProduct.scss';

const CreateProduct = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [isNew, setIsNew] = useState(false);
  const [type, setType] = useState('');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [img, setImg] = useState(null);
  const [img2, setImg2] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);
  const [img2Preview, setImg2Preview] = useState(null);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Fetch categories and subcategories
    const fetchCategories = async () => {
      try {
        const categoriesRes = await axios.get('http://localhost:1337/api/categories');
        console.log('Categories Response:', categoriesRes);
        setCategories(categoriesRes.data.data || []);
      } catch (error) {
        console.error('Failed to fetch categories', error);
      }
    };

    const fetchSubCategories = async () => {
      try {
        const subCategoriesRes = await axios.get('http://localhost:1337/api/sub-categories');
        console.log('Subcategories Response:', subCategoriesRes);
        setSubCategories(subCategoriesRes.data.data || []);
      } catch (error) {
        console.error('Failed to fetch subcategories', error);
      }
    };

    fetchCategories();
    fetchSubCategories();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImg(file);
    setImgPreview(URL.createObjectURL(file));
  };

  const handleImage2Change = (e) => {
    const file = e.target.files[0];
    setImg2(file);
    setImg2Preview(URL.createObjectURL(file));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!title) newErrors.title = 'Title is required';
    else if (title.length > 25) newErrors.title = 'Title must be less than 25 characters';
    if (!desc) newErrors.desc = 'Description is required';
    if (!price) newErrors.price = 'Price is required';
    else if (isNaN(price)) newErrors.price = 'Price must be a number';
    if (!img) newErrors.img = 'Image is required';
    if (!img2) newErrors.img2 = 'Second image is required';
    if (!category) newErrors.category = 'Category is required';
    if (!subCategory) newErrors.subCategory = 'Subcategory is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();

    // Constructing the data object
    const data = {
      "title": title,
      "desc": desc,
      "price": parseFloat(price),
      "isNew": isNew,
      "type": type,
      "categories":parseInt(category),
      "sub_categories":parseInt(subCategory),
      
    };

    // Appending the data object as a string
    formData.append('data', JSON.stringify(data));
    // Appending the images
    formData.append('files.img', img);
    formData.append('files.img2', img2);
    

   console.log(formData)

    try {
      const response = await axios.post(
        'http://localhost:1337/api/products',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer 9d8eeef664b00c62f4b5da55cede70df9aa94b830e13317500a11fa8de242486cf295c9839a21df620366698deb617c50d274cc3df456237023e64bc01aebed2453e67ecff5e74f04d66818b645033e77f2c63b6c4e6565a608fcadc791cfdc4a317a5977e15f0585be7cffc637684e0abbe8d50db50012d1f40b01441e15b10'
          }
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  return (
    <form className="create-product-form" onSubmit={handleSubmit}>
      <h2>Create New Product</h2>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={errors.title ? 'error' : ''}
          required
        />
        {errors.title && <span className="error-message">{errors.title}</span>}
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className={errors.desc ? 'error' : ''}
          required
        ></textarea>
        {errors.desc && <span className="error-message">{errors.desc}</span>}
      </div>
      <div className="form-group">
        <label>Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className={errors.price ? 'error' : ''}
          required
        />
        {errors.price && <span className="error-message">{errors.price}</span>}
      </div>
      <div className="form-group">
        <label>
          <input type="checkbox" checked={isNew} onChange={(e) => setIsNew(e.target.checked)} />
          Is New
        </label>
      </div>
      <div className="form-group">
        <label>Type</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">None</option>
          <option value="trending">Trending</option>
          <option value="featured">Featured</option>
        </select>
      </div>
      <div className="form-group">
        <label>Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select Category</option>
          {Array.isArray(categories) && categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.attributes.title}</option>
          ))}
        </select>
        {errors.category && <span className="error-message">{errors.category}</span>}
      </div>
      <div className="form-group">
        <label>Subcategory</label>
        <select value={subCategory} onChange={(e) => setSubCategory(e.target.value)}>
          <option value="">Select Subcategory</option>
          {Array.isArray(subCategories) && subCategories.map(subCat => (
  <option key={subCat.id} value={subCat.id}>{subCat.attributes.title}</option>
))}

        </select>
        {errors.subCategory && <span className="error-message">{errors.subCategory}</span>}
      </div>
      <div className="form-group full-width">
        <label>Image 1</label>
        <input
          type="file"
          onChange={handleImageChange}
          className={errors.img ? 'error' : ''}
          required
        />
        {imgPreview && <img src={imgPreview} alt="Image Preview" className="img-preview" />}
        {errors.img && <span className="error-message">{errors.img}</span>}
      </div>
      <div className="form-group full-width">
        <label>Image 2</label>
        <input
          type="file"
          onChange={handleImage2Change}
          className={errors.img2 ? 'error' : ''}
          required
        />
        {img2Preview && <img src={img2Preview} alt="Image Preview" className="img-preview" />}
        {errors.img2 && <span className="error-message">{errors.img2}</span>}
      </div>
      <button type="submit">Create Product</button>
    </form>
  );
};

export default CreateProduct;
