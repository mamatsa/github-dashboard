export default function Button({
  text,
  buttonType = "button",
}: {
  text: string;
  buttonType?: "submit" | "button";
}) {
  return (
    <button
      type={buttonType}
      className="px-5 py-2 bg-[#179c65] rounded font-semibold hover:bg-[#127d51]"
    >
      {text}
    </button>
  );
}
