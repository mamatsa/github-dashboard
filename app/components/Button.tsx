export default function Button({
  text,
  buttonType = "button",
}: {
  text: string;
  buttonType?: "submit" | "button";
}) {
  return (
    <button type={buttonType} className="px-3 py-2 border hover:bg-slate-200">
      {text}
    </button>
  );
}
