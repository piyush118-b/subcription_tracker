import { useState } from 'react';

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'name-asc', label: 'Name A-Z' },
  { value: 'name-desc', label: 'Name Z-A' },
  { value: 'cost-high', label: 'Cost: High to Low' },
  { value: 'cost-low', label: 'Cost: Low to High' },
  { value: 'renewal-soon', label: 'Renewal: Soonest' },
];

export default function SearchSortBar({ searchQuery, onSearchChange, sortBy, onSortChange }) {
  return (
    <div className="flex items-center gap-4 mb-4">
      {/* Search Input */}
      <div className="relative flex-1 max-w-md">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text)]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search subscriptions..."
          className="input !pl-10 w-full"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text)] hover:text-[var(--text-primary)]"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Sort Dropdown */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-[var(--text)]">Sort:</span>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="input !w-auto"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
