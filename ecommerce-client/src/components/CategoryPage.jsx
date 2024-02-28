import React, { useEffect, useState } from 'react'
import axios from "axios";

const CategoryPage =() =>{
    const [categories, setCategories] = useState([]);
    const [data, setData] = useState();
    useEffect(() => {
        fetchAllCategories();
      }, []);
      const handleChange = (e) => {
        console.log(e.target.name, e.target.value);
        let name = e.target.name;
        let value = e.target.value;
        setData({ ...data, [name]: value });
      };
      const fetchAllCategories =()=>{
        axios
        .get("http://localhost:3000/category").then((response) => {
            setCategories(response.data.data);
          });
      }
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log("from handleSubmit", data);
        axios
          .post("http://localhost:3000/category", data)
          .then((res) => {
            fetchAllCategories();
            setData({}); 
          })
          .catch((err) => console.log(err));
        
      };
  return (
    <>
    <div>CategoryPage</div>
    <form>
        <input type="text" name="category_name" id="" placeholder='Enter category name' onChange={handleChange}></input><br/><br/>
        <input type="text" name="category_discription" id="" placeholder='Enter description' onChange={handleChange}></input><br/><br/>
        <button type='submit' onClick={handleSubmit}>Add</button>
    </form>
    <div>
        <table>
            <thead>
                <tr>
                    <th>Sr</th>
                    <th>Name</th>
                    <th>Discription</th>
                    <th>status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
            {categories.map((category, index) => (
              <tr key={index + 1}>
                <td>{index + 1}</td>
                <td>{category.category_name}</td>
                <td>{category.category_discription}</td>
                <td>{category.category_status ? "Active" : "Inactive"}</td>
                <td>
                  <button onClick={(e) => handleEdit(category.id)}>Edit</button>
                  <button onClick={(e) => handleDelete(category.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            </tbody>
        </table>
    </div>
      </>
  )
}

export default CategoryPage

