package com.questionpro.poll.mapper;

import com.questionpro.poll.dto.OptionDto;
import com.questionpro.poll.dto.QuestionDto;
import com.questionpro.poll.model.Options;
import com.questionpro.poll.model.Question;

import java.util.List;
import java.util.stream.Collectors;

public class QuestionMapper {

    public static QuestionDto toDto(Question question) {
        QuestionDto dto = new QuestionDto();
        dto.setId(question.getId());
        dto.setText(question.getText());
        dto.setOptions(
                question.getOptions().stream()
                        .map(QuestionMapper::mapOptionToDto)
                        .collect(Collectors.toList())
        );
        return dto;
    }

    private static OptionDto mapOptionToDto(Options option) {
        OptionDto dto = new OptionDto();
        dto.setId(option.getId());
        dto.setText(option.getText());
        dto.setCorrect(false); // hide correctness from end-users
        return dto;
    }
}
