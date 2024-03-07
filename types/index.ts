// ====== USER PARAMS
export type CreateUserParams = {
    clerkId: string
    firstName: string
    lastName: string
    username: string
    email: string
    photo: string
}
  
export type UpdateUserParams = {
    firstName: string
    lastName: string
    username: string
    photo: string
}

export type SearchParamProps = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

// EBOOK PARAMS
export type CreateEbookParams = {
  title: string;
  description?: string;
  imageUrl: string;
  price: string;
  pdfUrl: string;
  category: string;
  publisher: string;
  path: string;
};

export type UpdateEbookParams = {
  ebookId: string;
  title: string;
  description?: string;
  imageUrl: string;
  price: string;
  pdfUrl: string;
  category: string;
  publisher: string;
  path: string;
};

export type GetAllEbooksParams = {
  query: string;
  limit: number;
  page: number;
  category: string;
};

export type GetEbooksByUserParams = {
  userId: string
  limit?: number
  page: number
}
  
// CATEGORY PARAMS
export type createCategoryParams = {
  name: string;
  slug: string;
  parentCategory?: string;
}

export type updateCategoryParams = {
  categoryId: string;
  name: string;
}


// ====== ORDER PARAMS
export type CheckoutOrderParams = {
  ebookTitle: string
  ebookId: string
  price: string
  isFree: boolean
  buyerId: string
  imageUrl: string
}

export type CreateOrderParams = {
  stripeId: string
  ebookId: string
  buyerId: string
  totalAmount: string
  createdAt: Date
}

export type GetOrdersByEbookParams = {
  ebookId: string
  searchString: string
}

export type GetOrdersByUserParams = {
  userId: string | null
  limit?: number
  page: string | number | null
}

// URL PARAMS 
export type UrlQueryParams = {
  params: string
  key: string
  value: string | null
}

export type RemoveUrlQueryParams = {
  params: string
  keysToRemove: string[]
}