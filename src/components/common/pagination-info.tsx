export const PaginationInfo = ({
    page = 1,
    limit = 10,
    totalItems = 0,
    currentLength = 0,
    label = "bản ghi", // Thêm prop để thay đổi đơn vị
    className = "text-sm text-gray-500" // Thêm prop để tùy chỉnh style từ bên ngoài
}) => {
    // Logic tính toán
    const from = currentLength > 0 ? (page - 1) * limit + 1 : 0;
    const to = Math.min(page * limit, totalItems);

    return (
        <p className={className}>
            Hiển thị <span className="font-medium">{from}</span> đến{" "}
            <span className="font-medium">{to}</span> trong tổng số{" "}
            <span className="font-medium">{totalItems}</span> {label}
        </p>
    );
};