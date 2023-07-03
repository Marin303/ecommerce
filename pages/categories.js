import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Categories() {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [parentCategory, setParentCategory] = useState("");
  const [editedCategory, setEditedCategory] = useState(null);
  useEffect(() => {
    fetchCategories();
  }, []);
  function fetchCategories() {
    axios.get("/api/categories").then((result) => {
      setCategories(result.data);
    });
  }
  async function saveCategory(ev) {
    ev.preventDefault();
    const data =  {name, parentCategory} 
    if (editedCategory) {
      data._id = editedCategory._id
      await axios.put("/api/categories", data);
      setEditedCategory(null)
    } else {
      await axios.post("/api/categories", data);
      setName("");
    }
    setName('')
    fetchCategories()
  }
  function editCategory(category) {
    setEditedCategory(category);
    setName(category.name);
    setParentCategory(category.parent?._id);
  }
  return (
    <Layout>
      <h1>Categories</h1>
      <label>
        {editedCategory
          ? `Edit category ${editedCategory.name}`
          : "Create new category"}
      </label>
      <form className="flex gap-1" onSubmit={saveCategory}>
        <input
          type="text"
          placeholder={"Category name"}
          className="mb-0"
          value={name}
          onChange={ev => setName(ev.target.value)}
        />
        <select
          className="mb-0"
          value={parentCategory}
          onChange={ev => setParentCategory(ev.target.value)}
        >
          <option value="0">No parent category</option>
          {categories.length > 0 &&
            categories.map(category => (
              <option key={category._id} value={category._id}>{category.name}</option>
            ))}
        </select>
        <button className="btn-primary py-1" type="submit">
          Save
        </button>
      </form>
      <table className="basic mt-4">
        <thead>
          <tr>
            <td>Category name</td>
            <td>Parent Category</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 &&
            categories.map(category => (
              <tr key={category._id}>
                <td>{category.name}</td>
                <td>{category?.parent?.name}</td>
                <td>
                  <button
                    onClick={() => editCategory(category)}
                    className="btn-primary mr-1"
                  >
                    Edit
                  </button>
                  <button className="btn-primary">Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
}
