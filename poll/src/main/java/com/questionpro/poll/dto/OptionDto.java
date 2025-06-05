package com.questionpro.poll.dto;

import lombok.Data;

@Data
public class OptionDto {
    private long id;
    private String text;
    private boolean isCorrect;
}
