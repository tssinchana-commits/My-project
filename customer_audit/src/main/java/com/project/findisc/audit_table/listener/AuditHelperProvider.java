package com.project.findisc.audit_table.listener;

import org.springframework.stereotype.Component;

@Component
public class AuditHelperProvider {

    private static AuditHelper auditHelper;

    private AuditHelperProvider(AuditHelper helper) {
        auditHelper = helper;
    }

    public static AuditHelper get() {
        return auditHelper;
    }
}