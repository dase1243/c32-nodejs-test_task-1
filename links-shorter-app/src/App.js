import './App.css';
import './index.css'
import Header from "./components/Header/Header";
import {useEffect, useState} from "react";
import axios from "axios";
import {v4 as uuidv4} from 'uuid';
import UrlForm from "./components/UrlForm/UrlForm";
import ShorterUrls from "./components/ShorterUrls.jsx/ShorterUrls";

const {API_URL} = process.env;
const App = () => {
    const [sessionId, setSessionId] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [urls, setUrls] = useState([]);

    useEffect(() => {
        const storedSessionId = localStorage.getItem('sessionId');
        if (storedSessionId) {
            setSessionId(storedSessionId);

            axios
                .get(`${process.env.REACT_APP_BACKEND_URL}/api/url/getAll/${storedSessionId}`)
                .then((response) => {
                    if (response.data.fromCache) {
                        setUrls(response.data.data);
                    } else {
                        setUrls(response.data.urls);
                    }
                    setSubmitted(false);
                })
                .catch((error) => {
                    console.error('Error retrieving URLs:', error);
                });
        } else {
            const storedSessionId = localStorage.getItem('sessionId');
            if (storedSessionId) {
                setSessionId(storedSessionId);
            } else {
                generateSessionId();
            }
        }
    }, [submitted]);

    const generateSessionId = async () => {
        const newSessionId = uuidv4();

        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/user/`, {sessionId: newSessionId});
            setSessionId(response.data.sessionId);

            localStorage.setItem('sessionId', response.data.sessionId);
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    return (
        <div className="App">
            <Header/>
            <UrlForm sessionId={sessionId} setSubmitted={setSubmitted}/>
            <ShorterUrls urls={urls}/>
        </div>
    );
}

export default App;
