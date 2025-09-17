/* Création de la base de données pour le projet */

CREATE DATABASE /* Nom de votre base de données */ ;
CREATE USER /* Nom de l'utilisateur */ WITH PASSWORD /* Son mot de passe */;
ALTER ROLE /* Nom de l'utilisateur */ SET client_encoding TO 'utf8';
ALTER ROLE /* Nom de l'utilisateur */ SET default_transaction_isolation TO 'read committed';
ALTER ROLE /* Nom de l'utilisateur */ SET timezone TO 'UTC';

/* Accorder les autorisations nécessaires à l'utilisatuer ajouté auparavant */

GRANT ALL PRIVILEGES ON DATABASE /* Nom de votre base de données */ TO /* Nom de l'utilisateur */;
GRANT ALL PRIVILEGES ON SCHEMA public TO /* Nom de l'utilisateur */;
-- Optionnel
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO /* Nom de l'utilisateur */;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO /* Nom de l'utilisateur */;