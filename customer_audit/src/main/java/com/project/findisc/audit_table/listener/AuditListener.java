package com.project.findisc.audit_table.listener;

import com.project.findisc.audit_table.entity.AuditEntity;
import com.project.findisc.audit_table.util.EntityJsonUtil;
import jakarta.persistence.*;
import com.fasterxml.jackson.core.JsonProcessingException;

import java.lang.reflect.Field;
import java.time.LocalDateTime;

public class AuditListener<T> {

    @PostPersist
    public void afterCreate(T entity) {
        saveAudit(entity, "CREATE", null);
    }

    @PostUpdate
    public void afterUpdate(T entity) {
        saveAudit(entity, "UPDATE", null);
    }

    @PostRemove
    public void afterDelete(T entity) {
        saveAudit(entity, "DELETE", "Deleted by system");
    }

    private void saveAudit(T entity, String action, String reason) {
        try {
            AuditEntity audit = new AuditEntity();

            audit.setEntityType(entity.getClass().getSimpleName());
            audit.setEntityId(extractId(entity));
            audit.setAction(action);
            audit.setReason(reason);

            audit.setData(EntityJsonUtil.toJson(entity));
            audit.setCreatedAt(LocalDateTime.now());

            AuditHelperProvider.get().save(audit);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Unable to serialize entity to JSON", e);
        }
    }

    private Long extractId(T entity) {
        try {
            for (Field field : entity.getClass().getDeclaredFields()) {
                if (field.isAnnotationPresent(Id.class)) {
                    field.setAccessible(true);
                    return (Long) field.get(entity);
                }
            }
        } catch (Exception e) {
            throw new RuntimeException("Unable to extract entity ID", e);
        }
        return null;
    }
}