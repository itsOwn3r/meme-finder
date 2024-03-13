"use client";
import React from 'react'
import { useRouter } from "next/navigation";

const Search = () => {
    const router = useRouter();
    const params = new URLSearchParams();

    const handleSearch = (search: string) => {
        params.set("search", search)
        router.push("/" + "?" + params, { scroll: false });
    }
    console.log(params);
  return (
    <div className="mt-10 flex flex-col">
        <p className="text-h4">Search through your memes:</p>
        <input onBlur={(e) => handleSearch(e.target.value)} type="text" name="search" className="bg-transparent border p-2 rounded-lg mt-2" placeholder="Search Here..." />
  </div>
  )
}

export default Search