package ro.msg.event.management.eventmanagementbackend.security;

import java.util.Collection;
import java.util.Objects;

import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;

/**
 * Represents the token for an authentication request or for an authenticated principal once the request has been
 * processed. Once the request has been authenticated, the Authentication will usually be stored in a thread-local
 * SecurityContext managed by the SecurityContextHolder by the authentication mechanism which is being used.
 * It contains information about the authenticated principal (user).
 */
public class JWTAuthentication extends AbstractAuthenticationToken {

    private final Object principal;

    public JWTAuthentication(Object principal, Collection<? extends GrantedAuthority> authorities) {
        super(authorities);
        this.principal = principal;
        super.setAuthenticated(true);
    }

    public Object getCredentials() {
        return null;
    }

    public Object getPrincipal() {
        return this.principal;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof JWTAuthentication)) return false;
        if (!super.equals(o)) return false;
        JWTAuthentication that = (JWTAuthentication) o;
        return Objects.equals(principal, that.principal);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), principal);
    }
}
