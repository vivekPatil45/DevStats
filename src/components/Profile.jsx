import React, { useState, useEffect } from "react";
import {
    FaGithub,
    FaCodepen,
    FaStore,
    FaUserFriends,
    FaUsers,
} from "react-icons/fa";
import axios from "axios";
import { Link ,useParams} from "react-router-dom";
import Spinner from "./Spinner";
import RepoList from "./RepoList";

function Profile() {
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true); // State to manage loading

    const [sortBy, setSortBy] = useState("stars"); // Default sorting by stars
    const [sortOrder, setSortOrder] = useState("desc"); // Default descending order


    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    };

    const sortRepos = () => {
        // Implement sorting logic based on sortBy and sortOrder
        let sortedRepos = [...repos];
        switch (sortBy) {
            case "stars":
                sortedRepos.sort((a, b) =>
                    sortOrder === "asc"
                        ? a.stargazers_count - b.stargazers_count
                        : b.stargazers_count - a.stargazers_count
                );
                break;
            case "forks":
                sortedRepos.sort((a, b) =>
                sortOrder === "asc" ? a.forks - b.forks : b.forks - a.forks
                );
                break;
            // Add more cases for other sorting criteria if needed
            default:
                break;
        }
        return sortedRepos;
    };

    const [repos, setRepos] = useState([]);
    const sortedRepos = sortRepos();

    
    let {username } = useParams();

    useEffect(() => {
        const fetchdata = async () => {
            await axios.get(`https://api.github.com/users/${username}`)
                        .then((res) => setUserData(res.data));

            await axios.get(`https://api.github.com/users/${username}/repos`)
                        .then((res) => setRepos(res.data));
            setLoading(false); // Set loading to false when data is fetched
        };
        fetchdata();
    }, []);

    const {
        avatar_url,
        name,
        login,
        bio,
        html_url,
        location,
        blog,
        twitter_username,
        followers,
        following,
        public_repos,
        public_gists,
        hireable,
        type,
    } = userData;

    return (
        loading ? ( // Show spinner if loading is true
        <div className="container">
            <Spinner />
        </div>
        ) : (
        <>
            <div className="w-full mx-auto lg:w-10/12 ">
            <div className="mb-4">
                <Link to="/" className="btn btn-ghost">
                Back To Search
                </Link>
            </div>
            
            <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 mb-8 md:gap-8">
                <div className="custom-card-image mb-6 md:mb-0">
                <div className="rounded-lg shadow-xl card image-full mx-7">
                    {/*image-full */}
                    <figure>
                    <img src={avatar_url} alt="" />
                    </figure>
                    <div className="card-body justify-end">
                    <h2 className="card-title mb-0">{name}</h2>
                    <p>{login}</p>
                    </div>
                </div>
                </div>

                <div className="col-span-2">
                <div className="mb-6">
                    <h1 className="text-3xl card-title">
                    {name}
                    <div className="ml-2 mr-1 badge badge-success">{type}</div>
                    {hireable && (
                        <div className="mx-1 badge badge-info">Hireable</div>
                    )}
                    </h1>
                    <p>{bio}</p>
                    <div className="mt-4 card-actions">
                    <a
                        href={html_url}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-outline-primary btn-md"
                    >
                        <FaGithub className="m-2" /> Visit Github
                    </a>
                    </div>
                </div>

                <div className="w-full rounded-lg shadow-md bg-base-100 stats border border-[#09A8EC] overflow-hidden">
                    {location && (
                    <div className="stat">
                        <div className="stat-title text-md">Location</div>
                        <div className="text-lg stat-value">{location}</div>
                    </div>
                    )}
                    {blog && (
                    <div className="stat">
                        <div className="stat-title text-md">Website</div>
                        <div className="text-lg stat-value">
                        <a href={`${blog}`} target="_blank" rel="noreferrer">
                            {blog}
                        </a>
                        </div>
                    </div>
                    )}
                    {twitter_username && (
                    <div className="stat">
                        <div className="stat-title text-md">Twitter</div>
                        <div className="text-lg stat-value">
                        <a
                            href={`https://twitter.com/${twitter_username}`}
                            target="_blank"
                            rel="noreferrer"
                        >
                            {twitter_username}
                        </a>
                        </div>
                    </div>
                    )}
                </div>
                </div>
            </div>

            <div className="w-full py-5 mb-6 rounded-lg shadow-md bg-base-100 stats border border-[#09A8EC]">
                <div className="stat">
                <div className="stat-figure text-secondary">
                    <FaUsers className="text-3xl md:text-5xl" />
                </div>
                <div className="stat-title pr-5">Followers</div>
                <div className="stat-value pr-5 text-3xl md:text-4xl">
                    {followers}
                </div>
                </div>

                <div className="stat">
                <div className="stat-figure text-secondary">
                    <FaUserFriends className="text-3xl md:text-5xl" />
                </div>
                <div className="stat-title pr-5">Following</div>
                <div className="stat-value pr-5 text-3xl md:text-4xl">
                    {following}
                </div>
                </div>

                <div className="stat">
                <div className="stat-figure text-secondary">
                    <FaCodepen className="text-3xl md:text-5xl" />
                </div>
                <div className="stat-title pr-5">Public Repos</div>
                <div className="stat-value pr-5 text-3xl md:text-4xl">
                    {public_repos}
                </div>
                </div>

                <div className="stat">
                <div className="stat-figure text-secondary">
                    <FaStore className="text-3xl md:text-5xl" />
                </div>
                <div className="stat-title pr-5">Public Gists</div>
                <div className="stat-value pr-5 text-3xl md:text-4xl">
                    {public_gists}
                </div>
                </div>
            </div>
            <RepoList
                repos={sortedRepos}
                sortBy={sortBy}
                setSortBy={setSortBy}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
            />
            </div>
        </>
        )
    );
}

export default Profile;
