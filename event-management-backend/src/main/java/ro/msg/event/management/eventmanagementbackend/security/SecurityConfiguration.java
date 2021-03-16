package ro.msg.event.management.eventmanagementbackend.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * Provides custom security configuration.
 */
@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    private final AWSCognitoJWTAuthenticationFilter awsCognitoJwtAuthenticationFilter;

    @Autowired
    public SecurityConfiguration(AWSCognitoJWTAuthenticationFilter awsCognitoJwtAuthenticationFilter) {
        this.awsCognitoJwtAuthenticationFilter = awsCognitoJwtAuthenticationFilter;
    }

    /**
     * Configures web based security. Routes that contain "/public/" and those used by the H2 database(used for testing)
     * are made available without requiring authentication. For the other routes authentication is necessary and this
     * authentication is done using JWT.
     * @param http element that allows configuring web based security for specific http requests
     * @throws Exception security related exception
     */
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.headers().cacheControl();
        //h2-console
        http.headers().frameOptions().disable();
        http.csrf().disable()
                .authorizeRequests()
                //public resources that do not require authentication
                .antMatchers("**/public/**").permitAll()
                //h2-console
                .antMatchers("/h2-console/**").permitAll()
                //resources that require authentication
                .antMatchers(HttpMethod.OPTIONS,"/**/{[path:[^\\.]*}").permitAll()
                .antMatchers("/").authenticated()
                .and()
                .addFilterBefore(awsCognitoJwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
    }
}
