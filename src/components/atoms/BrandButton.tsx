type BrandButtonProps = {
  label: string;
  onPress?: () => void; // optional function
};

function BrandButton({ label, onPress }: BrandButtonProps) {
  return (
    <button
      className=" transition-all brand-button bg-red-800 hover:bg-red-950 text-white  p-2 w-full"
      onClick={onPress}
    >
      {label}
    </button>
  );
}

export default BrandButton;
