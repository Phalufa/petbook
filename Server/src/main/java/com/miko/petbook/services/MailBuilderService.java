package com.miko.petbook.services;

import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class MailBuilderService {

    private final TemplateEngine engine;

    public String build(String msg) {
        Context context = new Context();
        context.setVariable("message", msg);
        return engine.process("verificationEmail", context);
    }
}