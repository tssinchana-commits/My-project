package com.project.findisc.audit_table;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan(basePackages = "com.project.findisc")
@EnableJpaRepositories(basePackages = "com.project.findisc")
@ComponentScan(basePackages = "com.project.findisc")
public class CustomerAuditApplication {

	public static void main(String[] args) {
		SpringApplication.run(CustomerAuditApplication.class, args);
	}
}
