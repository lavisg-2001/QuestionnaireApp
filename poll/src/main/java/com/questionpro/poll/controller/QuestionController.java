package com.questionpro.poll.controller;

import com.questionpro.poll.dto.QuestionDto;
import com.questionpro.poll.service.QuestionService;
import com.questionpro.poll.service.UserSubmissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static com.questionpro.poll.utils.Constants.FRONTEND_URL_PATH;

@RestController
@RequestMapping("/poll")
@CrossOrigin(origins = FRONTEND_URL_PATH)
public class QuestionController {

    @Autowired
    QuestionService questionService;

    @Autowired
    UserSubmissionService submissionService;

    @GetMapping("/questions")
    public ResponseEntity<List<QuestionDto>> getQuestions(){
        List<QuestionDto> questionDtoList = questionService.getAllQuestions();
        return ResponseEntity.ok(questionDtoList);
    }

}
