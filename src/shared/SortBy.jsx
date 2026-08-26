

function SortBy({ sortBy, sortDirection, onSortByChange, onSortDirectionChange }) {
    return(
        <div>
            <label htmlFor="sortBy">Sort by</label>
            <select 
                id="sortBy"
                value={sortBy}
                onChange={(e) => onSortByChange(e.target.value)}
                >
                <option value="createdAt">Created At</option>
                <option value="title">Title</option>
            </select>

            <label htmlFor="sortDirection">Order</label>
            <select 
                id="sortDirection"
                value={sortDirection}
                onChange={(e) => onSortDirectionChange(e.target.value)}
                >
                <option value="desc">Decending</option>
                <option value="asc">Ascending</option>
            </select>
        </div>
    );
}

export default SortBy;
