package com.questionpro.poll.service;

import com.questionpro.poll.dto.QuestionDto;
import com.questionpro.poll.mapper.QuestionMapper;
import com.questionpro.poll.model.Question;
import com.questionpro.poll.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class QuestionService {

    @Autowired
    QuestionRepository questionRepository;

    public List<QuestionDto> getAllQuestions() {
        List<Question> questions = questionRepository.findAll();
        return questions.stream()
                .map(QuestionMapper::toDto)
                .collect(Collectors.toList());
    }

    public int getQuestionCount() {
        return (int) questionRepository.count();
    }
}
