export function CourseListSkeleton() {
    return (
        Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-80 bg-gray-100 animate-pulse rounded-3xl" />
        ))
    );
}   