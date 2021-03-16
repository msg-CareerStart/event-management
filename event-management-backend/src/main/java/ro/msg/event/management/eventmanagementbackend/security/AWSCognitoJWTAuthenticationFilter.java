package ro.msg.event.management.eventmanagementbackend.security;

import java.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.GenericFilter;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

/**
 * Intercepts incoming requests and verifies the JWT .
 */
@Component
@RequiredArgsConstructor
public class AWSCognitoJWTAuthenticationFilter extends GenericFilter {

    private final AWSCognitoIdTokenProcessor cognitoIdTokenProcessor;

    /**
     * Authenticates the request if the provided id token is valid, by adding the Authentication object to the
     * SecurityContext. If an exception is thrown during the authentication process, the SecurityContext is cleared,
     * thus access to the resource is denied.
     * @param request request to a resource
     * @param response the response to that request
     * @param filterChain contains the filters used by Spring Security
     * @throws IOException
     * @throws ServletException
     */
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain filterChain) throws IOException, ServletException {
        Authentication authentication;
        try {
            authentication = this.cognitoIdTokenProcessor.authenticate((HttpServletRequest) request);
            if (authentication != null) {
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch (Exception exception) {
            SecurityContextHolder.clearContext();
        }
        filterChain.doFilter(request, response);
    }
}

