"use client"
import useSWR from "swr"
import { useSelector } from "react-redux"
import { RootState } from "./store"
import Users from "./components/users/users"
import { getUsersData } from "./lib/data"

export default function Home() {
  const { data: usersData, error: usersError } = useSWR(
    "usersData",
    getUsersData
  )

  const { list, loading, error } = useSelector(
    (state: RootState) => state.users
  )

  if (loading && !usersData) {
    return <main className="body">Loading...</main>
  }

  if (error || usersError) {
    return <main className="body">Error: {error || usersError?.message}</main>
  }

  return <Users data={list} />
}
