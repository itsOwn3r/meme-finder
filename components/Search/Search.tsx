"use client";
import React from 'react'
import { useRouter, useSearchParams } from "next/navigation";

const Search = () => {
    const router = useRouter();
    const params = new URLSearchParams();
    const searchParams = useSearchParams();
    const currentSearchParams = searchParams.get("search");
    
    const handleSearch = (search: string) => {
      if (search === "") {
        return;
      }
        params.set("search", search)
        router.push("/" + "?" + params, { scroll: false });
    }
  return (
    <div className="mt-10 flex flex-col">
        <p className="text-h4">Search through your memes:</p>
        <input onBlur={(e) => handleSearch(e.target.value)} type="text" name="search" className="bg-transparent shadow-shine p-2 rounded-lg mt-2" placeholder={currentSearchParams ? currentSearchParams : "Search Here..."} />
  </div>
  )
}

export default Search