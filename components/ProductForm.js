import { useRouter } from "next/router"


export default function ProductForm({
    title:existingTitle,
    description:existingDescription, 
    price:existingPrice
}){
    const [title, setTitle] = useState(existingTitle || '') 
    const [description, setDescription] = useState(existingDescription || '')
    const [price, setPrice] = useState(existingPrice || '')
    const [goToProduct, setGoToProduct] = useState(false)

    const router = useRouter()

    async function createProduct(e){
        e.preventDefault()
        const data = {title, description,price}
        await axios.post('/api/products', data)
        setGoToProduct(true)
    }
    if(goToProduct){
      router.push('/products')
    }
  return (
    <form onSubmit={createProduct}>
      <label>Product name</label>
      <input 
       type="text"
       placeholder="product name"
       value={title} 
       onChange={e => setTitle(e.target.value)}/>

      <label>Description</label>
      <textarea 
       placeholder="description"
       value={description} 
       onChange={e => setDescription(e.target.value)}>
      </textarea>

      <label>Price</label>
      <input
       text="number" 
       placeholder="price" 
       value={price} 
       onChange={e => setPrice(e.target.value)} />

      <button
       type="submit"
       className="btn-primary">Save</button>
    </form>
    )
}