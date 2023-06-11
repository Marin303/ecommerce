import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export default function ProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images: existingImages,
}) {
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [images, setImages] = useState(existingImages || [])
  const [goToProduct, setGoToProduct] = useState(false);

  const router = useRouter();

  /* console.log({_id}) */

  async function saveProduct(e) {
    const data = { title, description, price };
    e.preventDefault();
    if (_id) {
      //update
      await axios.put("/api/products", { ...data, _id });
    } else {
      //create
      await axios.post("/api/products", data);
    }
    setGoToProduct(true);
  }
  if (goToProduct) {
    router.push("/products");
  }
  async function uploadImage(ev) {
    const files = ev.target?.files;
    if (files?.length > 0) {
      const data = new FormData();
      for(const file of files){
        data.append("file", file)
      }

     const res = await axios.post("/api/upload",data) 
     setImages(oldImages => {
      return [...oldImages, ...res.data.links]
     })
     /*  const res = await axios.post("/api/upload", data, {
        headers: {"Content-Type":"multipart/form-data"} })*/
      
      /* console.log(res.data); */
    }
  }
  return (
    <form onSubmit={saveProduct}>
      <label>Product name</label>
      <input
        type="text"
        placeholder="product name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label>Photos</label>
      <div className="mb-2 flex flex-wrap gap-2">
        {!!images?.length && images.map(link =>(
          <div key={link} className="h-24">
            <img src={link} alt="" className="rounded-lg"/>
          </div>
        ))}
        <label className="bg-gray-200 w-24 h-24 cursor-pointer rounded-md text-gray-500 text-sm gap-1 text-center flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
          <div>Upload</div>
          <input type="file" onChange={uploadImage} className="hidden" />
        </label>
        {!images?.length && <div>No photos in this product</div>}
      </div>
      <label>Description</label>
      <textarea
        placeholder="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>

      <label>Price</label>
      <input
        text="number"
        placeholder="price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <button type="submit" className="btn-primary">
        Save
      </button>
    </form>
  );
}
