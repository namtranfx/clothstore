"use client";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getProductByID } from "@/app/action";

export default function EditProduct({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);

  const [product, setProduct] = useState({
    product_name: "",
    product_description: "",
    price: 0,
    quantity: 0,
    category: "",
    ProductImages: [{ image_url: "" }],
  });
  // Fetch dữ liệu sản phẩm từ API
  useEffect(() => {
    if (id) {
      async function fetchProduct() {
        const res = await getProductByID(parseInt(id));
        if (!res.prod) return;
        setProduct(res.prod);
      }
      fetchProduct();
    }
  }, [id]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    index?: number
  ) => {
    const { name, value } = e.target;

    if (name === "image_url" && typeof index === "number") {
      const updatedImgUrls = [...product.ProductImages];
      updatedImgUrls[index].image_url = value;
      setProduct((prev) => ({ ...prev, ProductImages: updatedImgUrls }));
    } else {
      setProduct((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddImageUrl = () => {
    setProduct((prev) => ({
      ...prev,
      ProductImages: [...prev.ProductImages, { image_url: "" }],
    }));
  };

  const handleRemoveImageUrl = (index: number) => {
    setProduct((prev) => ({
      ...prev,
      ProductImages: prev.ProductImages.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("product editing: ", JSON.stringify(product));
    if (product) {
      await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      })
        .then((response) => response.json())
        .then((data) => console.log("Product edited:", data))
        .catch((error) => console.error("Error:", error));
      router.push("/admin"); // Điều hướng về trang dashboard sau khi tạo
    } else {
      return <p>No product edited!</p>;
    }
  };

  return (
    <div className="rounded bg-slate-300 max-w-min flex flex-col justify-center items-center mx-auto px-10 my-5">
      <h1 className="font-bold items-center flex text-center my-3 text-[1.25rem]">
        Edit Product
      </h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product name: </label>
          <input
            className="border-2 rounded-sm mx-2 my-1"
            type="text"
            name="product_name"
            value={product.product_name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Product description: </label>
          <input
            className="border-2 rounded-sm mx-2 my-1"
            type="text"
            name="product_description"
            value={product.product_description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Price: </label>
          <input
            className="border-2 rounded-sm mx-2 my-1"
            type="number"
            name="price"
            value={product.price}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Quantity: </label>
          <input
            className="border-2 rounded-sm mx-2 my-1"
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Category: </label>
          <select
            className="border-2 rounded-sm mx-2 my-1"
            name="category"
            value={product.category}
            onChange={handleInputChange}
            required
          >
            <option value="">Chọn danh mục</option>
            <option value="featured">Featured</option>
            <option value="man">Men-clothing</option>
            <option value="woman">Woman-clothing</option>
          </select>
        </div>

        <div>
          <label>Danh sách ảnh (URL)</label>
          {product.ProductImages.map((img, index) => (
            <div key={index}>
              <input
                className="border-2 rounded-sm mx-2 my-1"
                type="url"
                name="image_url"
                value={img.image_url}
                onChange={(e) => handleInputChange(e, index)}
                required
              />
              {product.ProductImages.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveImageUrl(index)}
                  className="mx-2 px-2 rounded bg-red-200"
                >
                  Xóa
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddImageUrl}
            className="mx-2 my-1 px-2 py-1 bg-blue-300 rounded"
          >
            + Thêm URL ảnh
          </button>
        </div>

        <button
          className="mx-2 my-1 px-2 py-1 rounded bg-green-400 items-center flex text-center"
          type="submit"
        >
          Edit Product
        </button>
      </form>
    </div>
  );
}
