"use client";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getBannerByID } from "@/app/action";

export default function EditProduct({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);

  const [banner, setBanner] = useState({
    store_name: '',
    cover_image_url: '',
    category: ''
  });
  // Fetch dữ liệu sản phẩm từ API
  useEffect(() => {
    if (id) {
      async function fetchProduct() {
        const res = await getBannerByID(parseInt(id));
        if (!res.banner) return;
        setBanner(res.banner);
      }
      fetchProduct();
    }
  }, [id]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setBanner((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (banner) {
      await fetch(`/api/banners/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(banner),
      })
        .then((response) => response.json())
        .then((data) => console.log("Product edited:", data))
        .catch((error) => console.error("Error:", error));
      router.push("/admin"); // Điều hướng về trang dashboard sau khi tạo
    } else {
      return <p>No banner edited!</p>;
    }
  };

  return (
    <div className="rounded bg-slate-300 max-w-min flex flex-col justify-center items-center mx-auto px-10 my-5">
      <h1 className="font-bold items-center flex text-center my-3 text-[1.25rem]">
        Edit Page Information
      </h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Page Name: </label>
          <input
            className="border-2 rounded-sm mx-2 my-1"
            type="text"
            name="store_name"
            value={banner.store_name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Category: <span className="font-bold text-xl">{banner.category}</span></label>
        </div>
        <div>
          <label>Cover Image URL </label>
          <input
            className="border-2 rounded-sm mx-2 my-1"
            type="url"
            name="cover_image_url"
            value={banner.cover_image_url}
            onChange={handleInputChange}
            required
          />
        </div>
        <button
          className="mx-2 my-1 px-2 py-1 rounded bg-green-400 items-center flex text-center"
          type="submit"
        >
          Edit Banner
        </button>
      </form>
    </div>
  );
}
