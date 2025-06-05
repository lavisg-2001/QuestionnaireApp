package com.questionpro.poll.service;

import com.questionpro.poll.model.Options;
import com.questionpro.poll.model.Question;
import com.questionpro.poll.model.UserAnswer;
import com.questionpro.poll.model.UserSubmission;
import com.questionpro.poll.repository.QuestionRepository;
import com.questionpro.poll.repository.UserAnswerRepository;
import com.questionpro.poll.repository.UserSubmissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

import static com.questionpro.poll.utils.Constants.*;
import static com.questionpro.poll.utils.ErrorResponse.*;

@Service
public class UserSubmissionService {

    @Autowired
    QuestionRepository questionRepository;

    @Autowired
    UserAnswerRepository answerRepository;

    @Autowired
    UserSubmissionRepository submissionRepository;

    public List<UserSubmission> getAllSubmissions() {
        return submissionRepository.findAll();
    }

    public List<UserSubmission> getSubmissionsByEmail(String email) {
        return submissionRepository.findByEmailId(email);
    }

    public int getRank(int score) {
        List<UserSubmission> all = submissionRepository.findAll();
        List<Integer> scores = all.stream()
                .map(UserSubmission::getScore)
                .sorted(Comparator.reverseOrder())
                .distinct()
                .toList();
        return scores.indexOf(score) + 1;
    }

    public UserSubmission submitAnswers(String name, String email, Map<Long, Long> answers) {
        List<Question> questions = questionRepository.findAll();
        int score = 0;

        for (Question q : questions) {
            Long correctId = q.getOptions().stream()
                    .filter(Options::isCorrect)
                    .map(Options::getId)
                    .findFirst().orElse(null);

            if (correctId != null && correctId.equals(answers.get(q.getId()))) {
                score++;
            }
        }

        UserSubmission submission = new UserSubmission();
        submission.setUserName(name);
        submission.setEmailId(email);
        submission.setScore(score);
        submissionRepository.save(submission);

        for (Map.Entry<Long, Long> entry : answers.entrySet()) {
            UserAnswer ua = new UserAnswer();
            ua.setSubmission(submission);
            ua.setQuestion(new Question() {{ setId(entry.getKey()); }});
            ua.setSelectedOption(new Options() {{ setId(entry.getValue()); }});
            answerRepository.save(ua);
        }

        return submission;
    }

    public Map<String, Object> processSubmission(String name, String email, Map<String, Integer> answersMap) {
        Map<Long, Long> answers = new HashMap<>();
        answersMap.forEach((q, o) -> answers.put(Long.valueOf(q), Long.valueOf(o)));

        UserSubmission submission = submitAnswers(name, email, answers);

        int rank = getRank(submission.getScore());

        Map<String, Object> result = new HashMap<>();
        result.put(SCORE, submission.getScore());
        result.put(RANK, rank);
        return result;
    }

    public Map<String, Object> getHighestScoreResultByEmail(String email) {
        List<UserSubmission> submissions = getSubmissionsByEmail(email);

        if (submissions.isEmpty()) {
            return Map.of(ERROR, RESULT_NOT_FOUND);
        }

        UserSubmission highestScoreSubmission = submissions.stream()
                .max(Comparator.comparingInt(UserSubmission::getScore))
                .orElseThrow();

        int highestScore = highestScoreSubmission.getScore();
        int rank = getRank(highestScore);

        return Map.of(
                USER_NAME, highestScoreSubmission.getUserName(),
                SCORE, highestScore,
                RANK, rank
        );
    }

    public List<Map<String, Object>> getAllResults(int passingScore) {
        List<UserSubmission> subs = getAllSubmissions();

        if(subs.isEmpty()){
            return List.of(Map.of(ERROR,SUBMISSIONS_ARE_EMPTY));
        }

        Map<String, UserSubmission> highestScoreMap = new HashMap<>();
        for (UserSubmission sub : subs) {
            String email = sub.getEmailId();
            if (!highestScoreMap.containsKey(email) ||
                    highestScoreMap.get(email).getScore() < sub.getScore()) {
                highestScoreMap.put(email, sub);
            }
        }

        List<Map<String, Object>> result = new ArrayList<>();
        for (UserSubmission sub : highestScoreMap.values()) {
            int rank = getRank(sub.getScore());
            result.add(Map.of(
                        RANK, rank,
                        USER_NAME, sub.getUserName(),
                        EMAIL_ID, sub.getEmailId(),
                        SCORE, sub.getScore(),
                        RESULT, sub.getScore() >= passingScore ? PASS : FAIL
                ));
            //top 3 ranks
//            if (rank == 1 || rank == 2 || rank == 3) {
//                result.add(Map.of(
//                        RANK, rank,
//                        USER_NAME, sub.getUserName(),
//                        EMAIL_ID, sub.getEmailId(),
//                        SCORE, sub.getScore(),
//                        RESULT, sub.getScore() >= passingScore ? PASS : FAIL
//                ));
//            }
        }

        if(result.isEmpty()){
            return List.of(Map.of(ERROR, RESULTS_NOT_FOUND));
        }

        result.sort(Comparator.comparingInt(map -> (int) map.get(RANK)));
        return  result;
    }
}

