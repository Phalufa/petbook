package com.miko.petbook.security;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.filter.OncePerRequestFilter;

import lombok.AllArgsConstructor;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

@Component
@AllArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

  private final JwtProvider provider;
  private final UserDetailsService userDetailsService;
  
  @Override
  protected void doFilterInternal(HttpServletRequest request,
                                  HttpServletResponse response, 
                                  FilterChain filterChain) throws ServletException, IOException {
      String bearerToken = request.getHeader("Authorization");
      String jwt = StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ") ? 
                                                          bearerToken.substring(7) : bearerToken;
      if (StringUtils.hasText(jwt) && provider.validateToken(jwt)) {
        String username = provider.getUsernameFromJwt(jwt);

        UserDetails userDetails = userDetailsService.loadUserByUsername(username);
        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails,
                null, userDetails.getAuthorities());
        authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

        SecurityContextHolder.getContext().setAuthentication(authentication);
      }
      filterChain.doFilter(request, response);
  }
}