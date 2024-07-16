import { User } from "./definitions"
import { store } from "../store"
import { setUsers, setLoading, setError } from "../store/slices/usersSlice"
import { setNews, setLoadingNews, setErrorNews } from "../store/slices/newsSlice"

const urlNews = "https://newsapi.org/v2/top-headlines?country=us&apiKey=bf77250503694f40b8f4e2cbcf5bff10";

export async function createUser(user: User) {
  try {
    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
    if (response.ok) {
      console.log("User created successfully")
      return response.statusText
    } else {
      console.error("Error creating user:", response.statusText)
      return response.statusText
    }
  } catch (error) {
    console.error("Error creating user:", error)
    return error
  }
}

export const getUsersData = async () => {
  try {
    store.dispatch(setLoading(true))
    const response = await fetch("/api/users")
    if (!response.ok) {
      throw new Error("Error getting users")
    }
    const data = await response.json()
    store.dispatch(setUsers(data))
    return data
  } catch (error: any) {
    console.error("Error in GET request of users", error)
    store.dispatch(setError(error.message ?? "Unknown error"))
    return []
  } finally {
    store.dispatch(setLoading(false))
  }
}

export async function editUserData(user: User) {
  try {
    const response = await fetch("/api/users", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
    if (response.ok) {
      console.log("User updated successfully")
      return response.statusText
    } else {
      console.error("Error updating user:", response.statusText)
      return response.statusText
    }
  } catch (error) {
    console.error("Error updating user:", error)
    return error
  }
}

export async function deleteUserData(id: number) {
  try {
    const response = await fetch("/api/users", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
    if (response.ok) {
      console.log("User deleted successfully")
      return response.statusText
    } else {
      console.error("Error deleting user:", response.statusText)
      return response.statusText
    }
  } catch (error) {
    return error
  }
}

export async function getNews() {
  try {
    store.dispatch(setLoadingNews(true))
    const response = await fetch("/api/news")
    if (!response.ok) {
      throw new Error("Error getting news")
    }
    const data = await response.json()
    store.dispatch(setNews(data.articles))
    return data
  } catch (error: any) {
    console.error("Error in GET request of news", error)
    store.dispatch(setErrorNews(error.message ?? "Unknown error"))
    return []
  } finally {
    store.dispatch(setLoadingNews(false))
  }
}
