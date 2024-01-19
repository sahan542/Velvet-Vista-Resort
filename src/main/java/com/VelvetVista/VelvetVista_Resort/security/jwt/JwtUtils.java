package com.VelvetVista.VelvetVista_Resort.security.jwt;

import com.VelvetVista.VelvetVista_Resort.security.user.HotelUserDetails;
import lombok.Value;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import io.jsonwebtoken.*;

import java.security.Key;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

public class JwtUtils {
    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);
    @Value("${security.jwt.secret}")
    private String jwtSecret;

    @Value("${security.jwt.jwtExpirationTime}")
    private int jwtExpirationTime;

    public String generateJwtTokenForUser(Authentication authentication){
        HotelUserDetails userPrincipal = (HotelUserDetails) authentication.getPrincipal();
        List<String> roles = userPrincipal.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority).toList();
        return Jwts.builder()
                .setSubject(userPrincipal.getUsername())
                .claim("roles", roles)
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime()+jwtExpirationTime)
                .signWith(key(), SignatureAlgorithm.HS256).compact();
    }

    private Key key() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
    }

    public String getUsernameFromToken(String token){
        return Jwts.parserBuilder()
                    .setSigningkey(key())
                    .build()
                    .parseClaimsJws(token)
                    .getBody().getSubject();
    }
    public boolean validateToken(String token){
        try{
            Jwts.parserBuilder().setSignKey(key()).build().parse(token);
            return true;
        }
        catch(MalformedJwtException e){
            logger.error("Invalid JWT token : {} ", e.getMessage());
        }
        catch(ExpiredJwtException e){
            logger.error("Expired Token : {}", e.getMessage());
        }
        catch(UnsupportedJwtException e){
            logger.error("This token is not supported : {} ", e.getMessage());
        }
        catch(IllegalArgumentException e){
            logger.error("No Claims Found : {} ", e.getMessage());
        }
        return false;
    }
}
