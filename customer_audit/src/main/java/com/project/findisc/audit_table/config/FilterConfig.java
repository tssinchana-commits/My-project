package com.project.findisc.audit_table.config;

import com.project.findisc.audit_table.security.AuthTokenFilter;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FilterConfig {

   @Bean
public FilterRegistrationBean<AuthTokenFilter> authFilter(AuthTokenFilter filter) {

    FilterRegistrationBean<AuthTokenFilter> registrationBean = new FilterRegistrationBean<>();

    registrationBean.setFilter(filter);

    // ❌ Disable auth temporarily
    // registrationBean.addUrlPatterns("/customers/*");

    return registrationBean;
}
}