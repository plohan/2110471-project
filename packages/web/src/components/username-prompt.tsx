import { useState } from "react";

interface UsernamePromptProps {
  onSubmit: (name: string) => void;
}

export function UsernamePrompt({ onSubmit }: UsernamePromptProps) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (trimmed) {
      onSubmit(trimmed);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white text-black p-6 rounded shadow-md w-80">
        <h2 className="text-lg font-semibold mb-4">Enter your username</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Your username..."
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring"
          />
          <input
            type="submit"
            value="Submit"
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full"
          />
        </form>
      </div>
    </div>
  );
}