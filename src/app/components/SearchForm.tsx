import { useState, useEffect, FormEvent } from 'react';

interface Type {
  name: string;
}

interface SearchFormProps {
  onSearch: (type: string, searchTerm: string) => void;
}

export default function SearchForm({ onSearch }: SearchFormProps) {
  const [types, setTypes] = useState<Type[]>([]);
  const [selectedType, setSelectedType] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    async function fetchTypes() {
      const response = await fetch('https://pokeapi.co/api/v2/type');
      const data = await response.json();
      setTypes(data.results);
    }
    fetchTypes();
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(selectedType, searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center p-4 bg-gray-100 rounded shadow-md">
      <select 
        value={selectedType} 
        onChange={(e) => setSelectedType(e.target.value)} 
        className="mb-4 p-2 border rounded w-full"
      >
        <option value="">Select Type</option>
        {types.map((type) => (
          <option key={type.name} value={type.name}>{type.name}</option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
      />
      <button type="submit" className="p-2 bg-blue-500 text-white rounded w-full">Search</button>
    </form>
  );
}
