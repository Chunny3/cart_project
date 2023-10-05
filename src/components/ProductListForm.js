import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductListForm = () => {
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    const handleAddProduct = (e) => {
        e.preventDefault();
        const newProduct = {
            id: Date.now(),
            name: name,
            price: price,
            description: description
        };

        setProducts([...products, newProduct]);
        console.log(products);
    };
    const handleRemoveProduct = (index) => {
        const updatedProducts = [...products];
        updatedProducts.splice(index, 1);
        setProducts(updatedProducts);
    };

    const navigate = useNavigate();
    const handleUpdateProduct = (index) => {
        const updatedProducts = [...products];
        updatedProducts.splice(index, 1);
        setProducts(updatedProducts);
        navigate('/user-management')
    };
    
    const handleNameChange = (e) => {
        setName(e.target.value);
    };
    const handlePriceChange = (e) => {
        setPrice(e.target.value);
    };
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };


    return (
        <div className="container">
            <form onSubmit={handleAddProduct}>
                <div className="mb-3">
                    <label htmlFor="productName" className="form-label">產品名稱:</label>
                    <input type="text" className="form-control" id="productName" value={name} onChange={handleNameChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="productPrice" className="form-label">價格:</label>
                    <input type="number" className="form-control" id="productPrice" value={price} onChange={handlePriceChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="productDescription" className="form-label">描述:</label>
                    <textarea className="form-control" id="productDescription" value={description} onChange={handleDescriptionChange} />
                </div>
                <button type="submit" className="btn btn-primary">新增產品</button>
            </form>

            {/* {products.length > 0 ? (
                <ul className="list-group">
                    {products.map((product, index) => (
                        <li className="list-group-item" key={product.id}>
                            <h5>{product.name}</h5>
                            <p>價格：{product.price}</p>
                            <p>描述：{product.description}</p>
                            <button className="btn btn-danger" onClick={() => handleRemoveProduct(index)}>移除產品</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>目前沒有任何產品。</p>
            )} */}

            {products.length > 0 ? (
                <table className="table table-striped mt-3">
                    <thead>
                        <tr>
                            <th scope="col">姓名</th>
                            <th scope="col">價格</th>
                            <th scope="col">描述</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.description}</td>
                                <td><button className="btn btn-danger" onClick={() => handleUpdateProduct()}>Update</button></td>
                                <td><button className="btn btn-danger" onClick={() => handleRemoveProduct()}>移除產品</button></td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="mt-3">目前沒有任何產品。</p>
            )}
        </div>
    );
};
export default ProductListForm;

