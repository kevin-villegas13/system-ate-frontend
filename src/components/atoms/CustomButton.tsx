import { CustomButtonProps } from "../../lib/types/button/custom-button.types";
import { cn } from "../../lib/utils";

export default function CustomButton({
  icon: Icon,
  buttonText,
  className,
  ...props
}: CustomButtonProps) {
  return (
    <button
      className={cn(
        "flex items-center justify-center gap-2 px-4 py-2 text-sm sm:text-base bg-green-600 hover:bg-green-700 text-white rounded-md transition-all",
        className
      )}
      {...props}
    >
      {Icon && <Icon className="w-5 h-5 sm:w-4 sm:h-4" />} {buttonText}
    </button>
  );
}
