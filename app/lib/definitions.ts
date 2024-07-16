export interface User {
  id: number
  name: string
  lastName: string
  age: number
  phone: string
  email: string
}

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
}

export interface SearchBarProps {
  onSearch: (term: string) => void
}

export interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (pageNumber: number) => void
}

export type Gender = "male" | "female"

export interface News {
  id: string;
  title: string;
  description: string;
  content: string;
  urlToImage: string;
  source: {
    name: string;
  };
  publishedAt: string;
}