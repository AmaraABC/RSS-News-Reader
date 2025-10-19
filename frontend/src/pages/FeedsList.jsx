import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFeeds, addFeed, deleteFeed } from '../api';

// Page concernant le listing de chaque flux RSS
export default function FeedsList() {
    const [feeds, setFeeds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [url, setUrl] = useState('');
    const [error, setError] = useState('');

    // Chargements des flux
    const load = async () => {
        setLoading(true);
        try {
            const res = await getFeeds(); // Appel de l'API
            setFeeds(res.data.results || res.data);
        } catch (e) {
            setError('Erreur lors du chargement');
        } finally { setLoading(false); } // Chargement des flux interrompu
    };

    useEffect(() => { load(); }, []); // Flux chargés

    // Ajout d'un flux
    const handleAdd = async (e) => {
        e.preventDefault(); // Empêche la page de recharger
        try {
            await addFeed(url); // Appel de l'API
            setUrl('');
            await load();
        } catch (err) {
            setError(err.response?.data?.detail || 'Erreur lors de l\'ajout du flux');
        };
    };

    // Suppression d'un flux
    const handleDelete = async (id) => {
        if (!window.confirm('Supprimer ce flux ?')) return;
        try {
            await deleteFeed(id); // Appel de l'API
            await load(); // Rechargement de la liste des flux
        } catch (err) {
            setError(err.response?.data?.detail || 'Erreur lors de la suppression');
        }
    };

    // Renvoie de la page HTML concernant la liste des flux RSS
    return (
        <div>
            <h1 className="rss-list-h1">Liste des flux RSS sauvegardés</h1>
            <form onSubmit={handleAdd} className='rss-add-form'>
                <input className='rss-input' value={url} onChange={e => setUrl(e.target.value)} placeholder="Saisissez l'URL d'un flux RSS" />
                <button className='rss-add-btn' type='submit' disabled={loading || !url.trim()}>Ajouter</button>
            </form>
            {loading ? <p>Chargement…</p> : (
                <div className="rss-list">
                    {feeds.map(f => (
                        <div key={f.id} className="rss-card">
                            <span className="rss-card-title">
                                <Link to={`/feeds/${f.id}`}>{f.title || f.url}</Link>
                            </span>
                            <button className="rss-delete-btn" onClick={() => handleDelete(f.id)}>
                                Supprimer
                            </button>
                        </div>
                    ))}
                </div>
            )}
            {error && <div className="rss-error">{error}</div>}
        </div>
    );
};