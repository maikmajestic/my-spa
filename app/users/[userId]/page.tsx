"use client"
import useSWR from "swr";
import EditUser from "@/app/components/users/editUser";
import { User } from "@/app/lib/definitions";
import { getUsersData } from "@/app/lib/data";

export default function Page({ params }: { params: { userId: string }}) {
  const { data: usersData, error: usersError } = useSWR('usersData', getUsersData);

  if (!usersData && !usersError) {
    return <main className="body">Loading...</main>;
  }

  const user = usersData.find((user: User) => user.id === parseInt(params.userId));

  if (!user) {
    return <main className="body">User Not found</main>;
  }

  return <EditUser user={user} />;
}
