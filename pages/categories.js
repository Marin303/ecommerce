import Layout from "@/components/Layout";
import axios from "axios";
import { useState } from "react";

export default function Categories() {
  const [name, setName] = useState("");
  async function saveCategory() {
   await axios.post('/api/categories', {name})
   setName('')
  }
  return (
    <Layout>
      <h1>Categories</h1>
      <label>New Category name</label>
      <form className="flex gap-1" onSubmit={saveCategory}>
        <input 
        type="text" 
        placeholder={"Category name"} 
        className="mb-0"
        value={name}
        onChange={ev => setName(ev.target.value)}
         />
        <button className="btn-primary py-1" type="submit">
          Save
        </button>
      </form>
    </Layout>
  );
}
