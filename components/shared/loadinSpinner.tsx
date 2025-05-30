import { cn } from "@/lib/utils"

interface LoadingSpinnerProps {
    size?: "xs" | "sm" | "md" | "lg" | "xl"
    color?: "default" | "primary" | "orange" | "white"
    className?: string
    thickness?: "thin" | "regular" | "thick"
    fullPage?: boolean
    text?: string
}

export function LoadingSpinner({
   size = "md",
   color = "orange",
   className,
   thickness = "regular",
   fullPage = false,
   text,
}: LoadingSpinnerProps) {
    const sizeClasses = {
        xs: "h-4 w-4",
        sm: "h-6 w-6",
        md: "h-8 w-8",
        lg: "h-12 w-12",
        xl: "h-16 w-16",
    }

    const colorClasses = {
        default: "border-gray-300 border-t-gray-600",
        primary: "border-gray-200 border-t-blue-600",
        orange: "border-orange-200 border-t-orange-500",
        white: "border-gray-100/30 border-t-white",
    }

    const thicknessClasses = {
        thin: "border",
        regular: "border-2",
        thick: "border-[3px]",
    }

    if (fullPage) {
        return (
            <div className="fixed inset-0 flex flex-col items-center justify-center bg-white/80 z-50">
                <div
                    className={cn(
                        "animate-spin rounded-full",
                        sizeClasses[size],
                        colorClasses[color],
                        thicknessClasses[thickness],
                        className,
                    )}
                />
                {text && <p className="mt-4 text-sm text-gray-600">{text}</p>}
            </div>
        )
    }

    return (
        <div className={cn("flex flex-col items-center justify-center", className)}>
            <div
                className={cn("animate-spin rounded-full", sizeClasses[size], colorClasses[color], thicknessClasses[thickness])}
            />
            {text && <p className="mt-2 text-sm text-gray-600">{text}</p>}
        </div>
    )
}
