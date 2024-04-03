import RepoItem from "./RepoItem"

function RepoList({ repos, sortBy, setSortBy, sortOrder, setSortOrder }) {
    // Component logic

    return (
        <div className='rounded-lg border border-purple-400 shadow-lg card   bg-[#0F1729]'>
            <div className='card-body'>
                {/* Sorting UI elements */}
                <div className="mb-4">
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="select select-bordered"
                    >
                        <option value="stars">Stars</option>
                        <option value="forks">Forks</option>
                        {/* Add more options for other sorting criteria if needed */}
                    </select>

                    <button
                        
                        className="btn btn-sm btn-secondary ml-2"
                        onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                    >
                        {sortOrder === "asc" ? "Ascending" : "Descending"}
                    </button>
                </div>

                {/* Repository list */}
                <h2 className='text-3xl my-4 font-bold card-title'>
                    Respositories
                </h2>
                {repos.map((repo) => (
                    <RepoItem key={repo.id} repo={repo} />
                ))}
            </div>
        </div>
    )
}

export default RepoList