package com.questionpro.poll.dto;

import lombok.Data;
import java.util.List;

@Data
public class QuestionDto {
    private long id;
    private String text;
    private List<OptionDto> options;
}
