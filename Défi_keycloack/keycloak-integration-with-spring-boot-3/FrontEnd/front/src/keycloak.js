import Keycloak from 'keycloak-js';

const keycloakConfig = {
  realm: 'SpringBootKeycloack',
  clientId: 'OpenIDConnect',
  url: 'http://localhost:9090/admin/master/console/#/SpringBootKeycloack/roles',
};

const keycloak = Keycloak(keycloakConfig);

export default keycloak;
