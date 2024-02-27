import React from 'react';

function SearchBar() {
  return (
    <div className="flex mx-auto max-w-xl">
      <input
        type="search"
        placeholder="Search"
        className="pl-4 text-black rounded-l-md h-10 min-w-[500px] border-2 border-r-0" // Adjusted for flush alignment and left rounded corners
      />
      <button
        type="submit"
        className="bg-blue-500 text-white rounded-r-md border-2 border-blue-500 h-10 px-4 hover:bg-blue-600" // Button flush with search bar
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>

      </button>
    </div>
  );
}

export default SearchBar;
