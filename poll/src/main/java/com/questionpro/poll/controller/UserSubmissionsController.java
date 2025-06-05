package com.questionpro.poll.controller;

import com.questionpro.poll.service.QuestionService;
import com.questionpro.poll.service.UserSubmissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import static com.questionpro.poll.utils.Constants.*;
import static com.questionpro.poll.utils.ErrorResponse.*;

@RestController
@RequestMapping("/poll")
@CrossOrigin(FRONTEND_URL_PATH)
public class UserSubmissionsController {

    @Autowired
    private UserSubmissionService submissionService;

    @Autowired
    private QuestionService questionService;

    @PostMapping("/submit")
    public ResponseEntity<Map<String, Object>> submitAnswers(@RequestBody Map<String, Object> payload) {

        String name = (String) payload.get(USER_NAME);
        String email = (String) payload.get(EMAIL_ID);
        Map<String, Integer> answersMap = (Map<String, Integer>) payload.get(ANSWERS);

        if (name == null || name.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of(ERROR, NAME_REQUIRED));
        }
        if (email == null || email.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of(ERROR, EMAIL_ID_REQUIRED));
        }
        if (!isValidEmail(email)) {
            return ResponseEntity.badRequest().body(Map.of(ERROR, ENTER_VALID_EMAIL));
        }
//        if (answersMap == null || answersMap.isEmpty() || answersMap.size() != questionService.getQuestionCount()) {
//            return ResponseEntity.badRequest().body(Map.of(ERROR, ALL_QUESTIONS_MANDATORY));
//        }

        return ResponseEntity.ok(submissionService.processSubmission(name, email, answersMap));
    }

    @GetMapping("/result/{email}")
    public ResponseEntity<Map<String, Object>> getResult(@PathVariable String email) {
        Map<String, Object> result = submissionService.getHighestScoreResultByEmail(email);
        if (result.containsKey(ERROR)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(result);
        }
        return ResponseEntity.ok(result);
    }

    @GetMapping("/results")
    public ResponseEntity<List<Map<String, Object>>> getAllResults() {
        int totalQuestions = questionService.getQuestionCount();
        int passingScore = (int) Math.ceil(totalQuestions * 0.5);
        List<Map<String, Object>> results = submissionService.getAllResults(passingScore);
        if (results.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(List.of(Map.of(ERROR, RESULTS_NOT_FOUND)));
        }
        return ResponseEntity.ok(results);
    }

    private boolean isValidEmail(String email) {
        return email.matches(EMAIL_REGEX);
    }
}
