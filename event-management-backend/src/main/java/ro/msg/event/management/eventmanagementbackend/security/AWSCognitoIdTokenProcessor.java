package ro.msg.event.management.eventmanagementbackend.security;

import static java.util.List.of;

import java.text.ParseException;
import java.util.List;
import javax.servlet.http.HttpServletRequest;

import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.proc.BadJOSEException;
import com.nimbusds.jose.proc.SecurityContext;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.proc.ConfigurableJWTProcessor;
import net.minidev.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;
import ro.msg.event.management.eventmanagementbackend.exception.InvalidJWTException;

/**
 * Does all the verification by calling the AWS Cognito JWK URL, building the signature and comparing it with the
 * incoming id token.
 */
@Component
public class AWSCognitoIdTokenProcessor {

    private final JWTConfiguration jwtConfiguration;
    private final ConfigurableJWTProcessor<SecurityContext> configurableJWTProcessor;

    @Autowired
    public AWSCognitoIdTokenProcessor(JWTConfiguration jwtConfiguration, ConfigurableJWTProcessor<SecurityContext> configurableJWTProcessor) {
        this.jwtConfiguration = jwtConfiguration;
        this.configurableJWTProcessor = configurableJWTProcessor;
    }

    /**
     * Verifies the token and returns an JWTAuthentication object that contains the user details (username, email,
     * first name, last name, identification string, role).
     * @param request the web request
     * @return JWTAuthentication with user information
     * @throws ParseException
     * @throws JOSEException
     * @throws BadJOSEException
     */
    public Authentication authenticate(HttpServletRequest request) throws ParseException, JOSEException, BadJOSEException {
        String idToken = request.getHeader(this.jwtConfiguration.getHttpHeader());
        if (idToken != null) {
            JWTClaimsSet claims = this.configurableJWTProcessor.process(this.getBearerToken(idToken), null);
            validateIssuer(claims);
            String username = getUserNameFrom(claims);
            String role = this.getRole(claims);
            if (username != null) {
                List<GrantedAuthority> grantedAuthorities = of(new SimpleGrantedAuthority(role));
                User user = new User(this.getEmail(claims), username, this.getFirstName(claims), this.getLastName(claims), this.getIdentificationString(claims), this.getRole(claims));
                return new JWTAuthentication(user, grantedAuthorities);
            }
        }
        return null;
    }

    private String getUserNameFrom(JWTClaimsSet claims) {
        return claims.getClaims().get(this.jwtConfiguration.getUserNameField()).toString();
    }

    /**
     * Gets the role of the user from the claims stored in the JWT. If there is no role, the default role, which
     * is ROLE_USER, will be assigned.
     * @param claims the claims that contain all the information stored in the JWT
     * @return
     */
    private String getRole(JWTClaimsSet claims) {
        JSONArray jsonArray = (JSONArray) claims.getClaims().get("cognito:groups");
        if (jsonArray == null) {
            return "ROLE_USER";
        }
        String[] groups = (String[]) jsonArray.toArray(new String[0]);
        return groups[0];
    }

    private String getFirstName(JWTClaimsSet claims) {
        return claims.getClaims().get("given_name").toString();
    }

    private String getLastName(JWTClaimsSet claims) {
        return claims.getClaims().get("family_name").toString();
    }

    private String getEmail(JWTClaimsSet claims) {
        return claims.getClaims().get("email").toString();
    }

    private String getIdentificationString(JWTClaimsSet claims) {
        return claims.getClaims().get("sub").toString();
    }

    /**
     * Checks if the issuer of the token is correct one (the AWS Cognito identity pool used in the configuration).
     * @param claims the claims that contain all the information stored in the JWT
     */
    private void validateIssuer(JWTClaimsSet claims) {
        if (!claims.getIssuer().equals(this.jwtConfiguration.getCognitoIdentityPoolUrl())) {
            throw new InvalidJWTException(String.format("Issuer %s does not match Cognito idp %s", claims.getIssuer(), this.jwtConfiguration.getCognitoIdentityPoolUrl()));
        }
    }

    private String getBearerToken(String token) {
        return token.startsWith("Bearer ") ? token.substring("Bearer ".length()) : token;
    }
}
