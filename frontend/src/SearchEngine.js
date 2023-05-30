import React, { useState } from 'react';

function SearchEngine() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [answer, setAnswer] = useState('');

    const handleQueryChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Send query to the backend
        const response = await fetch('/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query })
        });
        const data = await response.json();
        setResults(data.results);
        setAnswer(data.answer);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={query} onChange={handleQueryChange} />
                <button type="submit">Search</button>
            </form>
            {results.map((result) => (
                <div key={result.url}>
                    <h3><a href={result.url}>{result.title}</a></h3>
                    <p>{result.snippet}</p>
                </div>
            ))}
            {answer && <p>{answer}</p>}
        </div>
    );
}

export default SearchEngine;
