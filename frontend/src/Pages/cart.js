import { http } from "../remote"

export const handleAddtoCart = async (id,fetchCart) => {
    await http.put(`/cart/${id}`).then(() => fetchCart()).catch((e) => console.log(e))
}

export const handleRemovefromCart = async (id,fetchCart) => {
    await http.delete(`/cart/${id}`).then(() => fetchCart()).catch((e) => console.log(e))
  }
