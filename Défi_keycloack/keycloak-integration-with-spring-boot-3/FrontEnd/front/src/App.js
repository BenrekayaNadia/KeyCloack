import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Keycloak from 'keycloak-js';

const MyComponent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Configuration Keycloak
        const keycloakConfig = {
          realm: 'SpringBootKeycloack',
          clientId: 'OpenIDConnect',
          url: 'http://localhost:9090/admin/master/console/#/SpringBootKeycloack/roles',
        };

        const keycloak = Keycloak(keycloakConfig);

        // Initialisation Keycloak et demande de connexion si non authentifié
        await keycloak.init({ onLoad: 'login-required' });

        // Mise à jour du jeton avant l'appel à l'API sécurisée
        const token = await keycloak.updateToken();

        const api = axios.create({
          baseURL: 'api/v1/demo',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Appel de l'API sécurisée
        const response = await api.get('/your-secure-endpoint');
        setData(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>My Component</h1>
      {data && <p>{JSON.stringify(data)}</p>}
    </div>
  );
};

export default MyComponent;
