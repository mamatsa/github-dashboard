export default function Checkbox({ id, label }: { id: string; label: string }) {
  return (
    <div className="flex items-center mb-4">
      <input
        id={id}
        type="checkbox"
        value=""
        required
        className="w-4 h-4 text-[#179c65] cursor-pointer bg-gray-400 border-gray-300 rounded"
      />
      <label htmlFor="default-checkbox" className="ms-2 text-sm text-gray-400">
        {label}
      </label>
    </div>
  );
}
