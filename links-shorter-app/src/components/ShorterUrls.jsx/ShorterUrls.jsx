import './ShorterUrls.css';
import {useEffect, useState} from "react";
import Pagination from "../Pagination/Pagination";

const ShorterUrls = ({urls}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [urlsPerPage] = useState(10);
    const [indexOfLastUrl, setIndexOfLastUrl] = useState(currentPage * urlsPerPage);
    const [indexOfFirstUrl, setIndexOfFirstUrl] = useState(indexOfLastUrl - urlsPerPage);
    const [currentUrls, setCurrentUrls] = useState([]);

    useEffect(() => {
        setIndexOfLastUrl(currentPage * urlsPerPage);
        setIndexOfFirstUrl(currentPage * urlsPerPage - urlsPerPage);
    }, [currentPage])

    useEffect(() => {
        const pageRender = async () => {
            setCurrentUrls(urls.slice(indexOfFirstUrl, indexOfLastUrl));
        }

        pageRender()
    }, [urls, indexOfFirstUrl, indexOfLastUrl])

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const copyLink = (url) => {
        return async (e) => {
            e.preventDefault();

            console.log(e.target.innerHTML);
            e.target.innerHTML = 'URL is copied'

            setTimeout(() => {
                e.target.innerHTML = 'copy link'
            }, 1000);

            try {
                await navigator.clipboard.writeText(url.shortUrl);
            } catch (error) {
                console.error('Failed to copy text:', error);
            }
        }
    }

    return (
        <section className="urls">
            <div className="big-container">
                <div className="urls__inner">
                    {
                        !urls || urls.length === 0
                            ? <h2>No history yet</h2>
                            : <div className="urls-list">
                                <div className="urls__header">
                                    <p className="urls__header__title">
                                        Origin Url
                                    </p>
                                    <p className="urls__header__title">
                                        Shorter Url
                                    </p>
                                    <p className="urls__header__title">
                                        Action
                                    </p>
                                </div>
                                {currentUrls.map(url => {
                                    return (
                                        <div className="urls__item" key={url._id}>
                                            <p className="urls__item__text">
                                                {url.originUrl}
                                            </p>
                                            <p className="urls__item__text">
                                                {url.shortUrl}
                                            </p>
                                            <button
                                                className="urls__item__button"
                                                onClick={copyLink(url)}
                                            >
                                                Copy link
                                            </button>
                                        </div>
                                    )
                                })}
                            </div>
                    }
                    <Pagination
                        urlsPerPage={urlsPerPage}
                        totalUrls={urls.length}
                        paginate={paginate}
                    />
                </div>
            </div>
        </section>
    );
}
export default ShorterUrls;