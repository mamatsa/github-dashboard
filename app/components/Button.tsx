export default function Button({
  text,
  buttonType = "button",
  onClick,
}: {
  text: string;
  buttonType?: "submit" | "button";
  onClick?: () => void;
}) {
  return (
    <button
      type={buttonType}
      className="px-5 py-2 bg-[#179c65] rounded font-semibold hover:bg-[#127d51]"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
