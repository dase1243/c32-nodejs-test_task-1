import './UrlForm.css';
import {useForm} from 'react-hook-form';
import axios from "axios";

const UrlForm = ({sessionId, setSubmitted}) => {
    const {
        register,
        formState: {errors},
        handleSubmit,
        setError,
        reset,

    } = useForm({
        mode: 'onSubmit',
    });

    const onSubmit = (data) => {
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/url/shorter`,
            {
                originUrl: data.Url,
                subpart: data.Subpart,
                sessionId
            })
            .then((response) => {
                if (response.data.message) {
                    setError('Subpart', {type: 'root.serverError', message: response.data.message})
                } else {
                    setSubmitted(true);
                    reset();
                }
            })
            .catch((error) => {
                let errorMessage = error.response?.data?.error;
                if (errorMessage) {
                    setError('Subpart', {type: 'root.serverError', message: 'Subpart is already taken'})
                }
            });
    }

    return (
        <section className="form">
            <div className="container">
                <div className="form__inner">
                    <form
                        className="form"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <input
                            type="url"
                            className="form__input"
                            placeholder="Insert link here"
                            {...register('Url', {
                                required: 'Please enter a URL',
                                pattern: {
                                    value: /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
                                    message: 'Please enter a valid URL'
                                }
                            })}
                        />
                        <input
                            type="text"
                            className="form__input"
                            placeholder="Insert desired subpart"
                            {...register('Subpart', {
                                required: false,
                                minLength: 5,
                                maxLength: 10,
                                pattern: {
                                    message: 'Please enter a valid subpart'
                                }
                            })}
                        />
                        <button
                            className="form__btn"
                            type="submit"

                        >
                            Submit
                        </button>
                        {errors.Url && (
                            <div className="error">
                                {errors.Url.message}
                            </div>
                        )}
                        {errors.Subpart && (
                            <div className="error">
                                {errors.Subpart.message}
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </section>
    )
}

export default UrlForm;