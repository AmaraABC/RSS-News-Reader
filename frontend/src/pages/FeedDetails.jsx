import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFeedItems, fetchFeed } from '../api';

// Fonction concernant les articles des flux RSS
export default function FeedDetail() {
    const { id } = useParams();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    // Chargements des articles d'un flux
    const loadItems = async () => {
        setLoading(true);
        try {
            const res = await getFeedItems(id); // Appel de l'API
            setItems(res.data.results || res.data); // Récupération de chaque article d'un flux spécifique
        } catch (e) {
            console.error(e);
        } finally { setLoading(false); } // Chargement interrompu
    };

    useEffect(() => { loadItems(); }, [id]);

    // Rafraîchissement du flux
    const handleRefresh = async () => {
        await fetchFeed(id);
        await loadItems();
    };

    // Rendu HTML des articles d'un flux
    return (
        <div>
            <button onClick={handleRefresh}>Rafraîchir le flux</button>
            {loading ? <p>Chargement…</p> : (
                <ul>
                    {items.map(it => (
                        <li key={it.guid}>
                            <a href={it.link} target="_blank" rel="noreferrer">{it.title}</a>
                            <p>{it.description}</p>
                            <small>{it.published}</small>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};