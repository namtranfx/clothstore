"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Products, StoreInfo } from "@/lib/interface";
const itemsPerPage = 5;
const Admin: React.FC = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const [banners, setBanners] = useState<StoreInfo[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(
        `/api/products?page=${currentPage}&limit=${itemsPerPage}`
      );
      const data = await response.json();
      setProducts(data.products);
      setTotalPages(data.totalPages);

      const bannerRes = await fetch("/api/banners");
      const bannerData = await bannerRes.json();
      setBanners(bannerData.banners);
    };
    fetchProducts();
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  // Handle delete
  const handleDelete = async (id: number) => {
    if (confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
      await fetch(`/api/products/${id}`, { method: "DELETE" });
      setProducts(products.filter((product: Products) => product.id !== id));
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-row justify-between">
        <h1 className="flex font-bold text-[2rem]">Products</h1>
        <button
          className="flex text-[1.25rem] bg-blue-300 border-collapse px-2 py-1 my-1 rounded"
          onClick={() => router.push("/admin/products/new")}
        >
          + Create Product
        </button>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-300">
            <TableHead className="text-center">Product Name</TableHead>
            <TableHead className="text-center">Price</TableHead>
            <TableHead className="text-center">Quantity</TableHead>
            <TableHead className="text-center">Category</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.product_name}</TableCell>
              <TableCell className="text-center">{product.price}</TableCell>
              <TableCell className="text-center">{product.quantity}</TableCell>
              <TableCell className="text-center">{product.category}</TableCell>
              <TableCell className="text-center">
                <button
                  className="mr-2 px-2 py-1 rounded bg-blue-400 font-bold"
                  onClick={() =>
                    router.push(`/product/${product.id}`)
                  }
                >
                  View
                </button>
                <button
                  className="mr-2 px-2 py-1 rounded bg-blue-400 font-bold"
                  onClick={() =>
                    router.push(`/admin/products/edit/${product.id}`)
                  }
                >
                  Edit
                </button>
                <button
                  className="px-2 py-1 rounded bg-red-400 font-bold"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-l disabled:bg-gray-300"
        >
          Previous
        </button>
        <span className="px-3 py-2 bg-gray-100">
          {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded-r disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
      {/* BANNER AREA */}
      <div>
        <h1 className="flex font-bold text-[2rem]">Banner</h1>
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-300">
              <TableHead className="text-center">Page Name</TableHead>
              <TableHead className="text-center">Category</TableHead>
              <TableHead className="text-center">Cover Image URL</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {banners.map((banner) => (
              <TableRow key={banner.id}>
                <TableCell>{banner.store_name}</TableCell>
                <TableCell className="text-center">{banner.category}</TableCell>
                <TableCell>{banner.cover_image_url}</TableCell>
                <TableCell className="text-center">
                  <button
                    className="mr-2 px-2 py-1 rounded bg-blue-400 font-bold"
                    onClick={() =>
                      router.push(`/admin/banners/edit/${banner.id}`)
                    }
                  >
                    Edit
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Admin;
