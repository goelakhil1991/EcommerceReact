import {useState} from 'react'
import type {FormEvent} from 'react'

function AddProduct() {

    const [productName, setProductName] = useState<string>('')
    const [price, setPrice] = useState<number>(0)
    const [category, setCategory] = useState<string>('')
    const [description, setDescription] = useState<string>('')

    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
  event.preventDefault()

  const newProduct = {
    name: productName,
    price: price,
    category: category,
    description: description
  }


    console.log('New Product:', newProduct)

    setProductName('')
setPrice(0)
setCategory('')
setDescription('')
  
}
  return (
    <div className="add-product">
      <h2>Add New Product</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Name</label>
          <input type="text" placeholder="Enter product name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required />
        </div>

        <div>
          <label>Price</label>
          <input type="number" placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
            min="1" />
        </div>

        <div>
          <label>Category</label>
          <input type="text" placeholder="Enter category"
            value={category}
            onChange={(e) => setCategory(e.target.value)} 
            required/>
        </div>

        <div>
          <label>Description</label>
          <textarea placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)} />
        </div>

        <button type="submit">Add Product</button>
      </form>
    </div>
  )
}




export default AddProduct