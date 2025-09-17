import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFeedItems, fetchFeed } from '../api';

// Fonction concernant les articles des flux RSS
export default function FeedDetail() {
    const { id } = useParams();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1); // Constante pour la pagination des articles
    const [count, setCount] = useState(0); // Compteur pour le numéro de la page

    // Chargements des articles d'un flux par page
    const loadItems = async (pageNum = 1) => {
        setLoading(true);
        try {
            const res = await getFeedItems(id, pageNum); // Appel de l'API
            setItems(res.data.results || res.data); // Récupération de chaque article d'un flux spécifique
            setCount(res.data.count || 0);
            setPage(pageNum);
        } catch (e) {
            console.error(e);
        } finally { setLoading(false); } // Chargement interrompu
    };

    useEffect(() => { loadItems(); }, [id]);

    // Rafraîchissement du flux
    const handleRefresh = async () => {
        await fetchFeed(id);
        await loadItems(page);
    };

    const pageSize = 10; // Nombre d'articles par pages plafonné à 10 (BACKEND)
    const totalPages = Math.ceil(count / pageSize);

    // Rendu HTML des articles d'un flux
    return (
        <div className="feed-details-container">
            <button className="feed-refresh-btn" onClick={handleRefresh}>Rafraîchir le flux</button>
            {loading ? (
                <p className="feed-loading">Chargement…</p>
            ) : (
                <>
                    <section className="feed-items-list">
                        {items.map(it => (
                            <article key={it.guid} className="feed-item-card">
                                <a className="feed-item-title" href={it.link} target="_blank" rel="noreferrer">{it.title}</a>
                                <p className="feed-item-desc">{it.description}</p>
                                <small className="feed-item-date">{it.published}</small>
                            </article>
                        ))}
                    </section>
                    {totalPages > 1 && (
                        <div className="feed-pagination">
                            <button
                                disabled={page === 1}
                                onClick={() => loadItems(page - 1)}
                            >Précédent</button>
                            <span>Page {page} / {totalPages}</span>
                            <button
                                disabled={page === totalPages}
                                onClick={() => loadItems(page + 1)}
                            >Suivant</button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};