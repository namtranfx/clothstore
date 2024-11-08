export interface StoreInfo {
    id: number
    store_name: string 
    cover_image_url: string
    category: string
};
export interface MenuItemType {
    id: string,
    title: string,
    url: string
};
export interface ProductImages {
    id: number
    product_id: number 
    image_url: string
};
export interface Products {
    id: number
    product_name: string
    product_description: string
    category: string
    price: number
    quantity: number
    ProductImages: ProductImages[]
}
