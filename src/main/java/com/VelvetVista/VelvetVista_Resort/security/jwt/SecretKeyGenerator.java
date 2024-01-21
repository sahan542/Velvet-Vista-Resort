package com.VelvetVista.VelvetVista_Resort.security.jwt;

import io.jsonwebtoken.security.Keys;
import java.security.Key;

public class SecretKeyGenerator {
    public static void main(String[] args) {
        // Generate a new secret key
        Key secretKey = Keys.secretKeyFor(io.jsonwebtoken.SignatureAlgorithm.HS256);

        // Convert the secret key to Base64 encoding
        String base64EncodedSecretKey = io.jsonwebtoken.io.Encoders.BASE64.encode(secretKey.getEncoded());

        // Print the Base64-encoded secret key
        System.out.println("Base64-encoded Secret Key: " + base64EncodedSecretKey);
    }
}